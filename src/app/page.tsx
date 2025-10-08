import Image from "next/image";
import styles from "./page.module.scss";
import { LuGithub } from "react-icons/lu";
import { PiLinkedinLogo } from "react-icons/pi";
import { FaMedium } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

export default function Home() {
  const socials = [
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
  return (
    <div className={styles.page}>
      <Image
        className={styles["cover-image"]}
        alt=""
        src="/inbar-danieli.png"
        width={160}
        height={160}
      />
      <h1>Inbar Danieli</h1>
      <h3>FrontEnd Developer</h3>
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
      <h5>
        FrontEnd Developer and open source contributor. A self-learner, always
        eager to explore new technologies, and continuously improve my skills.
        CSS enthusiast and responsible for developing the Reversim 2025 website.
      </h5>
    </div>
  );
}
