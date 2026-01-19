import { IPatternPost, TPatternPostType } from "@/types/pattern.types";
import { v4 as uuidv4 } from "uuid";

export const getDefaultPostPerType = (type: TPatternPostType): IPatternPost => {
  switch (type) {
    case "title":
      return { type: "title", content: "", images: [], id: uuidv4() };
    case "row":
      return { type: "row", content: "", images: [], id: uuidv4() };
    case "images":
      return { type: "images", content: "", images: [], id: uuidv4() };
    case "space":
      return { type: "space", content: "", images: [], id: uuidv4() };
    case "separator":
      return { type: "separator", content: "", images: [], id: uuidv4() };
    case "general-note":
      return { type: "general-note", content: "", images: [], id: uuidv4() };
    default:
      return { type: "title", content: "", images: [], id: uuidv4() };
  }
};
