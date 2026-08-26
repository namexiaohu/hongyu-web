'use client';

import * as d3 from 'd3';
import { useEffect, useMemo, useRef, useState } from 'react';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { Feature, FeatureCollection, Geometry, MultiPolygon, Position } from 'geojson';

import { useTranslation } from '@/lib/i18n-context';
import { mapRegionLabelForLocale } from '@/lib/center-region-labels';
import type { CenterRegion } from '@/lib/storefront-partner-centers-api';

export type GlobalMapCenter = {
  slug: string;
  name: string;
  location: string;
  region: CenterRegion;
  badgeText: string;
};

type MapRegionId = 'na' | 'sa' | 'europe' | 'china' | 'apac' | 'africa';

type RegionMeta = {
  id: MapRegionId;
  apiRegion: CenterRegion;
  colorVar: string;
  softVar: string;
};

function noCentersLabel(locale: string, fallback: string): string {
  const normalized = locale.trim().toLowerCase();
  if (normalized.startsWith('zh')) return '无合作中心';
  if (normalized.startsWith('es')) return 'Sin centros asociados';
  return fallback;
}

const REGION_META: RegionMeta[] = [
  { id: 'na', apiRegion: 'north-america', colorVar: '--gm-r-na', softVar: '--gm-r-na-soft' },
  { id: 'sa', apiRegion: 'south-america', colorVar: '--gm-r-sa', softVar: '--gm-r-sa-soft' },
  { id: 'europe', apiRegion: 'europe', colorVar: '--gm-r-europe', softVar: '--gm-r-europe-soft' },
  { id: 'china', apiRegion: 'china', colorVar: '--gm-r-china', softVar: '--gm-r-china-soft' },
  { id: 'apac', apiRegion: 'asia-pacific', colorVar: '--gm-r-apac', softVar: '--gm-r-apac-soft' },
  { id: 'africa', apiRegion: 'africa', colorVar: '--gm-r-africa', softVar: '--gm-r-africa-soft' },
];

/** Sovereignty ISO → default business region (overseas fragments reassigned by centroid). */
const ISO_TO_REGION: Record<string, MapRegionId> = {
  // China (+ HK / MO / TW)
  156: 'china', 344: 'china', 446: 'china', 158: 'china',

  // North America (incl. Mexico, Central America, Caribbean)
  840: 'na', 124: 'na', 304: 'na', 484: 'na',
  320: 'na', 84: 'na', 222: 'na', 340: 'na', 558: 'na', 188: 'na', 591: 'na',
  192: 'na', 214: 'na', 332: 'na', 388: 'na', 780: 'na', 52: 'na', 44: 'na', 28: 'na',
  630: 'na', 238: 'na',

  // South America
  76: 'sa', 32: 'sa', 152: 'sa', 170: 'sa', 604: 'sa', 862: 'sa', 218: 'sa', 68: 'sa',
  600: 'sa', 858: 'sa', 328: 'sa', 740: 'sa',

  // Europe (broad; excludes Russia & former-Soviet listed under apac)
  250: 'europe', 276: 'europe', 826: 'europe', 380: 'europe', 724: 'europe', 620: 'europe',
  528: 'europe', 56: 'europe', 40: 'europe', 756: 'europe', 752: 'europe', 578: 'europe',
  208: 'europe', 246: 'europe', 372: 'europe', 616: 'europe', 203: 'europe', 348: 'europe',
  642: 'europe', 100: 'europe', 191: 'europe', 705: 'europe', 703: 'europe', 440: 'europe',
  428: 'europe', 233: 'europe', 8: 'europe', 807: 'europe', 70: 'europe',
  499: 'europe', 688: 'europe', 300: 'europe', 196: 'europe', 470: 'europe', 352: 'europe',
  438: 'europe', 442: 'europe', 492: 'europe', 674: 'europe', 20: 'europe', 336: 'europe',

  // Africa
  710: 'africa', 516: 'africa', 72: 'africa', 426: 'africa', 748: 'africa', 508: 'africa',
  716: 'africa', 454: 'africa', 894: 'africa', 404: 'africa', 800: 'africa', 834: 'africa',
  566: 'africa', 288: 'africa', 231: 'africa', 232: 'africa', 24: 'africa', 108: 'africa',
  120: 'africa', 140: 'africa', 148: 'africa', 178: 'africa', 180: 'africa', 204: 'africa',
  226: 'africa', 262: 'africa', 266: 'africa', 270: 'africa', 324: 'africa', 384: 'africa',
  430: 'africa', 450: 'africa', 466: 'africa', 478: 'africa', 562: 'africa', 624: 'africa',
  646: 'africa', 686: 'africa', 694: 'africa', 706: 'africa', 728: 'africa', 729: 'africa',
  732: 'africa', 768: 'africa', 854: 'africa', 818: 'africa', 434: 'africa', 788: 'africa',
  12: 'africa', 504: 'africa',

  // Asia-Pacific: rest of Asia, Middle East, Oceania, Russia & former Soviet
  392: 'apac', 410: 'apac', 408: 'apac', 496: 'apac', 704: 'apac', 764: 'apac', 458: 'apac',
  702: 'apac', 360: 'apac', 608: 'apac', 104: 'apac', 116: 'apac', 418: 'apac', 96: 'apac',
  626: 'apac', 356: 'apac', 586: 'apac', 50: 'apac', 144: 'apac', 524: 'apac', 64: 'apac',
  462: 'apac',
  682: 'apac', 784: 'apac', 634: 'apac', 414: 'apac', 48: 'apac', 512: 'apac', 887: 'apac',
  400: 'apac', 376: 'apac', 422: 'apac', 760: 'apac', 368: 'apac', 364: 'apac', 792: 'apac',
  275: 'apac', 4: 'apac',
  643: 'apac', 804: 'apac', 112: 'apac', 498: 'apac', 51: 'apac', 268: 'apac', 31: 'apac',
  398: 'apac', 417: 'apac', 762: 'apac', 860: 'apac', 795: 'apac',
  36: 'apac', 554: 'apac', 598: 'apac', 242: 'apac', 90: 'apac', 548: 'apac', 540: 'apac',
  584: 'apac', 583: 'apac', 585: 'apac', 260: 'apac',
};

const SHOW_DELAY = 320;
const HIDE_DELAY = 280;
const WORLD_ATLAS_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const TIP_SIDE_RIGHT: MapRegionId[] = ['na', 'sa'];

function tipSideForRegion(regionId: MapRegionId): 'left' | 'right' {
  return TIP_SIDE_RIGHT.includes(regionId) ? 'right' : 'left';
}

type Props = {
  centers: GlobalMapCenter[];
};

type RegionFeatureProps = { regionId: MapRegionId };

function heatT(count: number) {
  if (count >= 5) return 0.92;
  if (count >= 4) return 0.78;
  if (count >= 3) return 0.64;
  if (count >= 1) return 0.52;
  // Empty regions still show a clear regional tint (never land-grey).
  return 0.55;
}

function normalizeIsoId(raw: string | number | null | undefined) {
  const text = String(raw ?? '').trim();
  if (!text) return '';
  const asNum = Number(text);
  if (Number.isFinite(asNum)) return String(asNum);
  return text;
}

function ringCentroid(ring: Position[]): [number, number] | null {
  if (!ring.length) return null;
  let sumLon = 0;
  let sumLat = 0;
  let n = 0;
  for (const pt of ring) {
    const lon = pt[0];
    const lat = pt[1];
    if (!Number.isFinite(lon) || !Number.isFinite(lat)) continue;
    sumLon += lon;
    sumLat += lat;
    n += 1;
  }
  if (!n) return null;
  return [sumLon / n, sumLat / n];
}

function polygonCentroid(coords: Position[][]): [number, number] | null {
  const outer = coords[0];
  if (!outer?.length) return null;
  return ringCentroid(outer);
}

/** Geographic overrides for overseas fragments / disputed placement. */
function regionFromCentroid(lon: number, lat: number, isoHint: MapRegionId | null): MapRegionId | null {
  if (lat < -60) return null;

  // French Guiana & nearby S. America mainland
  if (lon > -82 && lon < -34 && lat > -56 && lat < 13) return 'sa';

  // Caribbean / Central America / Mexico → NA
  if (lon > -120 && lon < -55 && lat >= 7 && lat < 33) {
    if (lat < 15 && lon > -82) return 'sa'; // northern South America edge
    return 'na';
  }

  // Continental Europe box (excludes Russia east of ~40°E deep inland handled by ISO)
  if (lon > -25 && lon < 40 && lat > 34 && lat < 72) {
    if (isoHint === 'apac') return 'apac'; // e.g. fragments wrongly placed
    return 'europe';
  }

  // North Africa vs Middle East: lon/lat for Africa Maghreb already ISO africa;
  // Reunion etc. in Indian Ocean east of Africa → africa if near
  if (lon > 40 && lon < 60 && lat > -30 && lat < 0 && isoHint === 'europe') return 'africa';

  return isoHint;
}

function explodeCountryPolygons(countries: FeatureCollection<Geometry>): Array<{
  polygon: Position[][];
  isoHint: MapRegionId | null;
}> {
  const out: Array<{ polygon: Position[][]; isoHint: MapRegionId | null }> = [];
  for (const f of countries.features) {
    const iso = normalizeIsoId(f.id as string | number | null | undefined);
    if (iso === '10') continue; // Antarctica
    const isoHint = ISO_TO_REGION[iso] ?? null;
    const geom = f.geometry;
    if (!geom) continue;
    if (geom.type === 'Polygon') {
      out.push({ polygon: geom.coordinates, isoHint });
    } else if (geom.type === 'MultiPolygon') {
      for (const poly of geom.coordinates) {
        out.push({ polygon: poly, isoHint });
      }
    }
  }
  return out;
}

function buildRegionFeatures(countries: FeatureCollection<Geometry>): FeatureCollection<MultiPolygon, RegionFeatureProps> {
  const buckets = new Map<MapRegionId, Position[][][]>();
  for (const meta of REGION_META) buckets.set(meta.id, []);

  for (const { polygon, isoHint } of explodeCountryPolygons(countries)) {
    const c = polygonCentroid(polygon);
    if (!c) continue;
    const rid = regionFromCentroid(c[0], c[1], isoHint);
    if (!rid) continue;
    buckets.get(rid)?.push(polygon);
  }

  const features: Feature<MultiPolygon, RegionFeatureProps>[] = [];
  for (const meta of REGION_META) {
    const polys = buckets.get(meta.id) ?? [];
    if (!polys.length) continue;
    features.push({
      type: 'Feature',
      properties: { regionId: meta.id },
      geometry: { type: 'MultiPolygon', coordinates: polys },
    });
  }
  return { type: 'FeatureCollection', features };
}

export function GlobalPartnerMap({ centers }: Props) {
  const { t, locale } = useTranslation();
  const rootRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRegionRef = useRef<MapRegionId | null>(null);
  const activeRegionRef = useRef<MapRegionId | null>(null);
  const regionSelectionRef = useRef<d3.Selection<SVGPathElement, Feature<MultiPolygon, RegionFeatureProps>, SVGGElement, unknown> | null>(null);
  const centersByRegionRef = useRef(new Map<MapRegionId, GlobalMapCenter[]>());
  const scheduleShowRef = useRef<(regionId: MapRegionId | null) => void>(() => {});

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

  function onRegionPointerLeave(event: PointerEvent) {
    const related = event.relatedTarget as Element | null;
    const tip = tooltipRef.current;
    if (tip && related && tip.contains(related)) return;
    if (related?.closest?.('path.region')) return;
    cancelShow();
    scheduleHide();
  }

  function scheduleShow(regionId: MapRegionId | null) {
    if (!regionId) return;
    cancelHide();
    if (activeRegionRef.current === regionId) return;
    if (pendingRegionRef.current === regionId) return;

    cancelShow();
    pendingRegionRef.current = regionId;
    showTimerRef.current = setTimeout(() => {
      if (pendingRegionRef.current !== regionId) return;
      pendingRegionRef.current = null;
      showTimerRef.current = null;
      // Cursor reached the open side panel while a flyover was pending — keep current region.
      if (isPointerOverTooltip()) return;
      setActiveRegion(regionId);
    }, SHOW_DELAY);
  }

  function onTooltipPointerEnter() {
    cancelShow();
    cancelHide();
  }

  scheduleShowRef.current = scheduleShow;
  const onRegionPointerLeaveRef = useRef(onRegionPointerLeave);
  onRegionPointerLeaveRef.current = onRegionPointerLeave;

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

    function regionFill(rid: MapRegionId) {
      const meta = REGION_META.find((item) => item.id === rid);
      if (!meta) return cssVar('--gm-land');
      const soft = cssVar(meta.softVar);
      const strong = cssVar(meta.colorVar);
      const count = centersByRegionRef.current.get(rid)?.length ?? 0;
      return d3.interpolateRgb(soft, strong)(heatT(count));
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
      const regionFc = buildRegionFeatures(countries);

      const projection = d3.geoNaturalEarth1().fitExtent(
        [[8, 4], [width - 8, height - 4]],
        regionFc,
      );
      const path = d3.geoPath(projection);

      const gOcean = svg.append('g');
      gOcean.append('rect').attr('width', width).attr('height', height).attr('fill', 'var(--gm-ocean)');
      gOcean.append('path').datum(d3.geoGraticule10()).attr('class', 'ocean-grid').attr('d', path);

      const gLand = svg.append('g');
      regionSelectionRef.current = gLand
        .selectAll('path.region')
        .data(regionFc.features)
        .join('path')
        .attr('class', 'region is-active-region')
        .attr('d', path)
        .attr('data-region', (d) => d.properties.regionId)
        .attr('fill', (d) => regionFill(d.properties.regionId))
        .on('pointerenter', (_event, d) => {
          scheduleShowRef.current(d.properties.regionId);
        })
        .on('pointerleave', (event) => {
          onRegionPointerLeaveRef.current(event as PointerEvent);
        }) as d3.Selection<SVGPathElement, Feature<MultiPolygon, RegionFeatureProps>, SVGGElement, unknown>;

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
      regionSelectionRef.current = null;
    };
  }, [centers]);

  useEffect(() => {
    const root = rootRef.current;
    const tooltip = tooltipRef.current;
    const selection = regionSelectionRef.current;
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
          .classed('is-dim', (d) => d.properties.regionId !== activeRegion)
          .classed('is-active', (d) => d.properties.regionId === activeRegion)
          .style('--active-glow', (d) => (d.properties.regionId === activeRegion ? glow : null));
        if (meta) tooltip.style.setProperty('--accent-color', glow);
      }
    }
  }, [activeRegion]);

  const activeMeta = activeRegion ? REGION_META.find((item) => item.id === activeRegion) ?? null : null;
  const activeCenters = activeRegion ? centersByRegion.get(activeRegion) ?? [] : [];
  const tipOpen = Boolean(activeRegion);
  const tipSide = activeRegion ? tipSideForRegion(activeRegion) : 'left';

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
          className={`region-tooltip is-side-${tipSide}${tipOpen ? ' is-open' : ''}`}
          ref={tooltipRef}
          role="dialog"
          aria-hidden={!tipOpen}
          aria-labelledby="tip-title"
          onPointerEnter={onTooltipPointerEnter}
          onPointerLeave={scheduleHide}
        >
          <div className="tip-accent" />
          <div className="tip-body">
            <div className="tip-head">
              <div>
                <div className="tip-label">
                  {activeMeta ? mapRegionLabelForLocale(activeMeta.id, locale) : ''}
                </div>
                <div className="tip-title" id="tip-title">
                  {activeMeta ? mapRegionLabelForLocale(activeMeta.id, locale) : ''}
                </div>
              </div>
              <div className="tip-count">
                <strong>{activeCenters.length}</strong>
                <em>{t('map.partnerCenters')}</em>
              </div>
            </div>
            <div className="center-list">
              {activeCenters.length ? (
                activeCenters.map((center) => (
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
                ))
              ) : (
                <p className="center-list-empty">{noCentersLabel(locale, t('map.noCenters'))}</p>
              )}
            </div>
            {activeCenters.length ? (
              <p className="tip-foot">{t('map.tipFoot')}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
