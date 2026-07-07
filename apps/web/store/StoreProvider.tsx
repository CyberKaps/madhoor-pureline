"use client";

import { Provider } from "react-redux";
import { store, useAppDispatch } from "./store";
import { useEffect } from "react";
import { setCredentials } from "./authSlice";
import { api } from "../lib/axios";

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        if (res.data.user) {
          dispatch(setCredentials({ user: res.data.user, token }));
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
      });
    }
  }, [dispatch]);

  return <>{children}</>;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
