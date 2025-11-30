"use client";

import { useState } from "react";
import Form from "../(components)/form/form";
import Title from "../(components)/title/title";
import { FormFieldValue } from "../(types)/form.types";
import SignForm from "../(components)/signForm/signForm";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        content="Login"
        subtitle="Login to your account"
      />
      <SignForm type="login" />
    </div>
  );
}
