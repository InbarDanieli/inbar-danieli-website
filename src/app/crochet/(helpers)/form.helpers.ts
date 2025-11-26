import { FormFieldConfig } from "../(types)/form";
import { IYarnSchema } from "../(types)/yarn";

export const yarnWeightOptions = [
    { label: "Lace", value: "lace" },
    { label: "Fingering", value: "fingering" },
    { label: "Sport", value: "sport" },
    { label: "DK (Double Knitting)", value: "dk" },
    { label: "Worsted", value: "worsted" },
    { label: "Aran", value: "aran" },
    { label: "Bulky", value: "bulky" },
    { label: "Super Bulky", value: "super-bulky" },
    { label: "Jumbo", value: "jumbo" },
  ];

export const formFields: FormFieldConfig[] = [
    {
      name: "name",
      label: "Yarn Name",
      type: "text",
      placeholder: "e.g., Superwash Merino",
      required: true,
      gridColumn: "full",
    },
    {
      name: "company",
      label: "Brand",
      type: "text",
      placeholder: "e.g., Malabrigo",
      gridColumn: "half",
    },
    {
      name: "color",
      label: "Color / Dye Lot",
      type: "text",
      placeholder: "e.g., 'Paris Night' or '801'",
      required: true,
      gridColumn: "half",
    },
    {
      name: "yarnWeight",
      label: "Yarn Weight",
      type: "select",
      options: yarnWeightOptions,
      placeholder: "Select a weight...",
      gridColumn: "half",
    },
    {
      name: "quantity",
      label: "Quantity (Skeins)",
      type: "number",
      value: 1,
      gridColumn: "half",
    },
    {
      name: "materials",
      label: "Fiber Materials",
      type: "materials",
      required: true,
      gridColumn: "full",
    },
    {
      name: "colorTag",
      label: "Color Tag",
      type: "text",
      placeholder: "e.g., Blue, Red, Multicolor",
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


  export async function AddYarnToDB(yarn: Omit<IYarnSchema, "_id">) {
    try {
      const response = await fetch("/api/yarns", {
        method: "POST",
        body: JSON.stringify(yarn),
      });
      const data = await response.json();
      if (data.status !== 200) {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error) {
      console.log({ error });
      throw (error as { message: string }).message || "Error adding yarn to DB";
    }
  }