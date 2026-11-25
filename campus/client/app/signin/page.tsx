"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { AuthRegistryPanel } from "@/components/shared/auth-registry-panel";

import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { signInSchema, ISignInData } from "@/schemas/signin";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./_components/InputField";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const { handleSubmit, register, formState } = useForm<ISignInData>({
    mode: "all",
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const errors = formState.errors;

  const onSubmit = async (data: ISignInData) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonData = await response.json();

      if (!jsonData.success || !jsonData.data.access_token) {
        toast.add({
          type: "error",
          description: jsonData.message || "Something went wrong!",
        });
        return;
      }

      const token = jsonData.data.access_token;
      localStorage.setItem("token", token);

      toast.add({
        type: "success",
        description: jsonData.message,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.add({
        type: "error",
        description: "Something went wrong!",
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      <AuthRegistryPanel />

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 lg:hidden mb-8">
              <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-display font-semibold text-caption">
                CC
              </div>
              <span className="font-display font-semibold text-body-md">CampusConnect</span>
            </div>
            <h1 className="font-display text-display-lg">Welcome back</h1>
            <p className="text-body-md text-muted-foreground">Sign in to your college workspace to continue.</p>
          </div>

          <Button variant="outline" size="lg" className="w-full gap-2.5">
            <FcGoogle className="h-5 w-5" />
            Continue with Google
          </Button>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-caption text-muted-foreground">or sign in with email</span>
            <Separator className="flex-1" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <InputField
                id="email"
                type="email"
                placeholder="you@gmail.edu"
                name="email"
                register={register}
                errors={errors}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-caption text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <InputField
                id="password"
                type="password"
                placeholder="*********"
                name="password"
                register={register}
                errors={errors}
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="font-normal text-muted-foreground">
                Remember me for 30 days
              </Label>
            </div>

            <Button type="submit" size="lg" className="w-full text-primary-foreground">
              Sign in
            </Button>
          </form>

          <p className="text-center text-body-sm text-muted-foreground">
            New to CampusConnect?{" "}
            <Link href="/register-college" className="text-primary font-medium hover:underline">
              Register your college
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
