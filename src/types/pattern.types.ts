export interface IPattern extends Document, IPatternProps {}

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
  post: {
    type: "title" | "row" | "images" | "space" | "separator" | "general-note";
    content: string;
    images: string[];
  }[];
  createdAt: Date;
  updatedAt: Date;
}
