import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mainbg text-text-pri">
      <div className="bg-mgrey rounded-xl shadow-lg p-8 w-full max-w-sm border border-search">
        <h1 className="text-xl font-semibold mb-6 text-center">
          Sign in to Google Grant AI
        </h1>
        <Link href="/signup/onboarding">
          <button className="w-full bg-search hover:bg-inwhite/50 text-text-pri py-2 rounded transition-all duration-150">
            Login with SSO
          </button>
        </Link>
      </div>
    </div>
  );
}
