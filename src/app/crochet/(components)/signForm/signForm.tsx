"use client";

import { FormEvent, useState } from "react";
import globalStyles from "../../(styles)/globals.module.scss";
import Button from "../button/button";
import Field from "../field/field";
import styles from "./signForm.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignForm({ type }: { type: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      "/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    console.log(data, data.status);
    if (data.status !== 200) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
    }
  };

  const handleSubmitSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      "/api/auth/signup",
      {
        method: "POST",
        body: JSON.stringify({ email, password, confirmPassword }),
      }
    );
    const data = await response.json();
    console.log(data, data.status);
    if (data.status !== 200) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
    }
  };

  return (
    <div className={`${globalStyles["form-content"]} ${styles["sign-form"]}`}>
      <ToastContainer position="top-center" autoClose={2000}/>
      <form onSubmit={type === "login" ? handleSubmitLogin : handleSubmitSignup} noValidate>
        <div className={globalStyles["fields-grid"]}>
          <div
            className={`${globalStyles["field-wrapper"]} ${globalStyles.full}`}
          >
            <Field
              label="Email Address"
              name="email"
              type="text"
              placeholder="example@example.com"
              value={email}
              onChange={(value) => setEmail(value as string)}
            />
          </div>
          <div
            className={`${globalStyles["field-wrapper"]} ${globalStyles.full}`}
          >
            <Field
              label="Password"
              name="password"
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(value) => setPassword(value as string)}
            />
          </div>
          {type === "signup" && (
            <div
              className={`${globalStyles["field-wrapper"]} ${globalStyles.full}`}
            >
              <Field
                label="Confirm Password"
                name="confirm-password"
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(value) => setConfirmPassword(value as string)}
              />
            </div>
          )}
          <div
            className={`${globalStyles["field-wrapper"]} ${globalStyles.full}`}
          >
            <Button type="submit" variant="primary-full">
              {type === "login" ? "Login" : "Sign Up"}
            </Button>
          </div>
        </div>
      </form>
      {type === "login" && (
        <p className={styles["sign-up-message"]}>
          Don&apos;t have an account yet? <a href="/crochet/signup">Sign up</a>
        </p>
      )}
    </div>
  );
}
