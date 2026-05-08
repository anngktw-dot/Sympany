import Link from "next/link";
import { AuthForm } from "@/features/auth/ui/auth-form";
import { cn } from "@/shared/lib/cn";
import { AuthLogo } from "@/shared/ui/auth-logo/auth-logo";
import styles from "./auth-page.module.css";

type AuthMode = "login" | "register";

type AuthPageProps = {
  mode: AuthMode;
  title: string;
  primaryActionLabel: string;
  footerText: string;
  footerActionLabel: string;
  footerHref: string;
  helperText?: string;
  showDecor?: boolean;
};

export function AuthPage({
  mode,
  title,
  primaryActionLabel,
  footerText,
  footerActionLabel,
  footerHref,
  helperText,
  showDecor = false,
}: AuthPageProps) {
  const isRegister = mode === "register";

  return (
    <main className={cn(styles.shell, showDecor && styles.shellDecor)}>
      <div className={cn(styles.scene, styles.sceneLeft)} aria-hidden="true">
        <span className={cn(styles.sceneDot, styles.sceneDotTop)} />
        <span className={cn(styles.sceneDot, styles.sceneDotBottom)} />
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
        <div className={cn(styles.stack, isRegister && styles.stackRegister)}>
          <header className={styles.brand}>
            <AuthLogo register={isRegister} />
          </header>

          <section className={styles.card}>
            <div className={styles.panel}>
              <h1 className={cn(styles.title, isRegister && styles.titleRegister)}>{title}</h1>

              <AuthForm
                mode={mode}
                helperText={helperText}
                primaryActionLabel={primaryActionLabel}
              />

              <p className={styles.bottomCopy}>
                {footerText}
                <Link className={styles.textSwitch} href={footerHref}>
                  {footerActionLabel}
                </Link>
              </p>
            </div>
          </section>
        </div>
      </section>

      <div className={cn(styles.scene, styles.sceneRight)} aria-hidden="true">
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
