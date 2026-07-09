import type { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function TextRoll({ children, className }: { children: ReactNode; className?: string }) {
  // Normalize children to a primitive string to prevent React 19 from stripping the data-text attribute
  const text = typeof children === "string"
    ? children
    : (Array.isArray(children) ? children.join("") : String(children || ""));

  return (
    <span className={`text-roll ${className || ""}`.trim()} data-text={text}>
      <span>{text}</span>
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
  const isStringLike = typeof children === "string" ||
    (Array.isArray(children) && children.every(c => typeof c === "string"));

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
      {isStringLike ? <TextRoll>{children}</TextRoll> : children}
    </button>
  );
}
