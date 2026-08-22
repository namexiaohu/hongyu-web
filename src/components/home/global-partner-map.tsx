'use client';

import * as d3 from 'd3';
import { useEffect, useMemo, useRef, useState } from 'react';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { Feature, FeatureCollection, Geometry } from 'geojson';

import { useTranslation } from '@/lib/i18n-context';
import type { CenterRegion } from '@/lib/storefront-partner-centers-api';

export type GlobalMapCenter = {
  slug: string;
  name: string;
  location: string;
  region: CenterRegion;
  badgeText: string;
};

type MapRegionId = 'apac' | 'europe' | 'na' | 'latam' | 'mea' | 'oceania';

type RegionMeta = {
  id: MapRegionId;
  apiRegion: CenterRegion;
  colorVar: string;
  softVar: string;
};

const REGION_META: RegionMeta[] = [
  { id: 'apac', apiRegion: 'asia-pacific', colorVar: '--gm-r-apac', softVar: '--gm-r-apac-soft' },
  { id: 'europe', apiRegion: 'europe', colorVar: '--gm-r-europe', softVar: '--gm-r-europe-soft' },
  { id: 'na', apiRegion: 'north-america', colorVar: '--gm-r-na', softVar: '--gm-r-na-soft' },
  { id: 'latam', apiRegion: 'latin-america', colorVar: '--gm-r-latam', softVar: '--gm-r-latam-soft' },
  { id: 'mea', apiRegion: 'middle-east-africa', colorVar: '--gm-r-mea', softVar: '--gm-r-mea-soft' },
  { id: 'oceania', apiRegion: 'oceania', colorVar: '--gm-r-oceania', softVar: '--gm-r-oceania-soft' },
];

const ISO_TO_REGION: Record<string, MapRegionId> = {
  156: 'apac', 158: 'apac', 344: 'apac', 446: 'apac', 392: 'apac', 410: 'apac', 408: 'apac',
  496: 'apac', 704: 'apac', 764: 'apac', 458: 'apac', 702: 'apac', 360: 'apac', 608: 'apac',
  104: 'apac', 116: 'apac', 418: 'apac', 96: 'apac', 626: 'apac', 356: 'apac', 586: 'apac',
  50: 'apac', 144: 'apac', 524: 'apac', 64: 'apac', 462: 'apac',
  250: 'europe', 276: 'europe', 826: 'europe', 380: 'europe', 724: 'europe', 620: 'europe',
  528: 'europe', 56: 'europe', 40: 'europe', 756: 'europe', 752: 'europe', 578: 'europe',
  208: 'europe', 246: 'europe', 372: 'europe', 616: 'europe', 203: 'europe', 348: 'europe',
  642: 'europe', 100: 'europe', 191: 'europe', 705: 'europe', 703: 'europe', 440: 'europe',
  428: 'europe', 233: 'europe', 112: 'europe', 804: 'europe', 643: 'europe', 498: 'europe',
  51: 'europe', 268: 'europe', 31: 'europe', 8: 'europe', 807: 'europe', 70: 'europe',
  499: 'europe', 688: 'europe', 300: 'europe', 196: 'europe', 470: 'europe', 352: 'europe',
  438: 'europe', 442: 'europe', 492: 'europe', 674: 'europe', 20: 'europe', 336: 'europe',
  840: 'na', 124: 'na', 304: 'na',
  484: 'latam', 320: 'latam', 84: 'latam', 222: 'latam', 340: 'latam', 558: 'latam',
  188: 'latam', 591: 'latam', 192: 'latam', 214: 'latam', 332: 'latam', 388: 'latam',
  780: 'latam', 52: 'latam', 44: 'latam', 28: 'latam', 76: 'latam', 32: 'latam',
  152: 'latam', 170: 'latam', 604: 'latam', 862: 'latam', 218: 'latam', 68: 'latam',
  600: 'latam', 858: 'latam',
  682: 'mea', 784: 'mea', 634: 'mea', 414: 'mea', 48: 'mea', 512: 'mea', 887: 'mea',
  400: 'mea', 376: 'mea', 422: 'mea', 760: 'mea', 368: 'mea', 364: 'mea', 792: 'mea',
  818: 'mea', 434: 'mea', 788: 'mea', 12: 'mea', 504: 'mea', 710: 'mea', 516: 'mea',
  72: 'mea', 426: 'mea', 748: 'mea', 508: 'mea', 716: 'mea', 454: 'mea', 894: 'mea',
  404: 'mea', 800: 'mea', 834: 'mea', 566: 'mea', 288: 'mea', 231: 'mea', 232: 'mea',
  4: 'mea',
  36: 'oceania', 554: 'oceania', 598: 'oceania', 242: 'oceania', 90: 'oceania',
  548: 'oceania', 540: 'oceania', 584: 'oceania', 583: 'oceania', 585: 'oceania',
};

const HOTSPOTS: Record<MapRegionId, Array<[number, number]>> = {
  apac: [[121.5, 31.2], [139.7, 35.7], [127, 37.5], [103.8, 1.3]],
  europe: [[13.4, 52.5], [2.35, 48.85], [-0.12, 51.5]],
  na: [[-74, 40.7], [-118.2, 34], [-79.4, 43.7]],
  latam: [[-46.6, -23.5], [-99.1, 19.4], [-58.4, -34.6]],
  mea: [[55.3, 25.2], [31.2, 30], [28, -26.2]],
  oceania: [[151.2, -33.9], [145, -37.8], [174.8, -36.85]],
};

const SHOW_DELAY = 320;
const HIDE_DELAY = 280;
const WORLD_ATLAS_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

type Props = {
  centers: GlobalMapCenter[];
};

function heatT(count: number) {
  if (count >= 5) return 0.92;
  if (count >= 4) return 0.78;
  if (count >= 3) return 0.64;
  return 0.52;
}

function regionIdOfFeature(d: Feature) {
  return ISO_TO_REGION[String(d.id ?? '')] ?? null;
}

export function GlobalPartnerMap({ centers }: Props) {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRegionRef = useRef<MapRegionId | null>(null);
  const activeRegionRef = useRef<MapRegionId | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const countrySelectionRef = useRef<d3.Selection<SVGPathElement, Feature, SVGGElement, unknown> | null>(null);
  const centersByRegionRef = useRef(new Map<MapRegionId, GlobalMapCenter[]>());
  const scheduleShowRef = useRef<(regionId: MapRegionId | null) => void>(() => {});
  const positionTipRef = useRef<() => void>(() => {});

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [activeRegion, setActiveRegion] = useState<MapRegionId | null>(null);

  const centersByRegion = useMemo(() => {
    const map = new Map<MapRegionId, GlobalMapCenter[]>();
    for (const meta of REGION_META) map.set(meta.id, []);
    for (const center of centers) {
      const meta = REGION_META.find((item) => item.apiRegion === center.region);
      if (!meta) continue;
      map.get(meta.id)?.push(center);
    }
    return map;
  }, [centers]);

  centersByRegionRef.current = centersByRegion;
  activeRegionRef.current = activeRegion;

  function cancelHide() {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }

  function cancelShow() {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    pendingRegionRef.current = null;
  }

  function isPointerOverTooltip() {
    const tip = tooltipRef.current;
    if (!tip || !tip.classList.contains('is-open')) return false;
    if (tip.matches(':hover')) return true;
    return false;
  }

  function scheduleHide() {
    cancelHide();
    hideTimerRef.current = setTimeout(() => {
      if (isPointerOverTooltip()) return;
      setActiveRegion(null);
    }, HIDE_DELAY);
  }

  function onCountryPointerLeave(event: PointerEvent) {
    const related = event.relatedTarget as Element | null;
    const tip = tooltipRef.current;
    if (tip && related && tip.contains(related)) return;
    // Moving into another country — keep pending/open tip for same region.
    if (related?.closest?.('path.country')) return;
    cancelShow();
    scheduleHide();
  }

  function scheduleShow(regionId: MapRegionId | null) {
    if (!regionId) return;
    if (!(centersByRegionRef.current.get(regionId)?.length ?? 0)) return;
    cancelHide();
    // Already open on this region — keep it.
    if (activeRegionRef.current === regionId) return;
    // Same region already waiting — don't reset the debounce timer.
    if (pendingRegionRef.current === regionId) return;

    cancelShow();
    pendingRegionRef.current = regionId;
    showTimerRef.current = setTimeout(() => {
      if (pendingRegionRef.current !== regionId) return;
      pendingRegionRef.current = null;
      showTimerRef.current = null;
      setActiveRegion(regionId);
      requestAnimationFrame(() => positionTipRef.current());
    }, SHOW_DELAY);
  }

  function updatePointerFromEvent(event: { clientX: number; clientY: number }) {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    pointerRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function positionTooltipNearPointer() {
    const stage = stageRef.current;
    const tooltip = tooltipRef.current;
    if (!stage || !tooltip) return;
    if (!tooltip.classList.contains('is-open')) return;

    const tipW = tooltip.offsetWidth || 320;
    const tipH = tooltip.offsetHeight || 280;
    const stageW = stage.clientWidth;
    const stageH = stage.clientHeight;
    const gap = 12;
    const px = pointerRef.current.x;
    const py = pointerRef.current.y;

    let x = px + gap;
    let y = py + gap;
    if (x + tipW > stageW - 12) x = px - tipW - gap;
    if (y + tipH > stageH - 12) y = py - tipH - gap;
    x = Math.max(12, Math.min(x, stageW - tipW - 12));
    y = Math.max(12, Math.min(y, stageH - tipH - 12));
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  }

  scheduleShowRef.current = scheduleShow;
  positionTipRef.current = positionTooltipNearPointer;
  const onCountryPointerLeaveRef = useRef(onCountryPointerLeave);
  onCountryPointerLeaveRef.current = onCountryPointerLeave;

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const svgEl = svgRef.current;
    if (!root || !stage || !svgEl) return;

    let cancelled = false;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    function cssVar(name: string) {
      return getComputedStyle(root!).getPropertyValue(name).trim();
    }

    function regionFill(rid: MapRegionId | null) {
      const land = cssVar('--gm-land');
      if (!rid) return land;
      const count = centersByRegionRef.current.get(rid)?.length ?? 0;
      if (!count) return land;
      const meta = REGION_META.find((item) => item.id === rid);
      if (!meta) return land;
      return d3.interpolateRgb(cssVar(meta.softVar), cssVar(meta.colorVar))(heatT(count));
    }

    async function renderMap() {
      setLoading(true);
      setLoadError(false);
      const width = stage!.clientWidth;
      const height = stage!.clientHeight;
      if (width <= 0 || height <= 0) {
        setLoading(false);
        return;
      }

      const svg = d3.select(svgEl);
      svg.attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet');
      svg.selectAll('*').remove();

      const world = (await d3.json(WORLD_ATLAS_URL)) as Topology;
      if (cancelled) return;
      const countriesObject = world.objects.countries;
      if (!countriesObject) throw new Error('countries topology missing');
      const countries = feature(world, countriesObject) as FeatureCollection<Geometry>;
      // Exclude Antarctica so fit focuses on inhabited continents (less bottom empty space)
      const fitFeatures: FeatureCollection<Geometry> = {
        type: 'FeatureCollection',
        features: countries.features.filter((f) => String(f.id ?? '') !== '010'),
      };
      const projection = d3.geoNaturalEarth1().fitExtent(
        [[8, 4], [width - 8, height - 4]],
        fitFeatures,
      );
      const path = d3.geoPath(projection);

      const gOcean = svg.append('g');
      gOcean.append('rect').attr('width', width).attr('height', height).attr('fill', 'var(--gm-ocean)');
      gOcean.append('path').datum(d3.geoGraticule10()).attr('class', 'ocean-grid').attr('d', path);

      const gLand = svg.append('g');
      countrySelectionRef.current = gLand
        .selectAll('path.country')
        .data(fitFeatures.features)
        .join('path')
        .attr('class', (d) => {
          const rid = regionIdOfFeature(d);
          const hasCenters = rid ? (centersByRegionRef.current.get(rid)?.length ?? 0) > 0 : false;
          return hasCenters ? 'country is-active-region' : 'country is-idle';
        })
        .attr('d', path)
        .attr('data-region', (d) => regionIdOfFeature(d) ?? '')
        .attr('fill', (d) => regionFill(regionIdOfFeature(d)))
        .on('pointerenter', (event, d) => {
          updatePointerFromEvent(event);
          scheduleShowRef.current(regionIdOfFeature(d));
        })
        .on('pointermove', (event) => {
          // Keep latest cursor so tip opens beside where the user actually paused.
          updatePointerFromEvent(event);
        })
        .on('pointerleave', (event) => {
          onCountryPointerLeaveRef.current(event as PointerEvent);
        }) as d3.Selection<SVGPathElement, Feature, SVGGElement, unknown>;

      const gHot = svg.append('g').attr('pointer-events', 'none');
      for (const meta of REGION_META) {
        if (!(centersByRegionRef.current.get(meta.id)?.length ?? 0)) continue;
        const color = cssVar(meta.colorVar);
        (HOTSPOTS[meta.id] ?? []).forEach(([lon, lat], i) => {
          const p = projection([lon, lat]);
          if (!p) return;
          gHot
            .append('circle')
            .attr('class', 'hotspot-ring')
            .attr('cx', p[0])
            .attr('cy', p[1])
            .attr('r', 2.5)
            .attr('stroke', color)
            .style('animation-delay', `${i * 0.3}s`);
          gHot
            .append('circle')
            .attr('class', 'hotspot')
            .attr('cx', p[0])
            .attr('cy', p[1])
            .attr('r', 2)
            .attr('fill', color);
        });
      }

      setLoading(false);
    }

    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        renderMap().catch(() => {
          if (!cancelled) {
            setLoadError(true);
            setLoading(false);
          }
        });
      }, 160);
    };
    window.addEventListener('resize', onResize);

    renderMap().catch(() => {
      if (!cancelled) {
        setLoadError(true);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
      cancelHide();
      cancelShow();
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      countrySelectionRef.current = null;
    };
  }, [centers]);

  useEffect(() => {
    const root = rootRef.current;
    const tooltip = tooltipRef.current;
    const selection = countrySelectionRef.current;
    if (!root || !tooltip) return;

    function cssVar(name: string) {
      return getComputedStyle(root!).getPropertyValue(name).trim();
    }

    if (selection) {
      if (!activeRegion) {
        selection.classed('is-active', false).classed('is-dim', false).style('--active-glow', null);
      } else {
        const meta = REGION_META.find((item) => item.id === activeRegion);
        const glow = meta ? cssVar(meta.colorVar) : cssVar('--gm-accent');
        selection
          .classed('is-dim', (d) => regionIdOfFeature(d) !== activeRegion)
          .classed('is-active', (d) => regionIdOfFeature(d) === activeRegion)
          .style('--active-glow', (d) => (regionIdOfFeature(d) === activeRegion ? glow : null));
        if (meta) tooltip.style.setProperty('--accent-color', glow);
      }
    }

    if (!activeRegion) return;
    requestAnimationFrame(() => positionTooltipNearPointer());
  }, [activeRegion]);

  const activeMeta = activeRegion ? REGION_META.find((item) => item.id === activeRegion) ?? null : null;
  const activeCenters = activeRegion ? centersByRegion.get(activeRegion) ?? [] : [];
  const tipOpen = Boolean(activeRegion && activeCenters.length);

  if (!centers.length) return null;

  return (
    <section
      ref={rootRef}
      className="global-map-embed"
      id="global-map-embed"
      aria-label={t('map.ariaLabel')}
    >
      <div className="map-stage" ref={stageRef}>
        {(loading || loadError) ? (
          <div className="loading">
            {loadError ? (
              <span>{t('map.loadFailed')}</span>
            ) : (
              <>
                <div className="spinner" />
                <span>{t('map.loading')}</span>
              </>
            )}
          </div>
        ) : null}
        <svg ref={svgRef} role="img" aria-label={t('map.svgAriaLabel')} />

        <div
          className={`region-tooltip${tipOpen ? ' is-open' : ''}`}
          ref={tooltipRef}
          role="dialog"
          aria-hidden={!tipOpen}
          aria-labelledby="tip-title"
          onPointerEnter={cancelHide}
          onPointerLeave={scheduleHide}
        >
          <div className="tip-accent" />
          <div className="tip-body">
            <div className="tip-head">
              <div>
                <div className="tip-label">
                  {activeMeta ? t(`map.regions.${activeMeta.id}`) : ''}
                </div>
                <div className="tip-title" id="tip-title">
                  {activeMeta ? t(`map.regions.${activeMeta.id}`) : ''}
                </div>
              </div>
              <div className="tip-count">
                <strong>{activeCenters.length}</strong>
                <em>{t('map.partnerCenters')}</em>
              </div>
            </div>
            <div className="center-list">
              {activeCenters.map((center) => (
                <a
                  key={center.slug}
                  className="center-link"
                  href={`/centers/${center.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <strong>{center.name}</strong>
                    <span>
                      {[center.location, center.badgeText].filter(Boolean).join(' · ')}
                    </span>
                  </div>
                  <span className="go">{t('map.detailsArrow')}</span>
                </a>
              ))}
            </div>
            <p className="tip-foot">{t('map.tipFoot')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
