import { KeyboardEvent } from "react";

export const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
  const target = e.target as HTMLElement;
  const isTextarea = target.tagName === "TEXTAREA";
  const isSubmitButton =
    target.tagName === "BUTTON" &&
    (target as HTMLButtonElement).type === "submit";

  // Only allow Enter to submit if it's on a submit button
  // Block Enter submission from inputs (but allow in textareas for new lines)
  if (e.key === "Enter" && !isTextarea && !isSubmitButton) {
    e.preventDefault();
  }
};
