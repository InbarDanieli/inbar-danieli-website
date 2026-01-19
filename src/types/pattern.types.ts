export interface IPattern extends Document, IPatternProps {}

export type TPatternPostType =
  | "title"
  | "row"
  | "images"
  | "space"
  | "separator"
  | "general-note";

export interface IPatternPost {
  type: TPatternPostType;
  content: string;
  rowNumber?: number;
  images: string[];
  id: string;
}

export interface IPatternProps {
  title: string;
  yarns: string[]; // yarn ids
  hookMaxSize: number;
  hookMinSize: number;
  materials: string;
  tipsAndInfo: string;
  image: string;
  subtitle: string; // for seo + in the pattern's list card
  abbreviation: Record<string, string>; // {ch: chain, dc: double crochet, etc.}
  userId: string;
  post: IPatternPost[];
  createdAt: Date;
  updatedAt: Date;
}
