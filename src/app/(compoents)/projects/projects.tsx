import Image from "next/image";
import styles from "./projects.module.scss";
import { projects } from "@/app/(helpers)/projects";
import SectionTitle from "../sectionTitle/sectionTitle";

export default function Projects() {
  return (
    <div className={`${styles["projects-wrapper"]} wrapper have-padding`}>
      <SectionTitle title="My Projects" />
      <div className={styles["projects-list"]}>
        {projects.map((project, idx) => (
          <div className={styles["project-item"]} key={project.title + idx}>
            <Image
              className={styles["project-image"]}
              alt={project.title}
              src={project.image}
              width={300}
              height={200}
            />
            <div className={styles["project-info"]}>
              <a
                className={styles["project-link"]}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className={styles["project-title"]}>{project.title}</h4>
              </a>
              <p className={styles["project-description"]}>
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
