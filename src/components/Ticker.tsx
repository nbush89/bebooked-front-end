import styles from "./Ticker.module.css";

const content =
  "Hair  ·  Nails  ·  Lashes  ·  Color  ·  Brows  ·  Extensions  ·  Waxing  ·  Skincare  ·  Makeup  ·  Balayage  ·  Braids  ·  Natural Hair  · ";

export default function Ticker() {
  return (
    <div className="bg-near-black overflow-hidden py-3">
      <div className={styles.track}>
        <span className="text-brand-stone text-[9px] tracking-[0.18em] uppercase font-light whitespace-nowrap pr-16">
          {content}
        </span>
        <span
          className="text-brand-stone text-[9px] tracking-[0.18em] uppercase font-light whitespace-nowrap pr-16"
          aria-hidden="true"
        >
          {content}
        </span>
      </div>
    </div>
  );
}
