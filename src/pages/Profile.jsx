import {
  User,
  Mail,
  ShieldCheck,
  Target,
  CalendarDays,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { UserService } from "../services/users";

export default function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    UserService.getMe()
      .then((data) => {
        if (mounted) {
          setProfile(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const email =
    profile?.email ||
    user?.email ||
    "user@example.com";

  const displayName =
    profile?.displayName ||
    user?.email?.split("@")[0] ||
    "there";

  const initial =
    (profile?.displayName || email)
      .charAt(0)
      .toUpperCase();

  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "—";

  if (loading) {
    return (
      <div className="app-page">
        <div className="mx-auto max-w-[1100px] px-5 py-16 text-center text-sm text-beige/60">
          Loading profile…
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-page">
        <div className="mx-auto max-w-[1100px] px-5 py-16 text-center text-sm text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">

      <header className="border-b border-border bg-surface px-5 py-7 md:px-8 lg:px-10">

        <div className="mx-auto max-w-[1100px]">

          <p className="section-label">
            ACCOUNT
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-cream">
            Profile
          </h1>

          <p className="mt-2 text-sm text-beige/60">
            Manage your personal Goal Journal
            information.
          </p>

        </div>

      </header>

      <main className="mx-auto max-w-[1100px] px-5 py-7 md:px-8 lg:px-10">

        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">

          {/* PROFILE CARD */}

          <section className="panel p-6 shadow-card">

            <div className="flex flex-col items-center text-center">

              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-burgundy text-3xl font-semibold text-cream shadow-glow">
                {initial}
              </div>

              <h2 className="mt-5 text-xl font-semibold text-cream">
                {displayName}
              </h2>

              <p className="mt-1 text-xs text-beige/50">
                {profile?.profession || "Goal Journal member"}
              </p>

            </div>

            <div className="mt-7 border-t border-border pt-5">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-wine/25 text-cream">
                  <ShieldCheck size={16} />
                </div>

                <div>

                  <p className="text-xs font-semibold text-cream">
                    Account status
                  </p>

                  <p className="mt-1 text-[10px] text-beige/45">
                    Active account
                  </p>

                </div>

              </div>

            </div>

          </section>

          {/* DETAILS */}

          <section className="panel p-6 shadow-card md:p-7">

            <p className="section-label">
              PERSONAL INFORMATION
            </p>

            <h2 className="mt-2 text-xl font-semibold text-cream">
              Account details
            </h2>

            <div className="mt-6 space-y-3">

              <InfoRow
                icon={<User size={16} />}
                label="USER ID"
                value={
                  profile?.firebaseUid ||
                  user?.uid ||
                  "demo-user"
                }
              />

              <InfoRow
                icon={<Mail size={16} />}
                label="EMAIL ADDRESS"
                value={email}
              />

              <InfoRow
                icon={<CalendarDays size={16} />}
                label="MEMBER SINCE"
                value={memberSince}
              />

              <InfoRow
                icon={<Target size={16} />}
                label="WORKSPACE"
                value={profile?.profession || "Personal Growth"}
              />

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-surface2 p-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-wine/25 text-cream">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[8px] font-bold tracking-[0.16em] text-beige/40">
          {label}
        </p>

        <p className="mt-1 truncate text-sm text-cream">
          {value}
        </p>

      </div>

    </div>
  );
}