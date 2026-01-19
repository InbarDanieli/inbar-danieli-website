import { TPatternPostType } from "@/types/pattern.types";
import { HiOutlineNumberedList } from "react-icons/hi2";
import { IoMdImage, IoMdInformationCircle } from "react-icons/io";
import { MdOutlineSpaceBar, MdTitle } from "react-icons/md";
import styles from "./selectTypeButton.module.scss";

export const blockTypes: {
  type: TPatternPostType;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    type: "title",
    label: "Block Title",
    icon: <MdTitle />,
  },
  {
    type: "row",
    label: "Row Instructions",
    icon: <HiOutlineNumberedList />,
  },
  {
    type: "images",
    label: "Images",
    icon: <IoMdImage />,
  },
  {
    type: "general-note",
    label: "General Note",
    icon: <IoMdInformationCircle />,
  },
  {
    type: "space",
    label: "Space",
    icon: <MdOutlineSpaceBar />,
  },
  {
    type: "separator",
    label: "Separator",
    icon: <div className={styles["separator-icon"]}></div>,
  },
];
