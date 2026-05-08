"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./text-field.module.css";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  icon?: ReactNode;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { className, error = false, icon, ...props },
  ref
) {
  return (
    <label
      className={cn(
        styles.field,
        icon ? styles.withIcon : "",
        error ? styles.error : "",
        className
      )}
    >
      <input ref={ref} className={styles.input} {...props} />
      {icon ? <span className={styles.icon}>{icon}</span> : null}
    </label>
  );
});
