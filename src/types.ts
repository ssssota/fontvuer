// Rust compat types
type Option<T> = T | null | undefined;
type String = string;
type u32 = number;
type f32 = number;

export type FontBase = {
  path: String;
  /// font index for TTC
  index: u32;
  family: String;
  postscript: Option<String>;
  full: String;
  style: String;
  /// (width) 50 ~ 200 [%]
  stretch: f32;
  /// 100~900
  weight: f32;
  copyright: Option<String>;
  sampletext: Option<String>;
  license: Option<String>;
};

export type SystemFont = FontBase & {
  type: "system";
};
export type CustomDirFont = FontBase & {
  type: "custom_dir";
  /** base64 font data */
  data: string;
};

export type Font = SystemFont | CustomDirFont;
