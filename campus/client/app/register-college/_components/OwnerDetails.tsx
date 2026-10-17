import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RegisterCollegeTypes } from "@/schemas/register-college";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FieldErrors, UseFormRegister, UseFormTrigger } from "react-hook-form";
import InputField from "./InputField";

const OwnerDetails = ({
  register,
  trigger,
  errors,
  next,
  back,
}: {
  register: UseFormRegister<RegisterCollegeTypes>;
  trigger: UseFormTrigger<RegisterCollegeTypes>;
  errors: FieldErrors<RegisterCollegeTypes>;
  next: () => void;
  back: () => void;
}) => {
  const isValid = async () => {
    const isValid = await trigger(["ownerName", "ownerEmail", "password", "confirmPassword"]);
    if (!isValid) return;
    next();
  };
  return (
    <section className="space-y-6 animate-fade-up">
      <div className="space-y-1.5">
        <h1 className="font-display text-display-lg">You&rsquo;ll be the College Owner</h1>
        <p className="text-body-md text-muted-foreground">This account manages departments, teachers, and students.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="full-name">Full name</Label>
          <InputField id="full-name" name="ownerName" register={register} errors={errors} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="owner-email">Email</Label>
          <InputField id="owner-email" name="ownerEmail" register={register} errors={errors} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <InputField id="password" name="password" register={register} errors={errors} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirm-password">Confirm password</Label>
          <InputField id="confirm-password" name="confirmPassword" register={register} errors={errors} />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" onClick={back} className="gap-1.5">
          <ArrowLeft className="size-4" /> Back
        </Button>
        <Button size="lg" onClick={isValid} className="gap-1.5 text-primary-foreground">
          Continue <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
};

export default OwnerDetails;
