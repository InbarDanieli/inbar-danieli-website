import { IPatternPost, TPatternPostType } from "@/types/pattern.types";
import { v4 as uuidv4 } from "uuid";

export const getDefaultPostPerType = ({
  pattern,
  type,
}: {
  pattern: IPatternPost[];
  type: TPatternPostType;
}): IPatternPost => {
  let count = 1;

  if (
    type === "row" &&
    pattern.length > 0 &&
    (pattern[pattern.length - 1].type === "general-note" ||
      pattern[pattern.length - 1].type === "images" ||
      pattern[pattern.length - 1].type === "row")
  ) {
    for (let i = pattern.length - 1; i >= 0; i--) {
      if (pattern[i].type === "row") {
        count = (pattern[i]?.rowNumber ?? 1) + 1;
        break;
      }
    }
  }

  switch (type) {
    case "title":
      return { type: "title", content: "", images: [], id: uuidv4() };
    case "row":
      return {
        type: "row",
        content: "",
        images: [],
        id: uuidv4(),
        rowNumber: count,
      };
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
