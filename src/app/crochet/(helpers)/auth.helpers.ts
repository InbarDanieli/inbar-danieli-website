import { FormEvent } from "react";
import { toast } from "react-toastify";

export const handleSubmitSignup = async (
  email: string,
  password: string,
  confirmPassword: string,
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, confirmPassword }),
  });
  const data = await response.json();
  console.log(data, data.status);
  if (data.status !== 200) {
    toast.error(data.message);
  } else {
    window.location.href = "/crochet/dashboard";
  }
};

export const handleSubmitLogin = async (
  email: string,
  password: string,
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  console.log(data, data.status);
  if (data.status !== 200) {
    toast.error(data.message);
  } else {
    window.location.href = "/crochet/dashboard";
  }
};

export const handleLogout = async (
  e: FormEvent<HTMLFormElement>
): Promise<void> => {
  e.preventDefault();

  console.log("handleLogout");
  const response = await fetch("/api/auth/logout", {
    method: "POST",
  });
  const data = await response.json();
  console.log(data);
  if (data.status === 200) {
    window.location.href = "/crochet/login";
  } else {
    toast.error(data.message);
  }
};
