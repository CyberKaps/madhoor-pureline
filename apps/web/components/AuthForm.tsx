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

  const { handleLogIn, handleSignUp } = useAuth()

  const onSubmit = async (data: any) => {
    if (isLogIn) {
      const res = await handleLogIn(data.email, data.password)
      if (res.success) {
        toast.success("Signed in successfully ✅")
        router.push(`/dashboard/${res.userId}`)
      } else {
        toast.error(res.error)
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
    <section className="flex items-center justify-center min-h-screen bg-[#f5fbe9]">
      <div className="lg:min-w-[500px] border-2 border-[#f57c3b] rounded-2xl shadow-xl bg-white">
        <div className="flex flex-col gap-6 py-14 px-10">
          {/* Brand Header */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#f57c3b] rounded-sm"></div>
              <span className="font-bold text-lg text-[#243629]">
                Madhoor Pureline
              </span>
            </div>
          </div>

          {/* Form */}
          <FormProvider {...form}>
            <form
              className="w-full space-y-6 mt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Name (only for Sign Up) */}
              {!isLogIn && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="text"
                          placeholder="Your Name"
                          className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-[#f57c3b] outline-none"
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-[#f57c3b] outline-none"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-[#f57c3b] outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  className="bg-[#243629] hover:bg-[#355a42] transition-all duration-300 
                             rounded-lg w-1/2 text-white py-2 font-semibold shadow-md"
                  type="submit"
                >
                  {isLogIn ? "Log In" : "Create an Account"}
                </button>
              </div>
            </form>
          </FormProvider>

          {/* Switch between SignIn / SignUp */}
          <p className="text-center text-[#243629]">
            {isLogIn ? "Don't have an account?" : "Already have an account?"}
            <Link
              className="font-bold text-[#f57c3b] ml-1 hover:underline"
              href={isLogIn ? "/signup" : "/login"}
            >
              {!isLogIn ? "Log In" : "Sign Up"}
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default AuthForm
