import { LuGithub } from "react-icons/lu";
import { PiLinkedinLogo } from "react-icons/pi";
import { FaMedium } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

export type TAvailableSocials =
  | "linkedin"
  | "github"
  | "medium"
  | "email"
  | "phone";

export interface ISocial {
  name: TAvailableSocials;
  label: string;
  url: string;
  icon: React.ReactNode;
}

export const socials: ISocial[] = [
  {
    name: "linkedin",
    label: "Linkedin",
    url: "https://www.linkedin.com/in/inbar-danieli/",
    icon: <PiLinkedinLogo />,
  },
  {
    name: "github",
    label: "GitHub",
    url: "https://github.com/inbardanieli",
    icon: <LuGithub />,
  },
  {
    name: "medium",
    label: "Medium",
    url: "https://medium.com/@inbardanieli",
    icon: <FaMedium />,
  },
  {
    name: "email",
    label: "Email",
    url: "mailto:inbar0308@gmail.com",
    icon: <MdOutlineMail />,
  },
  {
    name: "phone",
    label: "Phone",
    url: "tel:+0543362818",
    icon: <FaPhoneAlt />,
  },
];

export function getSocials(selectedSocials: TAvailableSocials[]): ISocial[] {
  return socials.filter((social) => selectedSocials.includes(social.name));
}
