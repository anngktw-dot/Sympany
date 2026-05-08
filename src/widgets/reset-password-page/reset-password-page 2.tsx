import Link from "next/link";
import { AuthLogo } from "@/shared/ui/auth-logo/auth-logo";
import styles from "./reset-password-page.module.css";

export function ResetPasswordPage() {
  return (
    <main className={styles.page}>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={`${styles.dot} ${styles.dotLeft}`} />
        <span className={`${styles.dot} ${styles.dotRight}`} />
        <span className={`${styles.dot} ${styles.dotBottom}`} />

        <svg className={styles.leftLines} viewBox="0 0 560 840" fill="none">
          <path d="M520 8C378 45 320 126 320 244C320 332 374 370 374 463C374 543 327 614 238 646C160 674 69 659 10 613" />
          <path d="M500 34C364 70 308 145 308 252C308 338 362 377 362 463C362 536 320 599 241 629C170 656 89 643 32 603" />
          <path d="M478 60C351 95 296 163 296 260C296 345 351 383 351 463C351 528 312 585 244 612C181 638 108 628 52 592" />
          <path d="M456 88C339 120 285 182 285 270C285 351 340 390 340 464C340 521 306 571 248 596C193 621 126 613 72 580" />
          <path d="M432 117C329 146 277 200 277 279C277 356 330 396 330 464C330 515 300 558 252 581C206 602 144 598 92 568" />
          <path d="M410 145C321 171 270 219 270 287C270 361 321 402 321 464C321 509 295 546 258 567C221 584 161 582 112 555" />
        </svg>

        <svg className={styles.topRings} viewBox="0 0 560 250" fill="none">
          <path d="M30 226C78 164 150 124 230 118C311 111 390 137 450 188" />
          <path d="M84 223C124 177 179 148 239 143C300 138 359 156 406 193" />
          <path d="M132 220C164 186 206 165 252 161C299 157 344 171 381 198" />
          <path d="M174 217C199 192 231 177 267 174C302 171 337 180 365 202" />
        </svg>

        <span className={styles.orbit} />

        <svg className={styles.bottomRings} viewBox="0 0 420 220" fill="none">
          <path d="M24 208C68 157 129 129 196 126C264 123 327 149 373 198" />
          <path d="M76 208C108 173 153 154 202 152C252 150 298 168 332 198" />
          <path d="M118 208C143 183 177 170 214 169C252 168 287 179 313 198" />
        </svg>
      </div>

      <section className={styles.stage}>
        <div className={styles.stack}>
          <div className={styles.brand}>
            <AuthLogo register />
          </div>

          <section className={styles.card}>
            <div className={styles.badge} aria-hidden="true">
              <KeyIcon className={styles.keyIcon} />
            </div>

            <h1 className={styles.title}>Change your password</h1>

            <p className={styles.description}>
              Your new password must be different to previously used
              <br />
              password
            </p>

            <form className={styles.form}>
              <label className={styles.field}>
                <input className={styles.input} type="password" placeholder="New password*" />
                <span className={styles.fieldIcon} aria-hidden="true">
                  <EyeIcon className={styles.eyeIcon} />
                </span>
              </label>

              <label className={styles.field}>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Confirm new password*"
                />
                <span className={styles.fieldIcon} aria-hidden="true">
                  <EyeIcon className={styles.eyeIcon} />
                </span>
              </label>

              <button className={styles.button} type="submit">
                Reset password
              </button>
            </form>

            <Link className={styles.backLink} href="/">
              <ArrowIcon className={styles.backIcon} />
              <span>Back to log in</span>
            </Link>
          </section>
        </div>
      </section>
    </main>
  );
}

type IconProps = {
  className?: string;
};

function KeyIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      >
        <path d="M12.9 18.7a6 6 0 1 1 4.32-1.75l-2.48 2.48v2.15h-2.18v2.13h-2.1v2.12H8.3v-4.13l4.6-4.57Z" />
        <circle cx="19.9" cy="11.75" r="0.95" />
      </g>
    </svg>
  );
}

function EyeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.55"
      >
        <path d="M2.4 10c1.83-2.6 4.37-3.9 7.6-3.9 3.22 0 5.76 1.3 7.6 3.9-1.84 2.6-4.38 3.9-7.6 3.9-3.23 0-5.77-1.3-7.6-3.9Z" />
        <circle cx="10" cy="10" r="2.18" />
      </g>
    </svg>
  );
}

function ArrowIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.55"
      >
        <path d="M15 10H5.9" />
        <path d="m8.7 7-3 3 3 3" />
      </g>
    </svg>
  );
}
