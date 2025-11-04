import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { User, Mail, Lock ,Eye, EyeOff, Boxes } from "lucide-react";

export default function Register({ auth }: { auth: any }) {
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <GuestLayout auth={auth}>
      <Head title="Register" />
      

      <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center">
            <Boxes className="h-14 w-14 text-blue-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-900">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join us and start your journey
        </p>

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          {/* Name */}
          <div>
            <InputLabel htmlFor="name" value="Full Name" />

            <div className="relative mt-2">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

              <TextInput
                id="name"
                name="name"
                value={data.name}
                placeholder="Enter your full name"
                className="pl-10 block w-full border border-gray-300 bg-white py-3 px-4 rounded-md 
                           placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                autoComplete="name"
                isFocused={true}
                onChange={(e) => setData("name", e.target.value)}
                required
              />
            </div>

            <InputError message={errors.name} className="mt-1" />
          </div>

          {/* Email */}
          <div>
            <InputLabel htmlFor="email" value="Email Address" />

            <div className="relative mt-2">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                placeholder="Enter your email address"
                className="pl-10 block w-full border border-gray-300 bg-white py-3 px-4 rounded-md 
                           placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                autoComplete="username"
                onChange={(e) => setData("email", e.target.value)}
                required
              />
            </div>

            <InputError message={errors.email} className="mt-1" />
          </div>

          {/* Password */}
          <div>
            <InputLabel htmlFor="password" value="Password" />

            <div className="relative mt-2">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                placeholder="Create a password"
                className="pl-10 pr-10 block w-full border border-gray-300 bg-white py-3 px-4 rounded-md 
                 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => setData("password", e.target.value)}
                required
              />

              {/* Eye icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M3 3l18 18" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M2.458 12C3.732 7.943 7.523 5 
                   12 5c4.477 0 8.268 2.943 
                   9.542 7-1.274 4.057-5.065 7-9.542 
                   7-4.477 0-8.268-2.943-9.542-7z"/>
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            <InputError message={errors.password} className="mt-1" />
          </div>

          {/* Confirm Password */}
          <div>
            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

            <div className="relative mt-2">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

              <TextInput
                id="password_confirmation"
                type={showConfirmPassword ? "text" : "password"}
                name="password_confirmation"
                value={data.password_confirmation}
                placeholder="Confirm your password"
                className="pl-10 pr-10 block w-full border border-gray-300 bg-white py-3 px-4 rounded-md 
                 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => setData("password_confirmation", e.target.value)}
                required
              />

              {/* Eye icon */}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M3 3l18 18" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M2.458 12C3.732 7.943 7.523 5 
                   12 5c4.477 0 8.268 2.943 
                   9.542 7-1.274 4.057-5.065 7-9.542 
                   7-4.477 0-8.268-2.943-9.542-7z"/>
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            <InputError message={errors.password_confirmation} className="mt-1" />
          </div>


          {/* Button */}
          <button
            type="submit"
            disabled={processing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold"
          >
            {processing ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href={route("login")} className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </GuestLayout>
  );
}
