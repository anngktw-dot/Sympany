import { AuthPage } from "@/widgets/auth-page/auth-page";

export default function LoginPage() {
  return (
    <AuthPage
      mode="login"
      title="Login to account"
      helperText="Forgot your password?"
      primaryActionLabel="Log In"
      footerText="Don't have an account?"
      footerActionLabel="Create an account"
      footerHref="/register"
    />
  );
}
