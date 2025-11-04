import { useState } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <GuestLayout>
      <Head title="Login" />

      <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-md">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 7l2-3h12l2 3M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-900">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Log in to manage your inventory
        </p>

        {status && (
          <div className="mb-4 rounded-md bg-green-100 px-4 py-2 text-sm text-green-700">
            {status}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">

          {/* Email */}
          <div>
            <InputLabel htmlFor="email" value="Email Address" />
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

              <input
                id="email"
                type="email"
                className="block w-full border border-gray-300 rounded-md px-4 py-3 pl-10 bg-white 
                                           focus:border-blue-500 focus:ring-blue-500"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <InputError message={errors.email} className="mt-1" />
          </div>

          {/* Password */}
          <div>
            <InputLabel htmlFor="password" value="Password" />

            <div className="relative mt-2">

              {/* Left lock icon */}
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

              {/* Password field */}
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="block w-full border border-gray-300 rounded-md px-4 py-3 pl-10 pr-10 bg-white 
                       focus:border-blue-500 focus:ring-blue-500"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                placeholder="Enter your password"
              />

              {/* Eye toggle – Lucide icons */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <InputError message={errors.password} className="mt-1" />
          </div>



          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={data.remember}
                onChange={(e) => setData("remember", e.target.checked)}
              />
              <span className="text-gray-600">Remember Me</span>
            </label>

            {canResetPassword && (
              <Link
                href={route("password.request")}
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={processing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold"
          >
            {processing ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link href={route("register")} className="text-blue-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </GuestLayout>
  );
}
