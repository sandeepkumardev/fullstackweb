export function AuthRegistryPanel() {
  return (
    <div className="relative hidden lg:flex lg:w-[42%] flex-col justify-between bg-primary text-primary-foreground px-10 py-10 overflow-hidden">
      <div className="relative z-10 flex items-center gap-2">
        <div className="h-7 w-7 rounded-md bg-primary-foreground/15 flex items-center justify-center font-display font-semibold text-caption">
          CC
        </div>
        <span className="font-display font-semibold text-body-md">CampusConnect</span>
      </div>

      <div className="relative z-10 space-y-6 max-w-sm">
        <h2 className="font-display text-display-lg leading-tight">One private workspace, per college.</h2>
        <p className="text-body-md text-primary-foreground/70">
          Every institution on CampusConnect gets its own isolated space for classes, clubs, and conversation \u2014
          invisible to every other campus.
        </p>
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}
