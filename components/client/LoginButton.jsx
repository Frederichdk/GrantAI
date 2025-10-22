"use client";

import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  function handleLogin() {
    const mockUser = {
      orcid: "0000-0000-0000-0000",
      name: "Mock User",
    };
    localStorage.setItem("user", JSON.stringify(mockUser));
    router.push("/signup/onboarding"); // or "/" if you want to land on dashboard
  }

  return (
    <button
      onClick={handleLogin}
      className="w-full bg-neutral-700 hover:bg-neutral-600 text-white py-2 rounded transition-all duration-150"
    >
      Login with SSO
    </button>
  );
}
