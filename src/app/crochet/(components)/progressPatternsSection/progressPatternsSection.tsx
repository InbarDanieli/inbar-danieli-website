import { IProgressPatternCard } from "../../(types)/dashbaord.types";
import ProgressBar from "../progressBar/progressBar";
import styles from "./progressPatternsSection.module.scss";
import globalStyles from "../../(styles)/globals.module.scss";
import { GiSpellBook } from "react-icons/gi";
import EmptySection from "../emptySection/emptySection";
import { patternsComingSoon } from "../../(helpers)/getTimeOfDay";

export default function ProgressPatternsSection({
  cards,
}: {
  cards: IProgressPatternCard[];
}) {

  if(patternsComingSoon){
    return (
      <EmptySection
        title="Coming soon!"
        description={`We're working on adding this feature soon! \n Check back soon for updates.`}
        icon={<GiSpellBook size={60} />}
        variant="pattern"
      />
    );
  }

  if (cards.length <= 0) {
    return (
      <EmptySection
        title="No Project in Progress"
        description={`Looks like you're ready to start something new! \n Go to your patterns and start your next project.`}
        icon={<GiSpellBook size={60} />}
        variant="pattern"
      />
    );
  }

  return (
    <div
      className={`${styles["progress-pattern-card-section"]} ${globalStyles["grid-section"]}`}
    >
      {cards.map((card, idx) => (
        <a
          href={card.patternLink}
          className={styles["card-item"]}
          key={card.id || card.title + idx}
        >
          <img src={card.image} alt={card.title} />
          <div className={styles["card-item-content"]}>
            <h4>{card.title}</h4>

            <p className={"secondary-text"}>{card.progress}% Complete</p>
            <ProgressBar progress={card.progress} />
          </div>
        </a>
      ))}
    </div>
  );
}
