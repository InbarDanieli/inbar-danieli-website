import styles from "./page.module.scss";
import Hero from "./(compoents)/hero/hero";
import Projects from "./(compoents)/projects/projects";
import TechnologyStack from "./(compoents)/stack/stack";
import Resume from "./(compoents)/resume/resume";

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <Projects />
      <TechnologyStack />
      <Resume/>
    </div>
  );
}
