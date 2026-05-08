"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CircleAlert, Eye, EyeOff, KeyRound } from "lucide-react";
import { AuthLogo } from "@/shared/ui/auth-logo/auth-logo";
import styles from "./reset-password-page.module.css";

type FormErrors = {
  password?: string;
  confirmPassword?: string;
};

export function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState("");

  function validate() {
    const nextErrors: FormErrors = {};

    if (!password) {
      nextErrors.password = "Enter a new password.";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Confirm your new password.";
    } else if (password && confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (validate()) {
      setStatus("Password changed. You can log in with the new password.");
    } else {
      setStatus("");
    }
  }

  return (
    <main className={styles.page}>
      <BackgroundDecorations />

      <section className={styles.stage}>
        <div className={styles.stack}>
          <header className={styles.logo}>
            <AuthLogo register />
          </header>

          <section className={styles.card}>
            <div className={styles.badge} aria-hidden="true">
              <KeyRound className={styles.keyIcon} strokeWidth={1.65} />
            </div>

            <h1 className={styles.title}>Change your password</h1>

            <p className={styles.description}>
              Your new password must be different to previously used
              <br />
              password
            </p>

            <form className={styles.form} noValidate onSubmit={handleSubmit}>
              <PasswordField
                error={errors.password}
                isVisible={showPassword}
                name="password"
                placeholder="New password*"
                value={password}
                onChange={(value) => {
                  setPassword(value);
                  setStatus("");
                  if (errors.password) {
                    setErrors((currentErrors) => ({ ...currentErrors, password: undefined }));
                  }
                }}
                onToggle={() => setShowPassword((value) => !value)}
              />

              <PasswordField
                error={errors.confirmPassword}
                isVisible={showConfirmPassword}
                name="confirm-password"
                placeholder="Confirm new password*"
                value={confirmPassword}
                onChange={(value) => {
                  setConfirmPassword(value);
                  setStatus("");
                  if (errors.confirmPassword) {
                    setErrors((currentErrors) => ({
                      ...currentErrors,
                      confirmPassword: undefined,
                    }));
                  }
                }}
                onToggle={() => setShowConfirmPassword((value) => !value)}
              />

              <button className={styles.button} type="submit">
                Change password
              </button>
            </form>

            <p className={styles.statusText} aria-live="polite">
              {status || "Use a strong password that you have not used before."}
            </p>

            <Link className={styles.backLink} href="/">
              <ArrowLeft className={styles.backIcon} strokeWidth={1.8} />
              <span>Back to log in</span>
            </Link>
          </section>
        </div>
      </section>
    </main>
  );
}

type PasswordFieldProps = {
  error?: string;
  isVisible: boolean;
  name: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onToggle: () => void;
};

function PasswordField({
  error,
  isVisible,
  name,
  placeholder,
  value,
  onChange,
  onToggle,
}: PasswordFieldProps) {
  const Icon = isVisible ? EyeOff : Eye;

  return (
    <div className={styles.fieldWrap}>
      <label className={`${styles.field} ${error ? styles.fieldError : ""}`}>
        <input
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={styles.input}
          name={name}
          placeholder={placeholder}
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        {error ? (
          <span className={styles.fieldErrorIcon} aria-hidden="true">
            <CircleAlert className={styles.eyeIcon} strokeWidth={1.9} />
          </span>
        ) : null}
        <button
          aria-label={isVisible ? "Hide password" : "Show password"}
          className={styles.fieldButton}
          type="button"
          onClick={onToggle}
        >
          <Icon className={styles.eyeIcon} strokeWidth={1.9} />
        </button>
      </label>
      {error ? (
        <p id={`${name}-error`} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function BackgroundDecorations() {
  return <div className={styles.backdrop} aria-hidden="true" />;
}
