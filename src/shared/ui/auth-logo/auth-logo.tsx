import Image from "next/image";
import { cn } from "@/shared/lib/cn";
import styles from "./auth-logo.module.css";

type AuthLogoProps = {
  register?: boolean;
};

export function AuthLogo({ register = false }: AuthLogoProps) {
  return (
    <Image
      className={cn(styles.brandImage, register && styles.register)}
      src="/logo.png"
      alt="Sympany"
      width={438}
      height={86}
      priority
    />
  );
}
