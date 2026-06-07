import React from "react";

type AppIconVariant = "black" | "cream" | "warm";

interface AppIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  variant?: AppIconVariant;
}

const variants: Record<AppIconVariant, { bg: string; fg: string }> = {
  black: { bg: "var(--near-black)", fg: "var(--warm-cream)" },
  cream: { bg: "var(--warm-cream)", fg: "var(--near-black)" },
  warm:  { bg: "var(--warm-linen)", fg: "var(--near-black)" },
};

export function AppIcon({ size = 64, variant = "black", className = "", style, ...rest }: AppIconProps) {
  const v = variants[variant];
  const radius = Math.round(size * 0.26); // squircle tile

  return (
    <span
      className={className}
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        justifyContent: "center",
        width:          size,
        height:         size,
        borderRadius:   radius,
        background:     v.bg,
        color:          v.fg,
        border:         variant === "cream" ? "var(--border-hairline) solid var(--border-default)" : "none",
        fontFamily:     "var(--font-sans)",
        fontSize:       size * 0.5,
        lineHeight:     1,
        letterSpacing:  "-0.04em",
        userSelect:     "none",
        ...style,
      }}
      {...rest}
    >
      <span style={{ fontWeight: "var(--weight-bold)" }}>B</span>
      <span style={{ fontWeight: "var(--weight-light)" }}>b</span>
    </span>
  );
}
