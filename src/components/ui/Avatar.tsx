import React from "react";

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  name?: string;
  size?: number;
}

export function Avatar({ src, name = "", size = 48, className = "", style, ...rest }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      className={className}
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        justifyContent: "center",
        width:          size,
        height:         size,
        borderRadius:   "var(--radius-pill)",
        overflow:       "hidden",
        background:     "var(--surface-card)",
        border:         "var(--border-hairline) solid var(--border-default)",
        color:          "var(--text-secondary)",
        fontFamily:     "var(--font-sans)",
        fontWeight:     "var(--weight-medium)",
        fontSize:       size * 0.38,
        letterSpacing:  "0.02em",
        flexShrink:     0,
        ...style,
      }}
      {...rest}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        initials || "·"
      )}
    </span>
  );
}
