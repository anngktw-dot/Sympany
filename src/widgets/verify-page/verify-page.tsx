"use client";

import { ChangeEvent, ClipboardEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { AuthLogo } from "@/shared/ui/auth-logo/auth-logo";
import styles from "./verify-page.module.css";

const CODE_LENGTH = 6;
const DEMO_CODE = "123456";

export function VerifyPage() {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  function focusInput(index: number) {
    inputsRef.current[index]?.focus();
    inputsRef.current[index]?.select();
  }

  function handleDigitChange(index: number, event: ChangeEvent<HTMLInputElement>) {
    const digit = event.target.value.replace(/\D/g, "").slice(-1);
    const nextCode = [...code];
    nextCode[index] = digit;
    setCode(nextCode);
    setError("");
    setStatus("");

    if (digit && index < CODE_LENGTH - 1) {
      focusInput(index + 1);
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      focusInput(index - 1);
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();

    const pastedCode = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH)
      .split("");

    if (!pastedCode.length) {
      return;
    }

    const nextCode = Array(CODE_LENGTH).fill("");
    pastedCode.forEach((digit, index) => {
      nextCode[index] = digit;
    });
    setCode(nextCode);
    setError("");
    setStatus("");
    focusInput(Math.min(pastedCode.length, CODE_LENGTH - 1));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredCode = code.join("");

    if (enteredCode.length < CODE_LENGTH) {
      setError("Enter the 6-digit code.");
      setStatus("");
      return;
    }

    if (enteredCode !== DEMO_CODE) {
      setError("Invalid code.");
      setStatus("");
      return;
    }

    setError("");
    setStatus("Email verified. You can continue.");
  }

  function handleResend() {
    setCode(Array(CODE_LENGTH).fill(""));
    setError("");
    setStatus("New code sent to user@example.com.");
    focusInput(0);
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
              <div className={styles.mailBadge}>
                <Mail size={34} strokeWidth={1.75} />
              </div>

              <h1 className={styles.title}>Verify your email address</h1>

              <p className={styles.description}>
                We have sent a verification code to <strong>user@example.com</strong>. If you
                don&apos;t see it, you may need to check your spam folder.
              </p>

              <form className={styles.form} noValidate onSubmit={handleSubmit}>
                <div className={styles.codeRow}>
                  {code.map((value, index) => (
                    <input
                      key={index}
                      ref={(node) => {
                        inputsRef.current[index] = node;
                      }}
                      aria-label={`Verification code digit ${index + 1}`}
                      aria-invalid={Boolean(error)}
                      className={`${styles.codeInput} ${error ? styles.codeInputError : ""}`}
                      inputMode="numeric"
                      maxLength={1}
                      pattern="[0-9]*"
                      value={value}
                      onChange={(event) => handleDigitChange(index, event)}
                      onKeyDown={(event) => handleKeyDown(index, event)}
                      onPaste={handlePaste}
                    />
                  ))}
                </div>

                <p className={error ? styles.errorText : styles.statusText} aria-live="polite">
                  {error || status || "Use code 123456 for local verification."}
                </p>

                <button className={styles.button} type="submit">
                  Continue
                </button>
              </form>

              <p className={styles.bottomCopy}>
                Didn&apos;t get the code?
                <button className={styles.linkButton} type="button" onClick={handleResend}>
                  Resend
                </button>
              </p>
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
