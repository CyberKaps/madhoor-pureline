import { logIn, signUp } from "lib/api";
import { useState } from "react";


type AuthResponse = {
  success: boolean;
  token?: string;
  userId?: string;
  error?: string;
};

export function useAuth() {
  const [loading, setLoading] = useState(false);

  async function handleSignUp(name: string, email: string, password: string) {
    setLoading(true);
    try {
      await signUp(name, email, password);
      return { success: true } as const;
    } catch (err: any) {
      return {
        success: false,
        error: err.response?.data?.error || "Failed",
      } as const;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogIn(email: string, password: string): Promise<AuthResponse> {
    setLoading(true);
    try {
      const { token, userId } = await logIn(email, password);
      return { success: true, token, userId };
    } catch (err: any) {
      return {
        success: false,
        error: err.response?.data?.error || "Failed",
      };
    } finally {
      setLoading(false);
    }
  }

  return { handleSignUp, handleLogIn, loading };
}