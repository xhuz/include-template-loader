export type Sign = [string, string];
export interface Options {
  sign: Sign;
  deep: number;
}

export interface TemplateRules {
  [key: string]: RegExp;
  include: RegExp;
  variable: RegExp;
  imgSrc: RegExp;
}
