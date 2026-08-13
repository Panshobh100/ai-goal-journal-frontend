import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    navigate('/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6 py-12">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white shadow-sm">
            <span className="text-xl font-semibold">GJ</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-ink">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-muted">
            Continue your journey, one day at a time.
          </p>
        </div>

        <div className="rounded-[26px] border border-line bg-white p-7 shadow-[0_4px_20px_rgba(39,43,58,0.035)]">

          <div className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
              Goal Journal
            </p>

            <h2 className="mt-1.5 text-[21px] font-semibold tracking-tight text-ink">
              Sign in to your account
            </h2>

            <p className="mt-1 text-sm text-muted">
              Enter your details to continue.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-ink">
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary"
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-line bg-soft py-3 pl-10 pr-4 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-ink">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary"
                />

                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-line bg-soft py-3 pl-10 pr-11 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted transition hover:text-primary"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted">
                <input
                  type="checkbox"
                  className="rounded border-line accent-[#7567C8]"
                />
                Remember me
              </label>

              <button
                type="button"
                className="font-semibold text-primary transition hover:text-[#6254B5]"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#20263A]"
            >
              Sign in
              <ArrowUpRight
                size={15}
                className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-line" />
            <span className="text-[10px] font-semibold text-muted">
              OR
            </span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <p className="text-center text-sm text-muted">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-primary hover:underline"
            >
              Create one
            </Link>
          </p>

        </div>

        <p className="mt-6 text-center text-[11px] text-[#AAA6AD]">
          Your goals. Your progress. Your journey.
        </p>

      </div>
    </div>
  );
}