"use client";

import LoginForm from "@/components/LoginForm";
import styles from "./Login.module.scss";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginViews() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const callbackUrl: any = useSearchParams().get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        // router.push("/dashboard");
        setIsLoading(false);
        setTimeout(() => {
          e.target.reset();
          push(callbackUrl);
        });
      } else {
        console.log("error is false");
        setIsLoading(false);
        setError(result.status === 400 ? "Email is already exist" : "Error");
        alert("invalid Login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>login</h1>
      {error && <p className={styles.login__error}>{error}</p>}
      <div className={styles.login__form}>
        <LoginForm
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      </div>
      <p className={styles.login__link}>
        Don{"'"}t have an account? Sign Up{" "}
        <Link href="/auth/register">Here</Link>
      </p>
    </div>
  );
}
