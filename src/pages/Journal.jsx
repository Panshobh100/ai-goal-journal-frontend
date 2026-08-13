import { useState } from "react";
import {
  PenLine,
  CalendarDays,
  Sparkles,
  Brain,
  ArrowUpRight,
  Clock3,
} from "lucide-react";

async function saveEntry(text) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!text.trim()) {
    throw new Error("empty");
  }

  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    createdAt: new Date().toISOString(),
  };
}

export default function Journal() {
  const [entryText, setEntryText] = useState("");
  const [entries, setEntries] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setError("");

    if (!entryText.trim()) {
      setError("Please write something before saving.");
      return;
    }

    setSaving(true);

    try {
      const savedEntry = await saveEntry(entryText);

      setEntries((previousEntries) => [
        savedEntry,
        ...previousEntries,
      ]);

      setEntryText("");
    } catch {
      setError("Could not save your journal entry. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full bg-[#F7F5F1] text-[#252938]">
      <header className="border-b border-[#E7E3DC] bg-[#F7F5F1]/95 px-6 py-5 backdrop-blur md:px-10">
        <div className="mx-auto flex max-w-[1450px] items-center justify-between">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#96939A]">
              Personal reflection
            </p>

            <h1 className="text-[27px] font-semibold tracking-[-0.035em] text-[#252938] md:text-[31px]">
              Journal
            </h1>

            <p className="mt-1 text-sm text-[#85828A]">
              Reflect on your day and keep track of your progress.
            </p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DED9D1] bg-white text-[#7567C8]">
              <PenLine size={18} strokeWidth={1.7} />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1450px] px-6 py-7 md:px-10 md:py-9">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_350px]">
          <div className="space-y-5">
            <section className="rounded-[26px] border border-[#E4E0D9] bg-white p-6 shadow-[0_4px_20px_rgba(39,43,58,0.035)] md:p-7">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0EDF9] text-[#7567C8]">
                    <PenLine size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A969D]">
                      New reflection
                    </p>

                    <h2 className="mt-0.5 text-[20px] font-semibold">
                      How was your day?
                    </h2>
                  </div>
                </div>

                <div className="hidden items-center gap-2 text-xs text-[#AAA6AD] sm:flex">
                  <CalendarDays size={14} />
                  <span>Today</span>
                </div>
              </div>

              <div className="mt-6">
                <textarea
                  value={entryText}
                  onChange={(e) => setEntryText(e.target.value)}
                  placeholder="Start writing your thoughts..."
                  rows={11}
                  disabled={saving}
                  className="w-full resize-none rounded-2xl border border-[#E7E3DD] bg-[#FCFBF9] px-5 py-4 text-sm leading-7 text-[#454752] placeholder:text-[#B0ADB2] transition focus:border-[#BEB5E6] focus:bg-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {error && (
                <p className="mt-3 text-sm text-red-500" role="alert">
                  {error}
                </p>
              )}

              <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 text-xs text-[#96939A]">
                  <Sparkles size={14} className="text-[#7567C8]" />

                  <span>
                    Your reflection can later be analyzed by AI.
                  </span>
                </div>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="group flex items-center justify-center gap-2 rounded-full bg-[#293148] px-6 py-3 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#20263A] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Journal"}

                  {!saving && (
                    <ArrowUpRight
                      size={14}
                      className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  )}
                </button>
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A969D]">
                    Your reflections
                  </p>

                  <h2 className="mt-1 text-[21px] font-semibold">
                    Journal History
                  </h2>
                </div>

                <Clock3 size={17} className="text-[#AAA6AD]" />
              </div>

              {entries.length === 0 ? (
                <div className="rounded-[26px] border border-[#E4E0D9] bg-white p-8 text-center shadow-[0_4px_20px_rgba(39,43,58,0.035)]">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0EDF9] text-[#7567C8]">
                    <PenLine size={19} />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-[#454752]">
                    No journal entries yet
                  </h3>

                  <p className="mt-1 text-xs text-[#9A969D]">
                    Your saved reflections will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {entries.map((entry) => (
                    <article
                      key={entry.id}
                      className="rounded-[26px] border border-[#E4E0D9] bg-white p-6 shadow-[0_4px_20px_rgba(39,43,58,0.035)]"
                    >
                      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#AAA6AD]">
                        {new Date(entry.createdAt).toLocaleString()}
                      </p>

                      <p className="whitespace-pre-wrap text-sm leading-7 text-[#54515E]">
                        {entry.text}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="space-y-5">
            <section className="rounded-[26px] border border-[#E4E0D9] bg-white p-6 shadow-[0_4px_20px_rgba(39,43,58,0.035)]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EDF9] text-[#7567C8]">
                  <Brain size={17} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A969D]">
                    AI reflection
                  </p>

                  <h3 className="mt-0.5 text-[17px] font-semibold">
                    Your thoughts matter
                  </h3>
                </div>
              </div>

              <p className="mt-5 text-xs leading-6 text-[#929098]">
                Gemini will eventually analyze your journal entries to
                identify goals, completed activities, blockers, and useful
                patterns.
              </p>

              <div className="mt-5 space-y-2">
                <AnalysisItem label="Goals detected" />
                <AnalysisItem label="Completed activities" />
                <AnalysisItem label="Potential blockers" />
              </div>
            </section>

            <section className="rounded-[26px] border border-[#E4E0D9] bg-[#F7F4FF] p-6">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8E2FA] text-[#7567C8]">
                  <Sparkles size={17} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7567C8]">
                    Reflection prompt
                  </p>

                  <p className="mt-1 text-sm font-medium leading-6 text-[#54515E]">
                    What was the most challenging part of your day?
                  </p>
                </div>
              </div>

              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-xs font-bold text-[#293148] transition hover:bg-[#F4F1FF]">
                Get another prompt
                <ArrowUpRight size={14} />
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function AnalysisItem({ label }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-[#FAF9F7] px-3 py-2.5">
      <div className="h-1.5 w-1.5 rounded-full bg-[#7567C8]" />

      <span className="text-xs font-medium text-[#77747D]">
        {label}
      </span>
    </div>
  );
}