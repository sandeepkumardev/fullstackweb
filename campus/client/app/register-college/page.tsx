"use client";

import { useState } from "react";
import Link from "next/link";
import { PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AuthRegistryPanel } from "@/components/shared/auth-registry-panel";
import { StepIndicator } from "@/components/shared/step-indicator";
import { useForm } from "react-hook-form";
import { registerCollegeSchema, RegisterCollegeTypes } from "@/schemas/register-college";
import { zodResolver } from "@hookform/resolvers/zod";
import CollegeInfo from "./_components/CollegeInfo";
import OwnerDetails from "./_components/OwnerDetails";
import CollegeMedia from "./_components/CollegeMedia";

const steps = [{ label: "College" }, { label: "Owner" }, { label: "Verification" }, { label: "Done" }];

export default function RegisterCollegePage() {
  const [step, setStep] = useState(1);
  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const { handleSubmit, register, formState, setValue, getValues, trigger } = useForm<RegisterCollegeTypes>({
    mode: "all",
    resolver: zodResolver(registerCollegeSchema),
    defaultValues: {
      collegeName: "MIT",
      collegeEmail: "admin@mit.edu",
      website: "https://mit.edu",
      phone: "123-456-7890",
      address: "123 Campus Drive",
      city: "Austin",
      state: "Texas",
      ownerName: "Kumar",
      ownerEmail: "kumar@mit.edu",
      password: "password",
      confirmPassword: "password",
      collegeLogo: undefined,
      collegeIDProof: undefined,
    },
  });
  const errors = formState.errors;

  const onSubmit = async (data: RegisterCollegeTypes) => {
    const formData = new FormData();

    formData.append("collegeName", data.collegeName);
    formData.append("collegeEmail", data.collegeEmail);
    formData.append("website", data.website);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("ownerName", data.ownerName);
    formData.append("ownerEmail", data.ownerEmail);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("collegeLogo", data.collegeLogo);
    formData.append("collegeIDProof", data.collegeIDProof);

    // const response = await fetch("/api/register-college", {
    //   method: "POST",
    //   body: formData,
    // });

    // const json = await response.json();

    // console.log(json);
  };

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

          {step === 1 && <CollegeInfo register={register} trigger={trigger} errors={errors} next={next} />}

          {step === 2 && <OwnerDetails register={register} trigger={trigger} errors={errors} next={next} back={back} />}

          {step === 3 && (
            <CollegeMedia
              back={back}
              setValue={setValue}
              getValues={getValues}
              trigger={trigger}
              errors={errors}
              next={handleSubmit(onSubmit)}
            />
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
              <Button size="lg" className="w-full max-w-sm text-primary-foreground">
                <Link href="/signin">Go to sign in</Link>
              </Button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
