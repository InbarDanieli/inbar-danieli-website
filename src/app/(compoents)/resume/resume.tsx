import { FaFileDownload } from "react-icons/fa";
import styles from "./resume.module.scss";
import SectionTitle from "../sectionTitle/sectionTitle";

export default function Resume() {
  return (
    <div className={`${styles["resume-wrapper"]} wrapper have-padding`}>
      <SectionTitle
        title="Resume"
        description="Download my resume to learn more about my experience and qualifications."
      />

      <a
        className={styles["resume-download-link"]}
        href="/inbar-danieli-resume.pdf"
        target="_blank"
        download
      >
        <FaFileDownload /> Download Resume
      </a>
    </div>
  );
}
