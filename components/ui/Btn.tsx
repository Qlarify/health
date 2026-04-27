import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "tertiary" | "dark";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition-all duration-200 ease-quart motion-reduce:transition-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-black hover:-translate-y-px motion-reduce:hover:translate-y-0",
  secondary:
    "border border-ink text-ink hover:bg-ink hover:text-paper",
  tertiary:
    "border border-line bg-surface text-ink hover:border-ink",
  dark:
    "bg-sage text-paper hover:bg-[#4d6b5e]",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5 text-sm",
  sm: "px-3.5 py-2 text-[13px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps & ComponentPropsWithoutRef<"button"> & { href?: never };
type LinkProps = CommonProps & { href: string } & Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "href" | "className" | "children"
>;

export function Btn(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", withArrow, className = "", children } = props;
  const cls = [base, variants[variant], sizes[size], className].filter(Boolean).join(" ");

  const inner = (
    <>
      {children}
      {withArrow && (
        <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0">
          →
        </span>
      )}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, withArrow: _wa, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as LinkProps;
    return (
      <Link href={href} className={cls + " group"} {...rest}>
        {inner}
      </Link>
    );
  }

  const { withArrow: _wa, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as ButtonProps;
  return (
    <button className={cls + " group"} {...rest}>
      {inner}
    </button>
  );
}
