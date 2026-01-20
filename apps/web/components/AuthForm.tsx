"use client"

import Link from "next/link"
import { useForm, FormProvider } from "react-hook-form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAuth } from "hooks/useAuth"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Loader2 } from "lucide-react"

type FormType = "log-in" | "sign-up"

const AuthForm = ({ type }: { type: FormType }) => {
  const isLogIn = type === "log-in"
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
  const router = useRouter()

  const { handleLogIn, handleSignUp, loading } = useAuth()

  const onSubmit = async (data: any) => {
    if (isLogIn) {
      const res = await handleLogIn(data.email, data.password)
      if (res.success && res.userId) {
        toast.success("Signed in successfully ✅")
        router.push(`/dashboard/${res.userId}`)
      } else {
        toast.error(res.error || "Something went wrong")
      }
    } else {
      const res = await handleSignUp(data.name, data.email, data.password)
      if (res.success) {
        toast.success("Account created! You can now Log In ✅")
        router.push("/login")
      } else {
        toast.error(res.error)
      }
    }
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#f0ece0] py-12">
      <div className="w-full max-w-md mx-4 bg-white rounded-xl shadow-lg border border-[#e0dac5] overflow-hidden">
        <div className="flex flex-col gap-6 py-10 px-8">
          {/* Brand Header */}
          <div className="flex flex-col items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img src="/assets/MadhoorLogo.png" alt="Madhoor Pureline" className="w-12 h-12 rounded-md object-cover" />
            </Link>
            <h1 className="text-2xl font-bold text-[#1f3a2e]">
              {isLogIn ? "Welcome Back" : "Join Pureline"}
            </h1>
            <p className="text-sm text-[#4a6b50] text-center">
              {isLogIn ? "Sign in to access your wellness journey" : "Create an account to start your pure promise"}
            </p>
          </div>

          {/* Form */}
          <FormProvider {...form}>
            <form
              className="w-full space-y-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Name (only for Sign Up) */}
              {!isLogIn && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1f3a2e]">Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Your Name"
                          className="border-[#c9c0a8] focus-visible:ring-[#5a7c5e]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1f3a2e]">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        className="border-[#c9c0a8] focus-visible:ring-[#5a7c5e]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1f3a2e]">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        className="border-[#c9c0a8] focus-visible:ring-[#5a7c5e]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                className="w-full bg-[#5a7c5e] hover:bg-[#4a6b50] text-white font-semibold h-11 text-base mt-2"
                type="submit"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {isLogIn ? "Log In" : "Create Account"}
              </Button>
            </form>
          </FormProvider>

          {/* Switch between SignIn / SignUp */}
          <div className="text-center text-sm text-[#4a6b50]">
            {isLogIn ? "Don't have an account? " : "Already have an account? "}
            <Link
              className="font-semibold text-[#5a7c5e] hover:underline"
              href={isLogIn ? "/signup" : "/login"}
            >
              {!isLogIn ? "Log In" : "Sign Up"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthForm
