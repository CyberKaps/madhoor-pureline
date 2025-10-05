
import { api } from "./axios";

export async function signUp(name: string, email: string, password: string) {
  return api.post("auth/signup", {
    name,
    email,
    password,
  });
}

export async function logIn(email: string, password: string) {
  const res = await api.post("auth/login", {
    email,
    password,
  });

  const { token, userId } = res.data;
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);

  return { token, userId };
}