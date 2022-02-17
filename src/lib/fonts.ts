import type { Font } from "../types";
import { writable } from "svelte/store";
import { FontLoader, FontLoaderProps } from "./loader";

const createFontStore = () => {
  const { subscribe, set, update } = writable<Font[]>([]);

  let loader: FontLoader | undefined;
  const load = (props?: FontLoaderProps) => {
    loader?.removeAllListeners();
    set([]);
    loader = new FontLoader(props);
    loader.on("fontload", (f) =>
      update((acc) =>
        [...acc, f].sort((a, b) =>
          a.family < b.family ? -1 : a.family > b.family ? 1 : a.index - b.index
        )
      )
    );
  };

  return { subscribe, load };
};

export const fonts = createFontStore();
