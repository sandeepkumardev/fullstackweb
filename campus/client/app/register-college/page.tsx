"use client";

import { useState } from "react";
import Link from "next/link";
import { UploadCloud, ArrowLeft, ArrowRight, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AuthRegistryPanel } from "@/components/patterns/auth-registry-panel";
import { StepIndicator } from "@/components/patterns/step-indicator";

const steps = [{ label: "College" }, { label: "Owner" }, { label: "Verification" }, { label: "Done" }];

function UploadTile({ label, hint }: { label: string; hint: string }) {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-muted/40 px-4 py-8 text-center transition-colors hover:bg-muted">
      <UploadCloud className="size-5 text-muted-foreground" />
      <span className="text-body-sm font-medium">{label}</span>
      <span className="text-caption text-muted-foreground">{hint}</span>
      <input type="file" className="hidden" />
    </label>
  );
}

export default function RegisterCollegePage() {
  const [step, setStep] = useState(1);
  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="flex min-h-screen">
      <AuthRegistryPanel />

      <div className="flex flex-1 flex-col items-center px-6 py-12">
        <div className="w-full max-w-xl">
          <div className="flex items-center gap-2 lg:hidden mb-8">
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-display font-semibold text-caption">
              CC
            </div>
            <span className="font-display font-semibold text-body-md">CampusConnect</span>
          </div>

          {step < 4 && (
            <div className="mb-10">
              <StepIndicator steps={steps} current={step} />
            </div>
          )}

          {step === 1 && (
            <section className="space-y-6 animate-fade-up">
              <div className="space-y-1.5">
                <h1 className="font-display text-display-lg">Tell us about your college</h1>
                <p className="text-body-md text-muted-foreground">
                  This creates your college&rsquo;s public profile inside CampusConnect.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="college-name">College name</Label>
                  <Input id="college-name" placeholder="Meridian State College" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="college-email">College email</Label>
                  <Input id="college-email" type="email" placeholder="admin@meridian.edu" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="www.meridian.edu" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="500 Campus Drive" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Austin" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="Texas" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link href="/signin" className="text-body-sm text-muted-foreground hover:text-foreground">
                  Already registered? Sign in
                </Link>
                <Button size="lg" onClick={next} className="gap-1.5 text-primary-foreground">
                  Continue <ArrowRight className="size-4" />
                </Button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-6 animate-fade-up">
              <div className="space-y-1.5">
                <h1 className="font-display text-display-lg">You&rsquo;ll be the College Owner</h1>
                <p className="text-body-md text-muted-foreground">
                  This account manages departments, teachers, and students.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="full-name">Full name</Label>
                  <Input id="full-name" placeholder="Dr. Elena Marsh" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="owner-email">Email</Label>
                  <Input id="owner-email" type="email" placeholder="elena.marsh@meridian.edu" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="**********" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirm-password">Confirm password</Label>
                  <Input id="confirm-password" type="password" placeholder="**********" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" onClick={back} className="gap-1.5">
                  <ArrowLeft className="size-4" /> Back
                </Button>
                <Button size="lg" onClick={next} className="gap-1.5 text-primary-foreground">
                  Continue <ArrowRight className="size-4" />
                </Button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="space-y-6 animate-fade-up">
              <div className="space-y-1.5">
                <h1 className="font-display text-display-lg">Verify your institution</h1>
                <p className="text-body-md text-muted-foreground">
                  We review every college before its workspace goes live \u2014 usually within one business day.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <UploadTile label="College logo" hint="PNG or SVG, up to 5MB" />
                <UploadTile label="College ID proof" hint="Accreditation or registration doc" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" onClick={back} className="gap-1.5">
                  <ArrowLeft className="size-4" /> Back
                </Button>
                <Button size="lg" onClick={next} className="gap-1.5 text-primary-foreground">
                  Submit for review <ArrowRight className="size-4" />
                </Button>
              </div>
            </section>
          )}

          {step === 4 && (
            <section className="flex flex-col items-center text-center space-y-6 py-10 animate-fade-up">
              <div className="flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                <PartyPopper className="size-6" />
              </div>
              <div className="space-y-1.5">
                <h1 className="font-display text-display-lg">Your workspace is being created</h1>
                <p className="text-body-md text-muted-foreground max-w-sm">
                  Meridian State College is under review. We&rsquo;ll email elena.marsh@meridian.edu once it&rsquo;s verified
                  and live.
                </p>
              </div>
              <Card className="w-full max-w-sm text-left">
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-body-sm text-muted-foreground">Workspace ID</span>
                  <span className="font-mono text-body-sm">CC-22911</span>
                </div>
              </Card>
              <Button size="lg" asChild className="w-full max-w-sm text-primary-foreground">
                <Link href="/signin">Go to sign in</Link>
              </Button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
