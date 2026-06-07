"use client";

import React, { useState } from "react";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string;
  hint?: string;
  error?: string;
  prefix?: React.ReactNode;
}

export function Input({ label, hint, error, id, type = "text", prefix, className = "", style, ...rest }: InputProps) {
  const inputId = id ?? (label ? `in-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const [focused, setFocused] = useState(false);

  const borderColor = error ? "var(--danger)" : focused ? "var(--border-strong)" : "var(--border-default)";

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: "7px", ...style }}>
      {label && (
        <label
          htmlFor={inputId}
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
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "transparent",
          border: `var(--border-hairline) solid ${borderColor}`,
          borderRadius: "var(--radius-none)",
          padding: "0 14px",
          transition: "border-color var(--dur-normal) var(--ease-standard)",
        }}
      >
        {prefix && <span style={{ color: "var(--text-muted)", fontSize: "15px", display: "flex" }}>{prefix}</span>}
        <input
          id={inputId}
          type={type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-sans)",
            fontSize: "16px",
            fontWeight: "var(--weight-regular)",
            color: "var(--text-primary)",
            padding: "13px 0",
            width: "100%",
          }}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: error ? "var(--danger)" : "var(--text-muted)" }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
