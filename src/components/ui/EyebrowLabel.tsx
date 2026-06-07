import React from "react";

type EyebrowTone = "default" | "muted" | "accent" | "onDark";

interface EyebrowLabelProps extends React.HTMLAttributes<HTMLElement> {
  tone?: EyebrowTone;
  as?: React.ElementType;
}

const tones: Record<EyebrowTone, string> = {
  default: "var(--text-primary)",
  muted:   "var(--text-muted)",
  accent:  "var(--text-accent)",
  onDark:  "var(--text-on-dark-dim)",
};

export function EyebrowLabel({ children, tone = "default", as: Tag = "span", className = "", style, ...rest }: EyebrowLabelProps) {
  return (
    <Tag
      className={className}
      style={{
        fontFamily:    "var(--font-sans)",
        fontSize:      "12px",
        fontWeight:    "var(--weight-regular)",
        letterSpacing: "var(--tracking-wider)",
        textTransform: "uppercase",
        color:         tones[tone] ?? tones.default,
        display:       "inline-block",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
