import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  hover = false,
  padding = "md",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-white",
        "[box-shadow:var(--shadow-card)]",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:[box-shadow:var(--shadow-card-hover)] hover:border-primary/20",
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
