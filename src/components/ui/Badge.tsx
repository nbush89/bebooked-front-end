import React from "react";

type BadgeVariant = "outline" | "soft" | "solid";
type BadgeTone = "neutral" | "sage" | "success" | "danger" | "onDark";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  tone?: BadgeTone;
}

const toneColors: Record<BadgeTone, { fg: string; border: string; soft: string }> = {
  neutral: { fg: "var(--text-primary)",   border: "var(--border-default)", soft: "var(--surface-card)" },
  sage:    { fg: "var(--sage-deep)",       border: "var(--sage)",           soft: "var(--sage-soft)" },
  success: { fg: "var(--success)",         border: "var(--success)",        soft: "var(--success-soft)" },
  danger:  { fg: "var(--danger)",          border: "var(--danger)",         soft: "var(--danger-soft)" },
  onDark:  { fg: "var(--text-on-dark-dim)", border: "var(--border-on-dark)", soft: "transparent" },
};

export function Badge({ children, variant = "outline", tone = "neutral", className = "", style, ...rest }: BadgeProps) {
  const t = toneColors[tone];

  const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
    outline: { background: "transparent",  color: t.fg,             border: `var(--border-hairline) solid ${t.border}` },
    soft:    { background: t.soft,          color: t.fg,             border: "var(--border-hairline) solid transparent" },
    solid:   { background: t.border,        color: "var(--warm-cream)", border: "var(--border-hairline) solid transparent" },
  };

  return (
    <span
      className={className}
      style={{
        display:       "inline-flex",
        alignItems:    "center",
        gap:           "6px",
        fontFamily:    "var(--font-sans)",
        fontSize:      "11px",
        fontWeight:    "var(--weight-regular)",
        letterSpacing: "var(--tracking-wide)",
        textTransform: "uppercase",
        lineHeight:    1,
        padding:       "5px 9px",
        borderRadius:  "var(--radius-none)",
        ...variantStyles[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
