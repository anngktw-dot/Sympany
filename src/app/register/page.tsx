import { AuthPage } from "@/widgets/auth-page/auth-page";

export default function RegisterPage() {
  return (
    <AuthPage
      mode="register"
      title="Register a new account"
      primaryActionLabel="Register"
      footerText="Already have an account?"
      footerActionLabel="Sign in"
      footerHref="/"
      showDecor
    />
  );
}
