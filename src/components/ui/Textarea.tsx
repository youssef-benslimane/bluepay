import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-dark">
            {label}
            {props.required && (
              <span className="ml-1 text-error" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full resize-y rounded-xl border bg-white px-4 py-3 text-dark placeholder:text-muted/60 transition-colors duration-200 min-h-[120px]",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            error
              ? "border-error focus:border-error focus:ring-error/20"
              : "border-border hover:border-border-dark",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
        {hint && !error && <p className="text-sm text-muted">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
