import {
  UserRound,
  Mail,
  CalendarDays,
  ShieldCheck,
  Pencil,
  Check,
} from "lucide-react";
import { useState } from "react";

const PROFILE_KEY = "goal-journal-profile";

function getSavedProfile(email) {
  const savedProfile = localStorage.getItem(PROFILE_KEY);

  if (savedProfile) {
    try {
      return JSON.parse(savedProfile);
    } catch {
      return {
        name: "Suhani",
        email,
      };
    }
  }

  return {
    name: "Suhani",
    email,
  };
}

export default function Profile() {
  const savedUser = localStorage.getItem("goal-journal-user");

  let email = "user@example.com";

  if (savedUser) {
    try {
      email = JSON.parse(savedUser).email || email;
    } catch {
      email = "user@example.com";
    }
  }

  const [profile, setProfile] = useState(() => getSavedProfile(email));
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [saved, setSaved] = useState(false);

  function handleEdit() {
    setEditName(profile.name);
    setEditing(true);
    setSaved(false);
  }

  function handleCancel() {
    setEditName(profile.name);
    setEditing(false);
  }

  function handleSave() {
    const updatedProfile = {
      ...profile,
      name: editName.trim() || profile.name,
    };

    localStorage.setItem(
      PROFILE_KEY,
      JSON.stringify(updatedProfile)
    );

    setProfile(updatedProfile);
    setEditName(updatedProfile.name);
    setEditing(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <div className="min-h-full bg-[#F7F5F1] text-[#252938]">
      <header className="border-b border-[#E7E3DC] bg-[#F7F5F1]/95 px-6 py-5 backdrop-blur md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#96939A]">
            Personal account
          </p>

          <h1 className="text-[28px] font-semibold tracking-[-0.035em]">
            Profile
          </h1>

          <p className="mt-1 text-sm text-[#85828A]">
            Manage your personal information and account details.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6 py-7 md:px-10 md:py-9">
        <section className="overflow-hidden rounded-[28px] border border-[#E4E0D9] bg-white shadow-[0_4px_20px_rgba(39,43,58,0.035)]">
          <div className="h-28 bg-[#293148] md:h-36" />

          <div className="px-6 pb-7 md:px-8">
            <div className="-mt-12 flex flex-col gap-5 md:-mt-14 md:flex-row md:items-end md:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-[26px] border-[5px] border-white bg-[#7567C8] text-white shadow-lg md:h-28 md:w-28">
                  <UserRound size={40} strokeWidth={1.6} />
                </div>

                <div className="pb-1">
                  <h2 className="text-xl font-semibold">
                    {profile.name}
                  </h2>

                  <p className="mt-1 text-xs text-[#96939D]">
                    Personal account
                  </p>
                </div>
              </div>

              {!editing && (
                <button
                  onClick={handleEdit}
                  className="flex w-fit items-center gap-2 rounded-full border border-[#DDD9D2] bg-white px-4 py-2.5 text-xs font-semibold text-[#4B4A54] transition hover:border-[#7567C8] hover:text-[#7567C8]"
                >
                  <Pencil size={14} />
                  Edit profile
                </button>
              )}
            </div>

            {editing && (
              <div className="mt-8 rounded-2xl border border-[#DDD8EF] bg-[#F8F6FC] p-5">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8E8998]">
                  Full name
                </label>

                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  autoFocus
                  className="mt-2 w-full rounded-xl border border-[#DDD9D2] bg-white px-4 py-3 text-sm text-[#363844] outline-none transition focus:border-[#7567C8] focus:ring-2 focus:ring-[#7567C8]/10"
                />

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={handleCancel}
                    className="rounded-full border border-[#DDD9D2] bg-white px-4 py-2.5 text-xs font-semibold text-[#65626A] transition hover:bg-[#F7F5F1]"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 rounded-full bg-[#293148] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#20263A]"
                  >
                    <Check size={14} />
                    Save changes
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[#ECE8E2] bg-[#FCFBF9] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EDF9] text-[#7567C8]">
                    <UserRound size={16} />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#9A969D]">
                      Full name
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#363844]">
                      {profile.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#ECE8E2] bg-[#FCFBF9] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EDF9] text-[#7567C8]">
                    <Mail size={16} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#9A969D]">
                      Email address
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-[#363844]">
                      {profile.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#ECE8E2] bg-[#FCFBF9] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EDF9] text-[#7567C8]">
                    <CalendarDays size={16} />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#9A969D]">
                      Member since
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#363844]">
                      August 2026
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#ECE8E2] bg-[#FCFBF9] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EDF9] text-[#7567C8]">
                    <ShieldCheck size={16} />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#9A969D]">
                      Account status
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#7567C8]" />

                      <p className="text-sm font-medium text-[#363844]">
                        Active
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {saved && (
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#DDD8EF] bg-[#F0EDF9] px-4 py-3 text-xs font-medium text-[#7567C8]">
                <Check size={14} />
                Profile changes saved successfully.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}