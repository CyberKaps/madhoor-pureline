"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { toggleAuthModal, setCredentials } from "../store/authSlice";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { api } from "../lib/axios";
import { toast } from "sonner";

export default function AuthModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.auth.isAuthModalOpen);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const { data } = await api.post(endpoint, payload);
      
      dispatch(setCredentials({ user: data.user, token: data.token }));
      
      // Save token to local storage
      localStorage.setItem("token", data.token);
      
      toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => dispatch(toggleAuthModal(open))}>
      <DialogContent className="sm:max-w-md border-[#ece4dd] bg-[#faf9f8]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-primary text-center">
            {isLogin ? "Welcome Back" : "Create Account"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#444]">Full Name</Label>
              <Input
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="bg-white border-[#ece4dd] focus-visible:ring-primary"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#444]">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-white border-[#ece4dd] focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#444]">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="bg-white border-[#ece4dd] focus-visible:ring-primary"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-[#7b5034] text-white rounded-[0.4rem]"
          >
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>
        <div className="text-center mt-4 text-sm text-[#666]">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-bold hover:underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
