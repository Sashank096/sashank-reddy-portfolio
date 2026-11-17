import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  external?: boolean;
  variant?: "primary" | "ghost";
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export default function Button({
  children,
  href,
  external,
  variant = "primary",
  className,
  ...rest
}: Props) {
  const cls = cn("btn", variant === "ghost" && "btn-ghost", className);
  if (href && external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link className={cls} href={href}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
