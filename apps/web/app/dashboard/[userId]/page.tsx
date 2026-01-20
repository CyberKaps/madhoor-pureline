"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserDetails } from "lib/api";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  ShoppingBag,
  Settings,
  LogOut,
  Calendar,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUserDetails();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        router.push("/login");
      }
    }
    fetchUser();
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </motion.div>
      </div>
    );
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              M
            </div>
            <span className="text-xl font-semibold tracking-tight text-primary">Madhoor Pureline</span>
          </div>
          <button
            onClick={() => router.push('/logout')}
            className="text-sm font-medium text-muted-foreground hover:text-destructive transition-colors flex items-center gap-2"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Welcome Section */}
          <motion.div variants={fadeIn} className="lg:col-span-12 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Welcome back, {user.name.split(' ')[0]} 👋
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your profile, orders, and preferences.
            </p>
          </motion.div>

          {/* Sidebar / Quick Menu (Desktop: Left Col, Mobile: Stacked) */}
          <motion.div variants={fadeIn} className="lg:col-span-4 space-y-6">
            {/* Profile Card */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-3xl">
                  🥺
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar size={16} className="text-primary" />
                  <span>Member since {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <ShieldCheck size={16} className="text-primary" />
                  <span>Verified Account</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <button className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2">
                  <Settings size={18} />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Quick Stats or Promo */}
            <div className="bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl p-6 border border-accent/30">
              <h3 className="font-semibold text-primary mb-2">Pure Promise</h3>
              <p className="text-sm text-muted-foreground">
                Experience the purity of nature in every drop. Check our latest collection.
              </p>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div variants={fadeIn} className="lg:col-span-8 space-y-6">

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="group bg-card hover:bg-secondary/30 p-6 rounded-2xl border border-border shadow-sm transition-all hover:border-primary/30 text-left flex flex-col justify-between h-32">
                <div className="p-3 bg-secondary/50 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                  <ShoppingBag className="text-primary" size={24} />
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-card-foreground">My Orders</span>
                  <ChevronRight className="text-muted-foreground group-hover:translate-x-1 transition-transform" size={18} />
                </div>
              </button>

              <button className="group bg-card hover:bg-secondary/30 p-6 rounded-2xl border border-border shadow-sm transition-all hover:border-primary/30 text-left flex flex-col justify-between h-32">
                <div className="p-3 bg-secondary/50 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-card-foreground">Saved Addresses</span>
                  <ChevronRight className="text-muted-foreground group-hover:translate-x-1 transition-transform" size={18} />
                </div>
              </button>
            </div>

            {/* Recent Activity / Placeholder */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm min-h-[300px]">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Activity</h3>
              <div className="flex flex-col items-center justify-center h-48 text-muted-foreground bg-secondary/20 rounded-xl border border-dashed border-border">
                <ShoppingBag size={48} className="mb-2 opacity-20" />
                <p>No recent orders found</p>
                <button className="mt-4 text-primary font-medium hover:underline">Start Shopping</button>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
