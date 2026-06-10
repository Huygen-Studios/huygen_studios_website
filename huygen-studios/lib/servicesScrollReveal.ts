/** Scroll progress (0–1) window for the ServicesShowcase “drop-in systems” strip — must match HuygenScroll computeLinearOpacity. */
export const SERVICES_SECTION = {
  fadeInStart: 0.44,
  fadeInEnd: 0.46,
  fadeOutStart: 0.60,
  fadeOutEnd: 0.61,
} as const;

/** While the strip is scroll-active, scroll is split into 7 equal reveal stages. */
export const SERVICES_INNER = {
  start: 0.462,
  end: 0.57,
} as const;

const INNER = SERVICES_INNER.end - SERVICES_INNER.start;

/** Active stage index `0 … total - 1` and local progress `0..1` within that stage. */
export function servicesStageState(
  progress: number,
  total: number,
  inner: { start: number; end: number } = SERVICES_INNER
): { activeIndex: number; activeProgress: number } {
  if (total <= 0) return { activeIndex: 0, activeProgress: 0 };
  if (progress <= inner.start) return { activeIndex: 0, activeProgress: 0 };
  if (progress >= inner.end) return { activeIndex: total - 1, activeProgress: 1 };
  const slice = (inner.end - inner.start) / total;
  const phase = (progress - inner.start) / slice;
  const activeIndex = Math.min(Math.max(Math.floor(phase), 0), total - 1);
  const activeProgress = Math.min(1, Math.max(0, phase - activeIndex));
  return { activeIndex, activeProgress };
}

/** Cumulative reveal: one new row per stage; by stage 7 all rows are visible. */
export function serviceRowRevealMultiplier(
  progress: number,
  index: number,
  total: number,
  inner: { start: number; end: number } = SERVICES_INNER
): number {
  if (total <= 0) return 1;
  if (progress <= inner.start) return 0;
  if (progress >= inner.end) return 1;
  const { activeIndex, activeProgress } = servicesStageState(progress, total, inner);
  if (index < activeIndex) return 1;
  if (index === activeIndex) {
    // Apply smoothstep easing
    return activeProgress * activeProgress * (3 - 2 * activeProgress);
  }
  return 0;
}

/** 1 when this row is currently being revealed; otherwise 0. */
export function serviceRowActiveMarker(
  progress: number,
  index: number,
  total: number
): number {
  if (total <= 0) return 0;
  if (progress < SERVICES_INNER.start || progress > SERVICES_INNER.end) return 0;
  const { activeIndex } = servicesStageState(progress, total);
  return activeIndex === index ? 1 : 0;
}

/** Float 0…total for crystal interpolate (smooth between zig-zag anchors). */
export function serviceScrollPhase(progress: number, total: number): number {
  if (total <= 0) return 0;
  if (progress <= SERVICES_INNER.start) return 0;
  if (progress >= SERVICES_INNER.end) return total;
  return ((progress - SERVICES_INNER.start) / INNER) * total;
}

/** Must match `SERVICES_STACK.length` in ServicesShowcase — update both if rows change. */
export const SERVICES_SHOWCASE_ROW_COUNT = 7;

/**
 * Horizontal zig-zag crystal target while scrolling the service strip.
 * Side alternates stage index: even → leftX, odd → rightX.
 */
export function computeZigzagCrystalX(
  progress: number,
  serviceCount: number,
  leftX: number,
  rightX: number
): number {
  if (serviceCount <= 0) return leftX;
  if (progress < SERVICES_INNER.start) return leftX;

  const pe = Math.min(progress, SERVICES_INNER.end - 1e-6);
  const phase = serviceScrollPhase(pe, serviceCount);
  const i0 = Math.min(Math.max(Math.floor(phase), 0), serviceCount - 1);
  const f = Math.min(1, Math.max(0, phase - i0));
  const x0 = i0 % 2 === 0 ? leftX : rightX;
  const i1 = Math.min(i0 + 1, serviceCount - 1);
  const x1 = i1 === i0 ? x0 : i1 % 2 === 0 ? leftX : rightX;
  const sm = f * f * (3 - 2 * f);
  return x0 + (x1 - x0) * sm;
}

export function zigzagCrystalXAtInnerEnd(
  serviceCount: number,
  leftX: number,
  rightX: number
): number {
  return computeZigzagCrystalX(SERVICES_INNER.end - 1e-6, serviceCount, leftX, rightX);
}

/** After the final stage, glide the crystal to the Process-section anchor (right). */
export const CRYSTAL_ZIGZAG_HANDOFF = {
  start: SERVICES_INNER.end,
  end: 0.61,
} as const;
