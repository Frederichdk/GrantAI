import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
      <div className="bg-neutral-800 rounded-xl shadow-lg p-8 w-full max-w-sm border border-neutral-700">
        <h1 className="text-xl font-semibold mb-6 text-center">
          Sign in to Google Grant AI
        </h1>
        <Link href="/signup/onboarding">
          <button className="w-full bg-neutral-700 hover:bg-neutral-600 text-white py-2 rounded transition-all duration-150">
            Login with SSO
          </button>
        </Link>
      </div>
    </div>
  );
}
