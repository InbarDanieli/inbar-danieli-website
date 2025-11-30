"use client";

import { useState } from "react";
import Field from "../field/field";
import globalStyles from "../../(styles)/globals.module.scss";
import styles from "./signForm.module.scss";
import Button from "../button/button";
import InputField from "../inputField/inputField";

export default function SignForm({ type }: { type: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    // e.preventDefault();

    try {
      //   await LoginToDB(data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
    // console.log(data);
  };

  return (
    <div className={`${globalStyles["form-content"]} ${styles["sign-form"]}`}>
      <form onSubmit={handleSubmit} noValidate>
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
    </div>
  );
}
