import { toast } from "react-toastify";
import { IYarnSchema } from "@/types/yarn.types";
import { FormFieldValue } from "@/types/form.types";

export const getYarns = async () => {
  try {
    const response = await fetch("/api/yarns");
    const data = await response.json();
    if (data.status !== 200) {
      throw new Error(data.message);
    }
    return data.data || [];
  } catch (error) {
    console.log({ error });
    throw (error as { message: string }).message || "Error fetching yarns";
  }
};

export async function getYarn(
  yarnId: string
): Promise<IYarnSchema | undefined> {
  try {
    const response = await fetch(`/api/yarns/${yarnId}`);
    const data = await response.json();
    if (data.status !== 200) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching yarn:", error);

    toast.error("Error fetching yarn, please try again");
  }
}

export const deleteYarn = async (yarn: IYarnSchema) => {
  try {
    const response = await fetch(`/api/yarns/${yarn._id}`, {
      method: "DELETE",
    });

    return response.json();
  } catch (error) {
    console.log({ error });
    throw (error as { message: string }).message || "Error deleting yarn";
  }
};