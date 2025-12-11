"use client";

import {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Hero from "../hero/hero";
import styles from "./popup.module.scss";

export interface IPopupProps {
  popupContentStyles?: CSSProperties;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  size?: "small" | "medium" | "large" | "fullscreen";
  className?: string;
  onClickHandler: () => void;
  showHeader?: boolean;
}

export default function Popup({
  children,
  popupContentStyles,
  isOpen,
  onClose,
  title,
  subtitle,
  showCloseButton = true,
  closeOnOutsideClick = true,
  size = "medium",
  className = "",
  showHeader = true,
}: IPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (
        closeOnOutsideClick &&
        popupRef.current &&
        !popupRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    },
    [closeOnOutsideClick, onClose]
  );

  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleOutsideClick, handleEscapeKey]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div
        ref={popupRef}
        className={`${styles.popup} ${styles[size]} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "popup-title" : undefined}
      >
        {showHeader && (
          <div className={styles.header}>
            <Hero
              variant="popup"
              title={title || ""}
              subtitle={subtitle || ""}
              onSecondaryClick={showCloseButton ? onClose : undefined}
              secondaryButtonLabel="Close"
              titleType="h2"
              titleVariant="secondary"
            />
          </div>
        )}
        <div className={styles.content} style={popupContentStyles}>{children}</div>
      </div>
    </div>
  );
}
