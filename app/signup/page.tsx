'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import{useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth';
import{auth} from '@/app/firebase/config';
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";



// Define the signup form schema using Zod
const signupSchema = z.object({
  username: z.string().min(6, { message: "Username must be at least 6 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });
const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
const router=useRouter()
  const onSubmit =async (data: SignupForm) => {
   try {
    const res=await createUserWithEmailAndPassword(data.email,data.password)
    if(res){

      await updateProfile(res.user, { displayName: data.username });
  }
    console.log({res});
    router.push('/login');
   } catch (error) {
    console.error(error);
   }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div>
          <label htmlFor="username" className="block">Username</label>
          <input
            id="username"
            type="text"
            {...register("username")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>

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

        <div>
          <label htmlFor="confirmPassword" className="block">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Sign Up
          </button>
          <span>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:underline"
            >
              Please Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
