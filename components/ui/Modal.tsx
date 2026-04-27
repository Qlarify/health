"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function Modal({
  open,
  onClose,
  labelledBy,
  describedBy,
  children,
  maxWidth = 640,
}: {
  open: boolean;
  onClose: () => void;
  /** Pass the id of the element that titles the modal. */
  labelledBy?: string;
  describedBy?: string;
  children: ReactNode;
  maxWidth?: number;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<Element | null>(null);
  const labelId = useId();

  useEffect(() => {
    if (!open) return;

    triggerRef.current = document.activeElement;

    // Lock body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog
    const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusables?.[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const list = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []
      ).filter((el) => !el.hasAttribute("disabled"));
      if (list.length === 0) {
        e.preventDefault();
        return;
      }
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !dialogRef.current?.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      // Restore focus to the trigger
      (triggerRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  // Render via portal to escape stacking contexts
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-ink/40 backdrop-blur-md animate-fade-in"
      style={{ animation: "fade-in 240ms ease" }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy ?? labelId}
        aria-describedby={describedBy}
        onClick={(e) => e.stopPropagation()}
        className="bg-paper rounded-3xl w-full p-8 sm:p-12 relative"
        style={{ maxWidth, animation: "slide-up 320ms cubic-bezier(0.2,0.8,0.2,1)" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 w-9 h-9 rounded-full border border-line bg-transparent cursor-pointer text-base flex items-center justify-center hover:bg-line/40"
        >
          <span aria-hidden="true">×</span>
        </button>
        {!labelledBy && (
          <span id={labelId} className="sr-only">
            Dialog
          </span>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
