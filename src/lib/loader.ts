import { EventEmitter } from "eventemitter3";
import type { Font } from "../types";
import { getFonts, getFont } from "./ipc";

export type FontLoaderProps = {
  customDirs: string[];
  loadSystemFonts?: boolean;
};

export type FontLoaderEventMap = {
  fontload: Font;
};

export class FontLoader extends EventEmitter<FontLoaderEventMap> {
  constructor(private props?: FontLoaderProps) {
    super();
    this.loadFonts();
  }

  on<K extends keyof FontLoaderEventMap>(
    event: K,
    listener: (v: FontLoaderEventMap[K]) => unknown
  ) {
    super.on(event, listener);
    return this;
  }

  private async loadFonts() {
    const descriptors = await getFonts(
      this.props?.customDirs,
      this.props?.loadSystemFonts
    );
    descriptors.map((desc) => {
      getFont(desc).then((f) => this.emit("fontload", f));
    });
  }
}
