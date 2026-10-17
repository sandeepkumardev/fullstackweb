import { Input } from "@/components/ui/input";
import { RegisterCollegeTypes } from "@/schemas/register-college";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const InputField = ({
  id,
  register,
  name,
  errors,
}: {
  id: string;
  register: UseFormRegister<RegisterCollegeTypes>;
  name: keyof RegisterCollegeTypes;
  errors: FieldErrors<RegisterCollegeTypes>;
}) => {
  return (
    <div>
      <Input id={id} placeholder="Meridian State College" {...register(name)} />
      {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
    </div>
  );
};

export default InputField;
