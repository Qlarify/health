import type { ReactNode } from "react";

export function Eyebrow({
  children,
  dot = false,
  className = "",
}: {
  children: ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <p
      className={[
        "font-mono text-[11px] uppercase tracking-[0.14em] text-muted",
        className,
      ].join(" ")}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="inline-block w-2 h-2 rounded-full bg-sage mr-2.5 align-middle"
        />
      )}
      {children}
    </p>
  );
}
