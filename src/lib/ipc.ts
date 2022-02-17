import { invoke } from "@tauri-apps/api/tauri";
import type { CustomDirFont, Font, SystemFont } from "../types";

export type FontDescriptor = {
  installed: boolean;
  path: string;
  font_index: number;
};

export const getFonts = (customDirs = [], systemFonts = true) =>
  invoke<{
    fonts: FontDescriptor[];
  }>("get_fonts", { customDirs, systemFonts }).then(({ fonts }) => fonts);

export const getFont = ({
  installed,
  font_index,
  path,
}: FontDescriptor): Promise<Font> =>
  invoke<SystemFont | CustomDirFont>("get_font", {
    fontIndex: font_index,
    path,
    installed,
  });
