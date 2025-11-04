import { getSocials } from "@/app/(helpers)/socials";
import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <div className={styles["footer-wrapper"]}>
      <p>© 2025 Inbar Danieli. All rights reserved.</p>

      <div className={styles["socials-list"]}>
        {getSocials(["github", "linkedin", "email"]).map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.label}
          </a>
        ))}
      </div>
    </div>
  );
}
