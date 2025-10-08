import Image from "next/image";
import styles from "./page.module.scss";
import githubIcon from "../assets/github-icon.svg";

export default function Home() {
  const socials = [
    {
      name: "GitHub",
      url: "https://github.com/inbardanieli",
      icon: (
   <></>
      ),
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
