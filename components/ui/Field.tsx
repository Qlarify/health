"use client";

import { useId, type ComponentPropsWithoutRef } from "react";

type FieldKind = "text" | "email" | "tel" | "url" | "textarea" | "select";

type CommonProps = {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  className?: string;
};

type InputProps = CommonProps & {
  kind?: Exclude<FieldKind, "textarea" | "select">;
} & Omit<ComponentPropsWithoutRef<"input">, "type" | "className">;

type TextareaProps = CommonProps & {
  kind: "textarea";
} & Omit<ComponentPropsWithoutRef<"textarea">, "className">;

type SelectProps = CommonProps & {
  kind: "select";
  options: ReadonlyArray<string | { value: string; label: string }>;
} & Omit<ComponentPropsWithoutRef<"select">, "className">;

export type FieldProps = InputProps | TextareaProps | SelectProps;

const inputCls =
  "w-full px-4 py-3 text-[15px] border border-line rounded-xl bg-surface text-ink outline-none transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none focus:border-ink focus:shadow-[0_0_0_3px_var(--color-sage-soft)] aria-[invalid=true]:border-red-700";

const labelCls =
  "font-mono text-[10px] uppercase tracking-[0.12em] text-muted mb-2 block";

export function Field(props: FieldProps) {
  const id = useId();
  const errorId = `${id}-err`;
  const hintId = `${id}-hint`;
  const describedBy = [props.error ? errorId : null, props.hint ? hintId : null]
    .filter(Boolean)
    .join(" ") || undefined;

  if (props.kind === "textarea") {
    const { label, hint, error, required, className = "", ...rest } = props;
    return (
      <div className={className}>
        <label htmlFor={id} className={labelCls}>
          {label}
          {required && <span aria-hidden="true" className="text-sage ml-1">*</span>}
        </label>
        <textarea
          id={id}
          required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          rows={4}
          className={`${inputCls} resize-y min-h-[100px]`}
          {...rest}
        />
        {hint && <p id={hintId} className="text-[12px] text-muted mt-1.5">{hint}</p>}
        {error && <p id={errorId} className="text-[12px] text-red-700 mt-1.5">{error}</p>}
      </div>
    );
  }

  if (props.kind === "select") {
    const { label, hint, error, required, options, className = "", ...rest } = props;
    return (
      <div className={className}>
        <label htmlFor={id} className={labelCls}>
          {label}
          {required && <span aria-hidden="true" className="text-sage ml-1">*</span>}
        </label>
        <select
          id={id}
          required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`${inputCls} appearance-none pr-10 bg-[length:12px_12px] bg-no-repeat bg-[position:right_16px_center] bg-[url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><path d='M2 4l4 4 4-4' stroke='%2315201C' stroke-width='1.2' fill='none'/></svg>")]`}
          {...rest}
        >
          {options.map((opt) => {
            const value = typeof opt === "string" ? opt : opt.value;
            const text = typeof opt === "string" ? opt : opt.label;
            return (
              <option key={value} value={value}>
                {text}
              </option>
            );
          })}
        </select>
        {hint && <p id={hintId} className="text-[12px] text-muted mt-1.5">{hint}</p>}
        {error && <p id={errorId} className="text-[12px] text-red-700 mt-1.5">{error}</p>}
      </div>
    );
  }

  const { kind = "text", label, hint, error, required, className = "", ...rest } = props;
  return (
    <div className={className}>
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && <span aria-hidden="true" className="text-sage ml-1">*</span>}
      </label>
      <input
        id={id}
        type={kind}
        required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={inputCls}
        {...rest}
      />
      {hint && <p id={hintId} className="text-[12px] text-muted mt-1.5">{hint}</p>}
      {error && <p id={errorId} className="text-[12px] text-red-700 mt-1.5">{error}</p>}
    </div>
  );
}
