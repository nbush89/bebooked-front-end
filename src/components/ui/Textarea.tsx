"use client";

import React, { useState } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Textarea({ label, hint, error, id, rows = 4, className = "", style, ...rest }: TextareaProps) {
  const taId = id ?? (label ? `ta-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const [focused, setFocused] = useState(false);

  const borderColor = error ? "var(--danger)" : focused ? "var(--border-strong)" : "var(--border-default)";

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: "7px", ...style }}>
      {label && (
        <label
          htmlFor={taId}
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
      <textarea
        id={taId}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          border: `var(--border-hairline) solid ${borderColor}`,
          borderRadius: "var(--radius-none)",
          background: "transparent",
          fontFamily: "var(--font-sans)",
          fontSize: "16px",
          lineHeight: "var(--leading-relaxed)",
          color: "var(--text-primary)",
          padding: "12px 14px",
          outline: "none",
          resize: "vertical",
          transition: "border-color var(--dur-normal) var(--ease-standard)",
        }}
        {...rest}
      />
      {(hint || error) && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: error ? "var(--danger)" : "var(--text-muted)" }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
