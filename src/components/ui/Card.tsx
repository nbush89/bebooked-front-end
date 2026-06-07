"use client";

import React from "react";

type CardVariant = "linen" | "raised" | "outline" | "inverse";
type CardRadius = "none" | "sm" | "md" | "lg" | "xl";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  radius?: CardRadius;
  interactive?: boolean;
  padding?: string;
}

const variants: Record<CardVariant, React.CSSProperties> = {
  linen:   { background: "var(--surface-card)",   color: "var(--text-primary)", border: "var(--border-hairline) solid transparent",          boxShadow: "none" },
  raised:  { background: "var(--surface-raised)",  color: "var(--text-primary)", border: "var(--border-hairline) solid var(--border-default)", boxShadow: "var(--shadow-md)" },
  outline: { background: "transparent",            color: "var(--text-primary)", border: "var(--border-hairline) solid var(--border-default)", boxShadow: "none" },
  inverse: { background: "var(--surface-inverse)", color: "var(--text-on-dark)", border: "var(--border-hairline) solid transparent",          boxShadow: "none" },
};

const radii: Record<CardRadius, string> = {
  none: "var(--radius-none)",
  sm:   "var(--radius-sm)",
  md:   "var(--radius-md)",
  lg:   "var(--radius-lg)",
  xl:   "var(--radius-xl)",
};

export function Card({
  children,
  variant = "linen",
  radius = "md",
  interactive = false,
  padding = "24px",
  className = "",
  style,
  ...rest
}: CardProps) {
  const v = variants[variant];

  return (
    <div
      className={className}
      style={{
        borderRadius: radii[radius],
        padding,
        fontFamily: "var(--font-sans)",
        transition: interactive
          ? "box-shadow var(--dur-normal) var(--ease-standard), transform var(--dur-normal) var(--ease-standard)"
          : undefined,
        cursor: interactive ? "pointer" : undefined,
        ...v,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (interactive) {
          e.currentTarget.style.boxShadow = "var(--shadow-lg)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        if (interactive) {
          e.currentTarget.style.boxShadow = v.boxShadow as string;
          e.currentTarget.style.transform = "none";
        }
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
