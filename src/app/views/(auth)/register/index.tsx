"use client";

import styles from "./Register.module.scss";
import { useState } from "react";
import RegisterForm from "@/components/RegisterForm";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function RegisterViews() {
  const [error, setError] = useState("");
  const callbackUrl: any = useSearchParams().get("callbackUrl") || "/dashboard";
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
      name: e.target.username.value,
    };
    try {
      const resp = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await resp.json();
      console.log(result.status);

      if (resp.ok && result.status === 200) {
        setSuccess(result.message);
        setIsLoading(true);
        setTimeout(() => {
          e.target.reset();
          push(callbackUrl);
        }, 2000);
      } else {
        console.log("error is false");
        setIsLoading(false);
        setError(result.status === 400 ? "Email is already exist" : "Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>login</h1>
      {error && <p className={styles.login__error}>{error}</p>}
      <div className={styles.login__form}>
        <RegisterForm
          error={error}
          setError={setError}
          callbackUrl={callbackUrl}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
        />
        <p className={styles.login__link}>
          Have a account sign in <Link href="/auth/signin">Here</Link>
        </p>
      </div>
    </div>
  );
}
