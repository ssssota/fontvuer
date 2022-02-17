export type FontBase = {
  path: string;
  /** font index for TTC */
  index: number;
  family: string;
  postscript: string | undefined;
  full: string;
  style: "normal" | "italic" | "oblique";
  /** (width) 50 ~ 200 [%] */
  stretch: number;
  /** 100 ~ 900 */
  weight: number;
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
