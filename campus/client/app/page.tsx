import Link from "next/link";

const page = () => {
  return (
    <div>
      <Link href="/register-college">Register College</Link>
      <Link href="/signin">Signin</Link>
      <Link href="/design-system">Design System</Link>
    </div>
  );
};

export default page;
