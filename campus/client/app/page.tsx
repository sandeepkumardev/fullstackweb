import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/register-college">Register College</Link>
      <Link href="/signin">Signin</Link>
      <Link href="/design-system">Design System</Link>
    </div>
  );
}
