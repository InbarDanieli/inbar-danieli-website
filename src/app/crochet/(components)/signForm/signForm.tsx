"use client";

import { FormEvent, useState } from "react";
import globalStyles from "../../(styles)/globals.module.scss";
import Button from "../button/button";
import Field from "../field/field";
import styles from "./signForm.module.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  handleSubmitLogin,
  handleSubmitSignup,
} from "../../(helpers)/auth.helpers";

export default function SignForm({ type }: { type: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    if (type === "login") {
      await handleSubmitLogin(email, password, e);
    } else {
      await handleSubmitSignup(email, password, confirmPassword, firstName, lastName, e);
    }
    setLoading(false);
  };

  function submitButtonText() {
    if (loading && type === "login") {
      return "Logging in...";
    }
    if (loading && type === "signup") {
      return "Signing up...";
    }
    if (type === "login") {
      return "Login";
    }
    return "Sign Up";
  }

  return (
    <div className={`${globalStyles["form-content"]} ${styles["sign-form"]}`}>
      <ToastContainer position="top-center" autoClose={2000} />
      <form onSubmit={onSubmit} noValidate>
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
          {type === "signup" && (
            <>
              <div
                className={`${globalStyles["field-wrapper"]} ${globalStyles.half}`}
              >
                <Field
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(value) => setFirstName(value as string)}
                />
              </div>
              <div
                className={`${globalStyles["field-wrapper"]} ${globalStyles.half}`}
              >
                <Field
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(value) => setLastName(value as string)}
                />
              </div>
            </>
          )}
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
              {submitButtonText()}
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
