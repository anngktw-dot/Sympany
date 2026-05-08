"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { TextField } from "@/shared/ui/text-field/text-field";
import {
  type LoginFormValues,
  type RegisterFormValues,
  loginSchema,
  registerSchema,
} from "@/features/auth/model/auth.schemas";
import { cn } from "@/shared/lib/cn";
import styles from "./auth-form.module.css";

type LoginFormProps = {
  mode: "login";
  helperText?: string;
  primaryActionLabel: string;
};

type RegisterFormProps = {
  mode: "register";
  primaryActionLabel: string;
};

type AuthFormProps = LoginFormProps | RegisterFormProps;

export function AuthForm(props: AuthFormProps) {
  const isRegister = props.mode === "register";

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  if (!isRegister) {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = loginForm;

    return (
      <form className={styles.form} onSubmit={handleSubmit(() => undefined)}>
        <div>
          <TextField
            {...register("email")}
            type="email"
            placeholder="Email"
            icon={errors.email ? <CircleAlert size={18} /> : null}
            error={Boolean(errors.email)}
            className={styles.compact}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <p className={styles.errorText}>{errors.email.message}</p> : null}
        </div>

        <div>
          <TextField
            {...register("password")}
            type="password"
            placeholder="Password"
            icon={errors.password ? <CircleAlert size={18} /> : null}
            error={Boolean(errors.password)}
            className={styles.compact}
            aria-invalid={Boolean(errors.password)}
          />
          {errors.password ? <p className={styles.errorText}>{errors.password.message}</p> : null}
        </div>

        <Link className={styles.helperLink} href="/forgot-password">
          {props.helperText}
        </Link>

        <button className={styles.primaryButton} type="submit">
          {props.primaryActionLabel}
        </button>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <button className={styles.secondaryButton} type="button">
          <span className={styles.spotifyIcon}>
            <SpotifyIcon />
          </span>
          <span>Spotify</span>
        </button>
      </form>
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = registerForm;

  return (
    <form className={cn(styles.form, styles.register)} onSubmit={handleSubmit(() => undefined)}>
      <div>
        <TextField
          {...register("email")}
          type="email"
          placeholder="Email"
          icon={errors.email ? <CircleAlert size={18} /> : null}
          error={Boolean(errors.email)}
          className={styles.compact}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email ? <p className={styles.errorText}>{errors.email.message}</p> : null}
      </div>

      <div>
        <TextField
          {...register("password")}
          type="password"
          placeholder="Password"
          icon={errors.password ? <CircleAlert size={18} /> : null}
          error={Boolean(errors.password)}
          className={styles.compactRegister}
          aria-invalid={Boolean(errors.password)}
        />
        {errors.password ? <p className={styles.errorText}>{errors.password.message}</p> : null}
      </div>

      <div>
        <TextField
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm password"
          icon={errors.confirmPassword ? <CircleAlert size={18} /> : null}
          error={Boolean(errors.confirmPassword)}
          className={styles.compactRegister}
          aria-invalid={Boolean(errors.confirmPassword)}
        />
        {errors.confirmPassword ? (
          <p className={styles.errorText}>{errors.confirmPassword.message}</p>
        ) : null}
      </div>

      <button className={styles.primaryButton} type="submit">
        {props.primaryActionLabel}
      </button>

      <div className={styles.divider}>
        <span>or</span>
      </div>

      <button className={styles.secondaryButton} type="button">
        <span className={styles.spotifyIcon}>
          <SpotifyIcon />
        </span>
        <span>Spotify</span>
      </button>
    </form>
  );
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path
        d="M17.638 14.947a.75.75 0 0 1-1.033.248c-2.828-1.728-6.39-2.12-10.587-1.167a.75.75 0 0 1-.332-1.463c4.584-1.041 8.503-.594 11.701 1.359a.75.75 0 0 1 .251 1.023Z"
        fill="#151515"
      />
      <path
        d="M18.74 11.855a.95.95 0 0 1-1.304.314c-3.238-1.982-8.17-2.555-11.996-1.394a.95.95 0 0 1-.552-1.818c4.33-1.314 9.708-.682 13.54 1.663a.95.95 0 0 1 .312 1.235Z"
        fill="#151515"
      />
      <path
        d="M18.91 8.624c-3.881-2.305-10.293-2.518-13.998-1.403a1.15 1.15 0 1 1-.662-2.203c4.254-1.28 11.32-1.032 15.84 1.652a1.15 1.15 0 0 1-1.18 1.954Z"
        fill="#151515"
      />
    </svg>
  );
}
