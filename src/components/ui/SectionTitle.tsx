import { cn } from "@/lib/utils";

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionTitle({
  badge,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {badge && (
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold uppercase tracking-wider",
            light
              ? "border-white/30 bg-white/10 text-white/90"
              : "border-primary/20 bg-primary/10 text-primary"
          )}
        >
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight lg:text-4xl",
          light ? "text-white" : "text-dark"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-lg leading-relaxed",
            light ? "text-white/75" : "text-muted",
            align === "center" && "text-center"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
