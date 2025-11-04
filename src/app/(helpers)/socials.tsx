import { LuGithub } from "react-icons/lu";
import { PiLinkedinLogo } from "react-icons/pi";
import { FaMedium } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

export const socials = [
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/inbar-danieli/",
    icon: <PiLinkedinLogo />,
  },
  {
    name: "GitHub",
    url: "https://github.com/inbardanieli",
    icon: <LuGithub />,
  },
  {
    name: "Medium",
    url: "https://medium.com/@inbardanieli",
    icon: <FaMedium />,
  },
  {
    name: "email",
    url: "mailto:inbar0308@gmail.com",
    icon: <MdOutlineMail />,
  },
  {
    name: "phone",
    url: "tel:+0543362818",
    icon: <FaPhoneAlt />,
  },
];
