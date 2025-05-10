import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import styles from "./Signin.module.scss";
import LoginForm from "@/components/LoginForm";

export default function SignInViews() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const callbackUrl: any = useSearchParams().get("callbackUrl") || "/";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("email or password invalid");
        alert(res?.error || "Login failed");
      }
    } catch (error: any) {
      setIsLoading(false);
      setError("Email or password invalid");
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>login</h1>
      {error && <p className={styles.login__error}>{error}</p>}
      <div className={styles.login__form}>
        <LoginForm handleSubmit={handleSubmit} isLoading={isLoading} />
        <button
          className={styles.login__form__item__google}
          onClick={() =>
            signIn("google", {
              callbackUrl,
              redirect: false,
            })
          }
        >
          Sign In with Google
        </button>
      </div>
      <p className={styles.login__link}>
        Don{"'"}t have an account? Sign Up{" "}
        <Link href="/auth/register">Here</Link>
      </p>
    </div>
  );
}
