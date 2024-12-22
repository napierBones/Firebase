"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "@/app/firebase/config";
import Link from "next/link";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";




// Define the login form schema using Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginForm = z.infer<typeof loginSchema>;



const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

const router=useRouter()
const [signInwithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const onSubmit = async (data: LoginForm) => {
    try {
        const res=await signInwithEmailAndPassword(data.email, data.password);
       
        console.log({res});
       
        router.push('/');
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-center">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div>
          <label htmlFor="email" className="block">Email</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        
        <div>
          <label htmlFor="password" className="block">Password</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
          <span>
            Dont have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-500 hover:underline"
            >
              Please Sign Up
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
