"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function AuthGate({ children }) {
  const router = useRouter();
  const [ready, setReady] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user?.orcid) {
      router.replace("/signup");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return null;
  return children;
}
