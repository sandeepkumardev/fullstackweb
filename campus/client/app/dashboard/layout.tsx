"use client";

import AuthLoadingPage from "@/components/shared/AuthLoadingPage";
import SessionErrorPage from "@/components/shared/SessionErrorPage";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type IStatus = "loading" | "authenticated" | "unauthenticated" | "error";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [status, setStatus] = useState<IStatus>("loading");

  useEffect(() => {
    let active = true;

    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          if (active) setStatus("unauthenticated");
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!data.success) {
          localStorage.removeItem("token");
          if (active) setStatus("unauthenticated");
          return;
        }

        console.log(data);
        if (active) setStatus("authenticated");
      } catch {
        if (active) setStatus("error");
      }
    }

    fetchUser();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/signin?next=${pathname}`);
    }
  }, [status, router, pathname]);

  if (status === "loading" || status == "unauthenticated") {
    return <AuthLoadingPage />;
  }

  if (status === "error") {
    return <SessionErrorPage />;
  }

  return children;
}
