export default function SessionErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground">Unable to verify your session. Please retry.</p>
      </div>
    </main>
  );
}
