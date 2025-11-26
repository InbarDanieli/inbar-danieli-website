import { FormFieldConfig } from "../(types)/form";
import { IYarnSchema } from "../(types)/yarn";

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
    name: "color",
    label: "Color / Dye Lot",
    type: "text",
    placeholder: "e.g., 'Paris Night' or '801'",
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
