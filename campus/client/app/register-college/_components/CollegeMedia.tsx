import { Button } from "@/components/ui/button";
import { RegisterCollegeTypes } from "@/schemas/register-college";
import { ArrowLeft, ArrowRight, File, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FieldErrors, UseFormGetValues, UseFormSetValue, UseFormTrigger } from "react-hook-form";

const CollegeMedia = ({
  setValue,
  getValues,
  trigger,
  errors,
  next,
  back,
}: {
  setValue: UseFormSetValue<RegisterCollegeTypes>;
  getValues: UseFormGetValues<RegisterCollegeTypes>;
  trigger: UseFormTrigger<RegisterCollegeTypes>;
  errors: FieldErrors<RegisterCollegeTypes>;
  next: () => void;
  back: () => void;
}) => {
  const isValid = async () => {
    const isValid = await trigger(["collegeLogo", "collegeIDProof"]);
    if (!isValid) return;
    next();
  };
  return (
    <section className="space-y-6 animate-fade-up">
      <div className="space-y-1.5">
        <h1 className="font-display text-display-lg">Verify your institution</h1>
        <p className="text-body-md text-muted-foreground">
          We review every college before its workspace goes live \u2014 usually within one business day.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <UploadFile
          label="College logo"
          hint="PNG or SVG, up to 5MB"
          name="collegeLogo"
          errors={errors}
          setValue={setValue}
          value={getValues("collegeLogo")}
        />
        <UploadFile
          label="College ID proof"
          hint="Accreditation or registration doc"
          name="collegeIDProof"
          errors={errors}
          setValue={setValue}
          value={getValues("collegeIDProof")}
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" onClick={back} className="gap-1.5">
          <ArrowLeft className="size-4" /> Back
        </Button>
        <Button size="lg" className="gap-1.5 text-primary-foreground" onClick={isValid}>
          Submit for review <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
};

function UploadFile({
  label,
  hint,
  name,
  errors,
  setValue,
  value,
}: {
  label: string;
  hint: string;
  name: keyof RegisterCollegeTypes;
  errors: FieldErrors<RegisterCollegeTypes>;
  setValue: UseFormSetValue<RegisterCollegeTypes>;
  value: File | undefined;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = React.useState("");

  React.useEffect(() => {
    if (!value || !value.type.startsWith("image/")) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(value);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [value]);

  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-muted/40 px-4 py-8 text-center transition-colors hover:bg-muted ${value ? "cursor-default" : "cursor-pointer"}`}
      onClick={() => !value && inputRef.current?.click()}
    >
      {value ? (
        <>
          {previewUrl ? (
            <Image src={URL.createObjectURL(value)} alt={label} width={128} height={128} />
          ) : (
            <File className="size-11 text-muted-foreground" />
          )}
          <span className="text-body-sm font-medium">{value.name}</span>

          <Button
            variant="ghost"
            className="cursor-pointer absolute right-2 top-2"
            onClick={() => {
              setValue(name, undefined as never, {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              });

              if (inputRef.current) {
                inputRef.current.value = "";
              }
            }}
          >
            <X className="size-4 text-red-500" />
          </Button>
        </>
      ) : (
        <>
          <UploadCloud className="size-5 text-muted-foreground" />
          <span className="text-body-sm font-medium">{label}</span>
          <span className="text-caption text-muted-foreground">{hint}</span>
        </>
      )}

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            setValue(name, file, {
              shouldTouch: true,
              shouldDirty: true,
              shouldValidate: true,
            });
          }
        }}
      />
      {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
    </div>
  );
}

export default CollegeMedia;
