import { invoke } from '@tauri-apps/api';
import type { Descriptor, DescriptorRs, FontFace, FontFaceRs } from '../types';
import { snakeToCamelObject } from './utils/snakeToCamel';

export const getFamilies = (): Promise<string[]> =>
  invoke('get_families_from_system_source');

export const getFacesByFamilyName = (familyName: string): Promise<FontFace[]> =>
  invoke<FontFaceRs[]>('get_family_faces', {
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

export const getFontDescriptor = (args: {
  path: string;
  fontIndex: number;
}): Promise<Descriptor> =>
  invoke<DescriptorRs>('get_font_descriptor', args).then(snakeToCamelObject);
