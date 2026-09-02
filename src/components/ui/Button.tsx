"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
};

export function Button({
  children,
  variant = "primary",
  className,
  ...rest
}: Props) {
  return (
    <button
      className={clsx(
        "group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-[11px] uppercase tracking-widest2 transition-all duration-500 ease-luxury disabled:opacity-40 disabled:cursor-not-allowed",
        variant === "primary" &&
          "bg-ink text-paper hover:bg-gold hover:text-ink",
        variant === "light" &&
          "bg-paper text-ink border border-ink hover:bg-ink hover:text-paper",
        variant === "ghost" &&
          "text-ink border-b border-ink pb-1 px-0 hover:border-gold hover:text-gold",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
