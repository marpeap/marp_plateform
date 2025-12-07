"use client";

import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "destructive"
  | "soft";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/60",
  secondary:
    "bg-secondary text-secondary-foreground shadow hover:bg-secondary/80 focus-visible:ring-2 focus-visible:ring-secondary/60",
  ghost: "hover:bg-muted text-foreground",
  outline:
    "border border-border bg-background hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/60",
  destructive:
    "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90 focus-visible:ring-2 focus-visible:ring-destructive/60",
  soft:
    "bg-accent/10 text-foreground border border-accent/20 hover:bg-accent/20 focus-visible:ring-2 focus-visible:ring-accent/60",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed",
          variantClass[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

