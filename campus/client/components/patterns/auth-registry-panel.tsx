// import { CheckCircle2 } from "lucide-react";

// const entries = [
//   { name: "Fatima Zahra University", city: "Casablanca", id: "CC-22910", time: "2m ago" },
//   { name: "St. Xavier Institute of Tech", city: "Kolkata", id: "CC-22909", time: "14m ago" },
//   { name: "Andes Polytechnic College", city: "Bogotá", id: "CC-22908", time: "41m ago" },
//   { name: "Meridian State College", city: "Austin", id: "CC-22907", time: "1h ago" },
//   { name: "Kwame Nkrumah Institute", city: "Accra", id: "CC-22906", time: "3h ago" },
//   { name: "Sakura Women\u2019s College", city: "Osaka", id: "CC-22905", time: "5h ago" },
// ];

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

      {/* <div className="relative z-10 space-y-1">
        <p className="text-caption font-mono uppercase tracking-widest text-primary-foreground/50 mb-3">
          Recently registered
        </p>
        <div className="rounded-lg border border-primary-foreground/10 divide-y divide-primary-foreground/10 overflow-hidden">
          {entries.map((e) => (
            <div key={e.id} className="flex items-center gap-3 px-3 py-2.5 text-caption">
              <CheckCircle2 className="size-3.5 shrink-0 text-accent" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-primary-foreground/90">{e.name}</p>
                <p className="font-mono text-primary-foreground/45">{e.city}</p>
              </div>
              <span className="font-mono text-primary-foreground/40 shrink-0">{e.id}</span>
              <span className="font-mono text-primary-foreground/30 shrink-0 w-12 text-right">{e.time}</span>
            </div>
          ))}
        </div>
      </div> */}

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
