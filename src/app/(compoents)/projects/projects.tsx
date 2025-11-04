import Image from "next/image";
import styles from "./projects.module.scss";
import { projects } from "@/app/(helpers)/projects";

export default function Projects() {
  return (
    <div className={`${styles["projects-wrapper"]} wrapper have-padding`}>
      <h2>Projects</h2>
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
              <h4 className={styles["project-title"]}>{project.title}</h4>
              <p className={styles["project-description"]}>
                {project.description}
              </p>
              <a
                className={styles["project-link"]}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
