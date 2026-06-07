"use client";

import React from "react";

type IconButtonVariant = "primary" | "secondary" | "accent" | "ghost";
type IconButtonSize = "sm" | "md" | "lg";
type IconButtonShape = "square" | "round";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  shape?: IconButtonShape;
  label: string; // required for accessibility
}

const dims: Record<IconButtonSize, number> = { sm: 34, md: 42, lg: 50 };

const variants: Record<IconButtonVariant, React.CSSProperties> = {
  primary:   { background: "var(--cta-bg)",    color: "var(--cta-text)",    border: "var(--border-regular) solid var(--cta-bg)" },
  accent:    { background: "var(--accent-bg)", color: "var(--accent-text)", border: "var(--border-regular) solid var(--accent-bg)" },
  secondary: { background: "transparent",      color: "var(--text-primary)", border: "var(--border-regular) solid var(--border-default)" },
  ghost:     { background: "transparent",      color: "var(--text-primary)", border: "var(--border-regular) solid transparent" },
};

export function IconButton({
  children,
  variant = "secondary",
  size = "md",
  shape = "square",
  disabled = false,
  label,
  className = "",
  style,
  ...rest
}: IconButtonProps) {
  const d = dims[size];
  const v = variants[variant];

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      className={className}
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        justifyContent: "center",
        width:          d,
        height:         d,
        borderRadius:   shape === "round" ? "var(--radius-pill)" : "var(--radius-none)",
        cursor:         disabled ? "not-allowed" : "pointer",
        opacity:        disabled ? 0.45 : 1,
        transition:     "opacity var(--dur-normal) var(--ease-standard)",
        ...v,
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.opacity = String(0.82); }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.opacity = "1"; }}
      {...rest}
    >
      {children}
    </button>
  );
}
