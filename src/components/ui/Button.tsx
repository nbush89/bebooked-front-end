"use client";

import React from "react";

type ButtonVariant = "primary" | "secondary" | "accent" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const sizes: Record<ButtonSize, { padding: string; font: string; tracking: string }> = {
  sm: { padding: "9px 16px",  font: "13px", tracking: "0.06em" },
  md: { padding: "13px 24px", font: "15px", tracking: "0.04em" },
  lg: { padding: "17px 32px", font: "16px", tracking: "0.04em" },
};

const variants: Record<ButtonVariant, React.CSSProperties> = {
  primary:   { background: "var(--cta-bg)",    color: "var(--cta-text)",    border: "var(--border-regular) solid var(--cta-bg)" },
  accent:    { background: "var(--accent-bg)", color: "var(--accent-text)", border: "var(--border-regular) solid var(--accent-bg)" },
  secondary: { background: "transparent",      color: "var(--text-primary)", border: "var(--border-regular) solid var(--border-default)" },
  ghost:     { background: "transparent",      color: "var(--text-primary)", border: "var(--border-regular) solid transparent" },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  leadingIcon,
  trailingIcon,
  className = "",
  style,
  ...rest
}: ButtonProps) {
  const s = sizes[size];
  const v = variants[variant];

  return (
    <button
      type={type}
      disabled={disabled}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        width: fullWidth ? "100%" : "auto",
        padding: s.padding,
        fontFamily: "var(--font-sans)",
        fontSize: s.font,
        fontWeight: "var(--weight-bold)",
        letterSpacing: s.tracking,
        lineHeight: 1,
        whiteSpace: "nowrap",
        borderRadius: "var(--radius-none)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "opacity var(--dur-normal) var(--ease-standard), background var(--dur-normal) var(--ease-standard)",
        ...v,
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.opacity = String(0.82); }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.opacity = "1"; }}
      {...rest}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}
