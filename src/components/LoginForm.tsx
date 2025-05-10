"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "@/app/views/(auth)/login/Login.module.scss";

export default function LoginForm({ handleSubmit, isLoading }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.login__form__item}>
        <label htmlFor="email" className={styles.login__form__item__label}>
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          className={styles.login__form__item__input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.login__form__item}>
        <label htmlFor="password" className={styles.login__form__item__label}>
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          className={styles.login__form__item__input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className={styles.login__form__item__button}
        disabled={isLoading}
      >
        {isLoading ? "Loading ..." : "login"}
      </button>
    </form>
  );
}
