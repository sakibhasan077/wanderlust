import Link from "next/link";
import LoginForm from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-12 mt-25">
      <div className="w-full max-w-lg">
        {/* Heading */}
        <h1 className="text-center text-3xl font-semibold tracking-tight text-zinc-900">
          Welcome Back
        </h1>
        <p className="mt-2 text-center text-sm text-zinc-500">
          Log in to your account to continue to your dashboard.
        </p>

        {/* Card */}
        <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <LoginForm /> {/*Problem */}

          {/* Divider */}
          <p className="my-5 text-center text-xs text-zinc-500">Or sign up with</p>

          {/* TODO (logic): wire this to your Google OAuth provider
              (e.g. better-auth authClient.signIn.social({ provider: "google" })). */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A11.99 11.99 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
              />
            </svg>
            Sign Up With Google
          </button>

          {/* Sign In link */}
          <p className="mt-6 text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            {/* TODO (logic): point to your sign-in route once it exists. */}
            <Link
              href="/sign-up"
              className="font-medium text-brand hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
