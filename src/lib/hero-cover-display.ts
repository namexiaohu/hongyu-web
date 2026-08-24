export type HeroCoverDisplay = {
  video: boolean;
  cover: boolean;
  gallery: boolean;
};

export type HeroCoverDisplayWithoutGallery = {
  video: boolean;
  cover: boolean;
};

export function defaultHeroCoverDisplay(includeGallery = true): HeroCoverDisplay {
  return {
    video: true,
    cover: true,
    gallery: includeGallery,
  };
}

export function defaultHeroCoverDisplayNoGallery(): HeroCoverDisplayWithoutGallery {
  return { video: true, cover: true };
}

/** Storefront: missing/empty → all enabled (gallery only when includeGallery). */
export function resolveStorefrontHeroCoverDisplay(
  input?: Partial<HeroCoverDisplay> | null,
  includeGallery = true,
): HeroCoverDisplay {
  if (
    !input
    || (input.video === undefined && input.cover === undefined && input.gallery === undefined)
  ) {
    return defaultHeroCoverDisplay(includeGallery);
  }
  return {
    video: input.video ?? true,
    cover: input.cover ?? true,
    gallery: includeGallery ? (input.gallery ?? true) : false,
  };
}
