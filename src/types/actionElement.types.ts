export interface IActionElementProps {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "primary-full"
    | "secondary-full"
    | "primary-color"
    | "secondary-color"
    | "back";
  fontSize?: "small" | "medium" | "large";
  className?: string;
}
