import { FaFileDownload } from "react-icons/fa";
import styles from "./resume.module.scss";

export default function Resume() {
  return (
    <div className={`${styles["resume-wrapper"]} wrapper have-padding`}>
      <h2>Resume</h2>
      <a className={styles["resume-download-link"]} href="/inbar-danieli-resume.pdf" target="_blank" download>
        <FaFileDownload /> Download Resume
      </a>
    </div>
  );
}
