import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { AuthRegistryPanel } from "@/components/patterns/auth-registry-panel";

function GoogleIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.46H12v4.66h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.83Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1A11.998 11.998 0 0 0 12 24Z"
      />
      <path fill="#FBBC05" d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.27a12 12 0 0 0 0 10.78l4-3.1Z" />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.27 6.61l4 3.1C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

export default function SignInPage() {
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
            <GoogleIcon />
            Continue with Google
          </Button>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-caption text-muted-foreground">or sign in with email</span>
            <Separator className="flex-1" />
          </div>

          <form className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">College email</Label>
              <Input id="email" type="email" placeholder="you@college.edu" autoComplete="email" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-caption text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="**********" autoComplete="current-password" />
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
