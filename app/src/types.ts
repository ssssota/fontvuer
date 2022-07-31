import type { SnakeToCamelObject } from './lib/utils';

type u32 = number;
type f32 = number;
type String = string;
type bool = boolean;
export type Option<T> = T | null | undefined;

export type Style = 'normal' | 'italic' | 'oblique';

export type DescriptorRs = {
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
export type Descriptor = SnakeToCamelObject<DescriptorRs>;

export type FontFaceRs = {
  path: String;
  font_index: u32;
};
export type FontFace = SnakeToCamelObject<FontFaceRs>;
