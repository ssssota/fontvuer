import { invoke } from "@tauri-apps/api/tauri";
import type { CustomDirFont, Font, SystemFont } from "../types";

export type FontDescriptor = {
  installed: boolean;
  path: string;
  font_index: number;
};

export const getFonts = (customDirs = [], systemFonts = true) => invoke<{
  fonts: FontDescriptor[]
}>(
  'get_fonts',
  { customDirs, systemFonts }
).then(({ fonts }) => fonts);

export const getFont = ({ installed, font_index, path }: FontDescriptor): Promise<Font> => installed
  ? invoke<SystemFont>(
      'get_font_from_system',
      { fontIndex: font_index, path }
    ).then((font) => ({...font, type: 'system'}))
  : invoke<CustomDirFont>(
      'get_font_with_data',
      { fontIndex: font_index, path }
    ).then((font) => ({ ...font, type: 'custom_dir'}));
