import React from "react";

type WordmarkSize = "sm" | "md" | "lg" | "xl";
type WordmarkTone = "dark" | "light";

interface WordmarkProps extends React.HTMLAttributes<HTMLElement> {
  size?: WordmarkSize;
  tone?: WordmarkTone;
  as?: React.ElementType;
}

const sizeMap: Record<WordmarkSize, string> = {
  sm: "22px",
  md: "32px",
  lg: "56px",
  xl: "80px",
};

export default function Wordmark({ size = "md", tone = "dark", as: Tag = "span", className = "", style, ...rest }: WordmarkProps) {
  const color = tone === "light" ? "var(--text-on-dark)" : "var(--text-primary)";

  return (
    <Tag
      className={className}
      style={{
        fontFamily:    "var(--font-sans)",
        fontSize:      sizeMap[size],
        lineHeight:    1,
        letterSpacing: "var(--tracking-tight)",
        color,
        whiteSpace:    "nowrap",
        display:       "inline-block",
        ...style,
      }}
      {...rest}
    >
      <span style={{ fontWeight: "var(--weight-bold)" }}>Be</span>
      <span style={{ fontWeight: "var(--weight-light)" }}>Booked</span>
    </Tag>
  );
}
