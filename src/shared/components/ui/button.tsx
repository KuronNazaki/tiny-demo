import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@pars/shared/lib/utils";
import { buttonVariants } from "./button-variants";

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  withHaptic = true,
  onClick,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    withHaptic?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  const haptic = () => {
    if (navigator.vibrate) {
      navigator.vibrate([2000, 1000, 2000, 1000, 2000, 1000, 2000]);
    } else {
      const element = document.createElement("div");
      const id = Math.random().toString(36).slice(2);
      element.innerHTML =
        `<input type="checkbox" id="` +
        id +
        `" switch /><label for="` +
        id +
        `"></label>`;
      element.setAttribute(
        "style",
        "display:none !important;opacity:0 !important;visibility:hidden !important;"
      );
      document.querySelector("body")?.appendChild(element);
      element.querySelector("label")?.click();
      setTimeout(function () {
        element.remove();
      }, 1500);
    }
  };
  const _onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (withHaptic) {
      haptic();
    }
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={_onClick}
      {...props}
    />
  );
}

export { Button };
