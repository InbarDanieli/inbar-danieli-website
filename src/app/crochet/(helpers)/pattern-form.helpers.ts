import { IFormFieldConfig } from "@/types/form.types";
import { IPatternProps } from "@/types/pattern.types";

interface IPatternFields extends Omit<IFormFieldConfig, "name"> {
  name: keyof IPatternProps;
}

export const formFields: IPatternFields[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    gridColumn: "full",
    required: true,
    value: "",
  },
  {
    name: "subtitle",
    label: "Subtitle",
    type: "text",
    gridColumn: "full",
    required: true,
    value: "",
  },
  {
    name: "hookMinSize",
    label: "Minimum Hook Size",
    type: "number",
    gridColumn: "half",
    required: true,
    value: "",
  },
  {
    name: "hookMaxSize",
    label: "Maximum Hook Size",
    type: "number",
    gridColumn: "half",
    required: true,
    value: "",
  },
  {
    name: "yarns",
    label: "Yarns",
    type: "select",
    gridColumn: "full",
    // required: true,
  },
  {
    name: "materials",
    label: "Materials needed",
    type: "textarea",
    gridColumn: "full",
    required: true,
    value: "",
  },
  {
    name: "tipsAndInfo",
    label: "Tips and Info",
    type: "textarea",
    gridColumn: "full",
    value: "",
    required: true,
  },
];

export const formFeaturedImageFields: IPatternFields[] = [
  {
    name: "image",
    label: "",
    type: "file",
    gridColumn: "full",
    accept: "PNG, JPG or GIF (MAX. 800x400px)",
  },
];

export const abbreviationFields: IPatternFields[] = [
  {
    name: "abbreviation",
    label: "Abbreviations",
    type: "abbreviation",
    gridColumn: "full",
    required: true,
    value: "",
  },
];

export const patternContentFields: IPatternFields[] = [
  {
    name: "post",
    label: "Pattern Content",
    type: "pattern-content",
    gridColumn: "full",
    required: true,
    value: "",
  },
];