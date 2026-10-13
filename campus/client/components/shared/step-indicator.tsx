import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  label: string;
}

export function StepIndicator({ steps, current }: { steps: Step[]; current: number }) {
  return (
    <ol className="flex items-center gap-2">
      {steps.map((step, i) => {
        const index = i + 1;
        const state = index < current ? "done" : index === current ? "active" : "upcoming";
        return (
          <li key={step.label} className="flex items-center gap-2 flex-1 last:flex-none">
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-caption font-mono font-medium transition-colors",
                  state === "done" && "bg-primary text-primary-foreground",
                  state === "active" && "bg-primary/10 text-primary ring-1 ring-inset ring-primary",
                  state === "upcoming" && "bg-muted text-muted-foreground",
                )}
              >
                {state === "done" ? <Check className="size-3.5" /> : index}
              </span>
              <span
                className={cn(
                  "hidden sm:inline text-body-sm font-medium whitespace-nowrap",
                  state === "upcoming" ? "text-muted-foreground" : "text-foreground",
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length && (
              <div className={cn("h-px flex-1 mx-1", index < current ? "bg-primary" : "bg-border")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

<div>
  <div>40%</div>
  <div>
    <div>Tell us about your college</div>
    <div>You’ll be the College Owner</div>
    <div></div>
  </div>
</div>;
