type WordmarkSize = "sm" | "md" | "lg";

const sizeMap: Record<WordmarkSize, string> = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-6xl md:text-7xl",
};

type WordmarkProps = {
  size?: WordmarkSize;
  className?: string;
};

export default function Wordmark({ size = "sm", className = "" }: WordmarkProps) {
  return (
    <span className={`${sizeMap[size]} tracking-tight ${className}`}>
      <span className="font-bold">Be</span>
      <span className="font-light">booked</span>
    </span>
  );
}
