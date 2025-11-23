import styles from "./emptySection.module.scss";

export default function EmptySection({
  title,
  description,
  icon,
  variant = "pattern",
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  variant: "pattern" | "yarn";
}) {
  return (
    <div className={`${styles["no-items-found"]} ${styles[variant]}`}>
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
      {/* TODO - add button to navigate to patterns page */}
    </div>
  );
}
