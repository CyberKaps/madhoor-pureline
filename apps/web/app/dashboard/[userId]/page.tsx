"use client";
import { useEffect, useState } from "react";
import { getUserDetails } from "lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUserDetails();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading user details...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5fbe9]">
      <h1 className="text-3xl font-bold text-[#243629] mb-4">
        Welcome, {user.name} 👋
      </h1>
      <div className="bg-white shadow-md rounded-xl p-6 w-[400px] border border-[#f57c3b]">
        <p className="text-lg"><strong>Email:</strong> {user.email}</p>
        <p className="text-lg mt-2">
          <strong>Account created:</strong> {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
