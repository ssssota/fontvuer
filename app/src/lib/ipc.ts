import { invoke } from '@tauri-apps/api';

type f32 = number;
type String = string;
type bool = boolean;
type Option<T> = T | null | undefined;

export const getFamilies = (): Promise<string[]> =>
  invoke('get_families_from_system_source');

export const getFacesByFamilyName = (
  familyName: string
): Promise<{ path: string; fontIndex: number }[]> =>
  invoke<{ path: string; font_index: number }[]>('get_family_faces', {
    familyName,
  }).then((fonts) =>
    Array.from(
      new Map(
        fonts.map(({ path, font_index }) => [
          `${path}:${font_index}`,
          { path, fontIndex: font_index },
        ])
      ).values()
    )
  );

export type Descriptor = {
  weight: f32;
  style: String;
  stretch: f32;
  monospace: bool;
  family_name: String;
  subfamily_name: Option<String>;
  full_name: String;
  version: Option<String>;
  postscript_name: Option<String>;
  trademark: Option<String>;
  manufacturer: Option<String>;
  designer: Option<String>;
  description: Option<String>;
  vendor_url: Option<String>;
  designer_url: Option<String>;
  license_description: Option<String>;
  license_info_url: Option<String>;
  sample_text: Option<String>;
};

export const getFontDescriptor = (args: {
  path: string;
  fontIndex: number;
}): Promise<Descriptor> => invoke<Descriptor>('get_font_descriptor', args);
