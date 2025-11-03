"use client";
import { MdArrowBack } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";

function isSafeInternalPath(path = "") {
  return typeof path === "string" && path.startsWith("/");
}

export default function GrantBackButton({ fallback = "/" }) {
  const router = useRouter();
  const sp = useSearchParams();
  const from = sp.get("from");

  const handleBack = () => {
    if (
      typeof window !== "undefined" &&
      window.history.length > 1 &&
      document.referrer &&
      new URL(document.referrer).origin === window.location.origin
    ) {
      router.back();
      return;
    }
    if (isSafeInternalPath(from)) {
      router.push(from);
      return;
    }
    router.push(fallback);
  };

  return (
    <button
      className="flex justify-center items-center w-10 h-10 rounded-xl text-text-sec hover:bg-neutral-700/40 hover:text-text-pri"
      onClick={handleBack}
      aria-label="Go back"
    >
      <MdArrowBack size={20} />
    </button>
  );
}
