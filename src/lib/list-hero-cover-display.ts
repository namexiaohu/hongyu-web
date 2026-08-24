export type ListHeroCoverDisplay = {
  video: boolean;
  cover: boolean;
};

export function defaultListHeroCoverDisplay(): ListHeroCoverDisplay {
  return { video: true, cover: true };
}

export function resolveStorefrontListHeroCoverDisplay(input?: Partial<ListHeroCoverDisplay> | null): ListHeroCoverDisplay {
  if (!input || (input.video === undefined && input.cover === undefined)) {
    return defaultListHeroCoverDisplay();
  }
  return {
    video: input.video ?? true,
    cover: input.cover ?? true,
  };
}
