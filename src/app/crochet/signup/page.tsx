"use client";

import Title from "../(components)/title/title";
import { FormFieldValue } from "../(types)/form.types";
import SignForm from "../(components)/signForm/signForm";

export default function LoginPage() {
  const handleSubmit = async (data: Record<string, FormFieldValue>) => {
    try {
      //   await LoginToDB(email, password);
    } catch (error) {
      console.error("Error logging in:", error);
    }
    console.log(data);
  };

  return (
    <div className="wrapper">
      <Title
        style={{ textAlign: "center" }}
        content="Create Your Account"
        subtitle="Create your account to get started"
      />
      <SignForm type="signup" />
    </div>
  );
}
