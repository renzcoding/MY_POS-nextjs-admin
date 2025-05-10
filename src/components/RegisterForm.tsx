"use client";

import styles from "@/app/views/(auth)/register/Register.module.scss";
import { useState } from "react";

export default function RegisterForm({ handleSubmit, isLoading }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.login__form__item}>
        <label htmlFor="username" className={styles.login__form__item__label}>
          Username
        </label>
        <input
          type="text"
          placeholder="username"
          name="username"
          className={styles.login__form__item__input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
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
