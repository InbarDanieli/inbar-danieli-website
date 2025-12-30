import { IFormFieldConfig } from "@/types/form.types";

export const formFields: IFormFieldConfig[] = [
  {
    name: "name",
    label: "Yarn Name",
    type: "text",
    placeholder: "e.g., Superwash Merino",
    required: true,
    gridColumn: "full",
  },
  {
    name: "color",
    label: "Color",
    type: "color",
    required: true,
    gridColumn: "half",
  },
  {
    name: "company",
    label: "Brand",
    type: "text",
    placeholder: "e.g., Malabrigo",
    gridColumn: "half",
  },
  {
    name: "colorTag",
    label: "Color Tag",
    type: "text",
    placeholder: "e.g., Blue, Red, Multicolor",
    gridColumn: "full",
  },
  {
    name: "materials",
    label: "Fiber Materials",
    type: "materials",
    gridColumn: "full",
  },

  {
    name: "image",
    label: "Upload Photo",
    type: "file",
    accept: "PNG, JPG or GIF (MAX. 800x400px)",
    gridColumn: "full",
  },
];

