"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, KeyRound } from "lucide-react";
import { AuthLogo } from "@/shared/ui/auth-logo/auth-logo";
import styles from "./forgot-password-page.module.css";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSent, setIsSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!isValidEmail) {
      setError("Enter a valid email address.");
      setIsSent(false);
      return;
    }

    setError("");
    setIsSent(true);
  }

  return (
    <main className={styles.shell}>
      <div className={`${styles.scene} ${styles.sceneLeft}`} aria-hidden="true">
        <span className={`${styles.sceneDot} ${styles.sceneDotTop}`} />
        <span className={`${styles.sceneDot} ${styles.sceneDotBottom}`} />
        <svg className={styles.waveArt} viewBox="0 0 680 920" fill="none">
          <path d="M640 -24C420 60 449 212 334 297C232 372 143 319 80 460C34 561 83 707 188 760C312 823 449 737 534 652C632 553 709 420 651 282C613 194 554 132 581 28" />
          <path d="M602 7C399 83 427 220 324 300C232 371 155 327 95 453C50 548 91 688 188 742C300 804 430 724 511 645C602 555 676 436 627 306C593 216 540 161 567 63" />
          <path d="M566 42C384 104 412 228 321 306C235 379 168 337 112 445C71 525 99 667 190 723C290 783 413 713 489 637C574 552 643 449 602 329C573 240 530 187 554 95" />
          <path d="M532 74C373 124 401 238 320 314C240 389 183 348 130 438C92 502 111 647 194 705C283 763 399 702 470 629C549 547 613 463 579 351C555 264 520 214 542 129" />
          <path d="M498 108C365 146 393 249 320 324C247 399 198 362 151 431C117 481 128 626 201 689C280 757 387 692 454 621C526 545 584 477 557 374C537 290 513 241 531 162" />
          <path d="M465 141C359 170 386 260 323 336C257 414 214 376 174 424C145 459 148 605 213 676C281 751 378 683 439 612C504 537 556 489 535 394C520 313 509 266 522 195" />
        </svg>
      </div>

      <section className={styles.stage}>
        <div className={styles.stack}>
          <header className={styles.brand}>
            <AuthLogo register />
          </header>

          <section className={styles.card}>
            <div className={styles.panel}>
              <div className={styles.keyBadge}>
                <KeyRound size={32} strokeWidth={1.9} />
              </div>

              <h1 className={styles.title}>Forgot password?</h1>

              <p className={styles.description}>
                Enter the email used for your account and we&apos;ll send you a link to reset your
                password
              </p>

              <form className={styles.form} noValidate onSubmit={handleSubmit}>
                <label className={styles.field}>
                  <input
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "forgot-password-error" : undefined}
                    autoComplete="email"
                    className={`${styles.input} ${error ? styles.inputError : ""}`}
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (error) {
                        setError("");
                      }
                      if (isSent) {
                        setIsSent(false);
                      }
                    }}
                  />
                </label>

                {error ? (
                  <p id="forgot-password-error" className={styles.errorText}>
                    {error}
                  </p>
                ) : null}

                <button className={styles.button} type="submit">
                  Reset password
                </button>
              </form>

              <p className={styles.statusText} aria-live="polite">
                {isSent
                  ? `Reset link sent to ${email.trim()}. Check your inbox.`
                  : "We will send a secure reset link if the email exists in Sympany."}
              </p>

              <Link className={styles.backLink} href="/">
                <ArrowLeft size={21} strokeWidth={1.8} />
                <span>Back to log in</span>
              </Link>
            </div>
          </section>
        </div>
      </section>

      <div className={`${styles.scene} ${styles.sceneRight}`} aria-hidden="true">
        <span className={styles.orbit} />
        <svg className={styles.cornerRings} viewBox="0 0 560 340" fill="none">
          <path d="M14 320C62 271 128 243 198 242C269 241 333 272 379 320" />
          <path d="M71 320C106 284 154 264 206 263C258 262 305 281 341 320" />
          <path d="M118 320C145 294 181 280 219 279C257 278 292 291 320 320" />
        </svg>
      </div>
    </main>
  );
}
