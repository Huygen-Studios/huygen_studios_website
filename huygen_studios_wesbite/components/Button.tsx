import type { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function TextRoll({ children, className }: { children: string; className?: string }) {
  return (
    <span className={clsx("text-roll", className)} data-text={children}>
      <span>{children}</span>
    </span>
  );
}

export function Button({
  children,
  className,
  type = "button",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      className={clsx(
        "roll-control relative inline-flex items-center justify-center overflow-hidden",
        "bg-black px-6 py-3 font-medium text-white",
        "transition-colors duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      {typeof children === "string" ? <TextRoll>{children}</TextRoll> : children}
    </button>
  );
}
