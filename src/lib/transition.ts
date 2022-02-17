import type { EasingFunction, TransitionConfig } from "svelte/transition";
import { cubicOut } from "svelte/easing";

export type SlideParams = {
  delay?: number;
  duration?: number;
  easing?: EasingFunction;
};

export const slide = (
  node: Element,
  { delay = 0, duration = 400, easing: easing$1 = cubicOut }: SlideParams = {}
): TransitionConfig => {
  const style = getComputedStyle(node);
  const width = parseFloat(style.width);
  return {
    delay,
    duration,
    easing: easing$1,
    css: (t) => `transform: translateX(${(1 - t) * width}px);`,
  };
};
