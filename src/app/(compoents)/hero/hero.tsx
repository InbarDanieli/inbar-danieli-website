import Image from "next/image";
import { socials } from "@/app/(helpers)/socials";
import styles from "./hero.module.scss";
import { FaCat } from "react-icons/fa6";
import { IoLogoOctocat } from "react-icons/io";
import { IoLogoCss3 } from "react-icons/io";
import { SiMongodb } from "react-icons/si";
import { IoLogoFirebase } from "react-icons/io5";
import { IoLogoGameControllerB } from "react-icons/io";
import { GiBookshelf } from "react-icons/gi";
import { FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { TbBrandTypescript } from "react-icons/tb";
import { TbBrandFigma } from "react-icons/tb";
import { PiYarn } from "react-icons/pi";
import Hook from "../../(images)/hook.svg";

const aboutMeIcons = [
  { icon: <FaCat />, label: "Cat" },
  { icon: <IoLogoOctocat />, label: "GitHub" },
  { icon: <IoLogoCss3 />, label: "CSS" },
  { icon: <SiMongodb />, label: "MongoDB" },
  { icon: <IoLogoFirebase />, label: "Firebase" },
  { icon: <IoLogoGameControllerB />, label: "Game Controller" },
  { icon: <GiBookshelf />, label: "Bookshelf" },
  { icon: <FaReact />, label: "React" },
  { icon: <IoLogoJavascript />, label: "JavaScript" },
  { icon: <TbBrandTypescript />, label: "TypeScript" },
  { icon: <TbBrandFigma />, label: "Figma" },
  {
    icon: (
      <div className={styles["crochet-icon"]}>
        <Image src={Hook.src} alt="Hooks" width={3} height={20} />
        <PiYarn />
      </div>
    ),
    label: "Yarn",
  },
];

export default function Hero() {
  return (
    <div className={`${styles["hero-wrapper"]} wrapper`}>
      <div className={styles["about-me-icons"]}>
        {aboutMeIcons.map((icon) => (
          <div key={icon.label} className={styles["about-me-icon"]}>
            {icon.icon}
          </div>
        ))}
      </div>
      <Image
        className={styles["cover-image"]}
        alt=""
        src="/inbar-danieli.png"
        width={160}
        height={160}
      />
      <h1>Inbar Danieli</h1>
      <h4 className="font-semibold">Software Developer</h4>
      <div className={styles.socials}>
        {socials.map((social) => (
          <a
            className={styles["social-link"]}
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>
      <h5 className="text-center">
        Software developer and open source contributor. A self-learner, always
        eager to explore new technologies, and continuously improve my skills.
        CSS enthusiast and responsible for developing the Reversim 2025 website.
      </h5>
    </div>
  );
}
