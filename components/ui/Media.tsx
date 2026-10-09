import Image from "next/image";
import type { MediaAsset } from "@/data/types";
import { cn } from "@/lib/cn";
import styles from "./Media.module.css";

type MediaProps = {
  asset: MediaAsset;
  /** Responsive `sizes` hint — required so the browser picks the right file. */
  sizes: string;
  /** Preload only the above-the-fold hero image. */
  preload?: boolean;
  className?: string;
};

/**
 * Image slot. Renders an optimised `next/image` when `asset.src` exists;
 * otherwise an art-directed placeholder plate whose caption states exactly
 * which asset is required. The parent controls the aspect ratio.
 */
export function Media({ asset, sizes, preload = false, className }: MediaProps) {
  if (asset.src) {
    return (
      <div className={cn(styles.frame, className)}>
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={sizes}
          preload={preload}
          quality={85}
          className={styles.image}
          style={asset.focus ? { objectPosition: asset.focus } : undefined}
        />
      </div>
    );
  }

  return (
    <div className={cn(styles.frame, styles.plate, styles[asset.tone ?? "stone"], className)}>
      {asset.monogram ? (
        <span aria-hidden="true" className={styles.monogram}>
          {asset.monogram}
        </span>
      ) : null}
      <span className={styles.caption} data-placeholder>
        [{asset.placeholder}]
      </span>
    </div>
  );
}
