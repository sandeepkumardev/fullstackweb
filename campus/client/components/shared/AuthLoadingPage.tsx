import { LoaderCircle } from "lucide-react";

export default function AuthLoadingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />

        <div className="space-y-1.5">
          <h1 className="text-base font-semibold tracking-tight">Checking authentication</h1>

          <p className="text-sm text-muted-foreground">Please wait while we securely verify your session.</p>
        </div>
      </div>
    </main>
  );
}
