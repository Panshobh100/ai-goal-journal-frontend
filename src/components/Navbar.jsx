import {
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  const email =
    user?.email || "user@example.com";

  const initial =
    email.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-border bg-[#190D0F]/95 px-5 backdrop-blur-xl md:px-8">

      {/* LEFT */}

      <div className="ml-12 lg:ml-0">

        <div className="hidden items-center gap-2 md:flex">

          <span className="h-1.5 w-1.5 rounded-full bg-burgundy" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-beige/60">
            Personal workspace
          </span>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-3">

        {/* SEARCH */}

        <div className="hidden items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 lg:flex">

          <Search
            size={15}
            className="text-beige/50"
          />

          <span className="text-xs text-beige/40">
            Search
          </span>

          <span className="ml-6 rounded-md border border-border px-1.5 py-0.5 text-[9px] text-beige/40">
            /
          </span>

        </div>

        {/* NOTIFICATION */}

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-beige transition hover:border-burgundy hover:text-cream"
        >
          <Bell size={17} />

          <span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-burgundy" />
        </button>

        {/* PROFILE */}

        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-2 py-1.5">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-burgundy text-xs font-bold text-cream">
            {initial}
          </div>

          <div className="hidden sm:block">

            <p className="max-w-[120px] truncate text-xs font-semibold text-cream">
              {email}
            </p>

            <p className="text-[9px] text-beige/50">
              Account
            </p>

          </div>

          <ChevronDown
            size={14}
            className="hidden text-beige/50 sm:block"
          />

        </div>

      </div>

    </header>
  );
}