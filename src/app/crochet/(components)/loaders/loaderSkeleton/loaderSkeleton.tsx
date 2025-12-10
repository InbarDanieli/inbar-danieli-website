"use client";

import { CSSProperties } from "react";
import styles from "./loaderSkeleton.module.scss";

export default function LoaderSkeleton({
  height,
  width,
  baseColor,
  highlightColor,
  animationDuration,
  animationDirection,
  skeletonRadius,
}: {
  height?: string;
  width?: string;
  baseColor?: string;
  highlightColor?: string;
  animationDuration?: string;
  animationDirection?: string;
  skeletonRadius?: string;
}) {
  return (
    <div
      className={`
    ${styles["loader-skeleton"]}
    `}
      style={{
        "--height": height,
        "--width": width,
        "--base-color": baseColor,
        "--highlight-color": highlightColor,
        "--animation-duration": animationDuration,
        "--animation-direction": animationDirection,
        "--skeleton-radius": skeletonRadius,
      } as CSSProperties}
    ></div>
  );
}
