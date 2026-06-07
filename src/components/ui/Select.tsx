"use client";

import React, { useState } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  hint?: string;
  error?: string;
  options?: SelectOption[] | string[];
  children?: React.ReactNode;
}

export function Select({ label, hint, error, id, options, children, className = "", style, ...rest }: SelectProps) {
  const selId = id ?? (label ? `sel-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const [focused, setFocused] = useState(false);

  const borderColor = error ? "var(--danger)" : focused ? "var(--border-strong)" : "var(--border-default)";

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: "7px", ...style }}>
      {label && (
        <label
          htmlFor={selId}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            fontWeight: "var(--weight-medium)",
            letterSpacing: "var(--tracking-wider)",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
          }}
        >
          {label}
        </label>
      )}
      <div
        style={{
          position: "relative",
          border: `var(--border-hairline) solid ${borderColor}`,
          borderRadius: "var(--radius-none)",
          transition: "border-color var(--dur-normal) var(--ease-standard)",
        }}
      >
        <select
          id={selId}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            width: "100%",
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-sans)",
            fontSize: "16px",
            fontWeight: "var(--weight-regular)",
            color: "var(--text-primary)",
            padding: "13px 40px 13px 14px",
            cursor: "pointer",
          }}
          {...rest}
        >
          {options
            ? options.map((o) => {
                const value = typeof o === "object" ? o.value : o;
                const text  = typeof o === "object" ? o.label : o;
                return <option key={value} value={value}>{text}</option>;
              })
            : children}
        </select>
        {/* Chevron affordance */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "14px",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: "var(--text-secondary)",
            display: "flex",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </div>
      {(hint || error) && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: error ? "var(--danger)" : "var(--text-muted)" }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
