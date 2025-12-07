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

type ButtonSize = "sm" | "md" | "lg" | "icon";

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

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10 p-0",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed",
          variantClass[variant],
          sizeClass[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

