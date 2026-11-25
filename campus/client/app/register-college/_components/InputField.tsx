import { Input } from "@/components/ui/input";
import { RegisterCollegeTypes } from "@/schemas/register-college";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const InputField = ({
  id,
  register,
  name,
  errors,
  placeholder,
  type = "text",
}: {
  id: string;
  register: UseFormRegister<RegisterCollegeTypes>;
  name: keyof RegisterCollegeTypes;
  errors: FieldErrors<RegisterCollegeTypes>;
  placeholder?: string;
  type?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Input id={id} type={type === "password" && open ? "text" : type} placeholder={placeholder} {...register(name)} />
      {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}

      {type === "password" && (
        <div className="absolute top-1.5 right-2">
          {open ? <Eye onClick={() => setOpen(false)} /> : <EyeClosed onClick={() => setOpen(true)} />}
        </div>
      )}
    </div>
  );
};

export default InputField;
