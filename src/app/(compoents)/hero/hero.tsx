import Image from "next/image";
import { socials } from "@/app/(helpers)/socials";
import styles from "./hero.module.scss";

export default function Hero() {
  return (
    <div className={`${styles["hero-wrapper"]} wrapper`}>
      <Image
        className={styles["cover-image"]}
        alt=""
        src="/inbar-danieli.png"
        width={160}
        height={160}
      />
      <h1>Inbar Danieli</h1>
      <h4 className="font-semibold">FrontEnd Developer</h4>
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
        FrontEnd Developer and open source contributor. A self-learner, always
        eager to explore new technologies, and continuously improve my skills.
        CSS enthusiast and responsible for developing the Reversim 2025 website.
      </h5>
    </div>
  );
}
