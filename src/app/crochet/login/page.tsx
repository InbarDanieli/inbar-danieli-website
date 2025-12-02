"use client";

import SignForm from "../(components)/signForm/signForm";
import Title from "../(components)/title/title";


export default function LoginPage() {

  return (
    <div className="wrapper">
      <Title
        style={{ textAlign: "center" }}
        content="Login"
        subtitle="Login to your account"
      />
      <SignForm type="login" />
    </div>
  );
}
