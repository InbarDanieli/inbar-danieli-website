"use client";

import SignForm from "../(components)/signForm/signForm";
import Title from "../(components)/title/title";

export default function LoginPage() {
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
