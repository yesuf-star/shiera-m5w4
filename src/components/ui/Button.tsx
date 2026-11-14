import type {
  ButtonHTMLAttributes,
} from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={[
        "rounded-lg px-4 py-2 font-medium transition",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-violet-400",
        "focus-visible:ring-offset-2",
        "focus-visible:ring-offset-zinc-950",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}