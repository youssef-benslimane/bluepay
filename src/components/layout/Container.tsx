import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  narrow?: boolean;
}

export function Container({
  children,
  narrow = false,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow ? "max-w-4xl" : "max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
