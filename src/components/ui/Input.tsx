import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { sanitizeDecimalInput, sanitizeIntegerInput } from "@/lib/numeric-input";

type NumericMode = "decimal" | "integer";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  hint?: string;
  /** Sélectionne tout le contenu au focus pour remplacer en tapant */
  selectOnFocus?: boolean;
  /** Champ texte sans flèches, chiffres uniquement (décimaux ou entiers) */
  numeric?: NumericMode;
  type?: React.HTMLInputTypeAttribute;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    hint,
    className,
    id,
    selectOnFocus,
    numeric,
    type = "text",
    onFocus,
    onChange,
    inputMode,
    ...props
  }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const isNumeric = Boolean(numeric);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-dark"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-error" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={isNumeric ? "text" : type}
          inputMode={isNumeric ? (numeric === "decimal" ? "decimal" : "numeric") : inputMode}
          onFocus={(e) => {
            onFocus?.(e);
            if (selectOnFocus) e.target.select();
          }}
          onChange={(e) => {
            if (isNumeric) {
              const sanitized =
                numeric === "decimal"
                  ? sanitizeDecimalInput(e.target.value)
                  : sanitizeIntegerInput(e.target.value);
              if (e.target.value !== sanitized) e.target.value = sanitized;
            }
            onChange?.(e);
          }}
          className={cn(
            "w-full rounded-xl border bg-white px-4 py-3 text-dark placeholder:text-muted/60 transition-colors duration-200",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
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
        {hint && !error && (
          <p className="text-sm text-muted">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
