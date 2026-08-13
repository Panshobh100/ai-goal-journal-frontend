import {
  Sparkles,
  Target,
  Lightbulb,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  Brain,
} from "lucide-react";

const insights = [
  {
    icon: Target,
    title: "Goal focus",
    text: "You have been consistently working toward your learning and personal development goals.",
  },
  {
    icon: TrendingUp,
    title: "Positive momentum",
    text: "Your recent activity suggests that your consistency is improving compared with your earlier entries.",
  },
  {
    icon: Lightbulb,
    title: "Suggested action",
    text: "Consider setting aside a fixed time each day for your highest-priority goal.",
  },
];

const patterns = [
  {
    label: "Goal consistency",
    value: 78,
  },
  {
    label: "Daily reflection",
    value: 64,
  },
  {
    label: "Activity completion",
    value: 82,
  },
];

export default function Insights() {
  return (
    <div className="w-full bg-[#F7F5F1] text-[#252938]">
      <header className="border-b border-[#E7E3DC] bg-[#F7F5F1]/95 px-6 py-5 backdrop-blur md:px-10">
        <div className="mx-auto flex max-w-[1450px] items-center justify-between gap-5">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#96939A]">
              Personal intelligence
            </p>

            <h1 className="text-[27px] font-semibold tracking-[-0.035em] md:text-[31px]">
              AI Insights
            </h1>

            <p className="mt-1 text-sm text-[#85828A]">
              Understand patterns in your goals, journal and progress.
            </p>
          </div>

          <div className="hidden h-11 w-11 items-center justify-center rounded-2xl bg-[#7567C8] text-white shadow-[0_5px_18px_rgba(117,103,200,0.2)] sm:flex">
            <Sparkles size={19} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1450px] px-6 py-7 md:px-10 md:py-9">
        <section className="overflow-hidden rounded-[28px] border border-[#DDD8EF] bg-[#F0EDF9] shadow-[0_4px_20px_rgba(39,43,58,0.035)]">
          <div className="flex flex-col gap-7 p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#7567C8]">
                  <Brain size={16} />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7567C8]">
                  AI reflection
                </span>
              </div>

              <h2 className="mt-5 text-[24px] font-semibold tracking-[-0.025em] text-[#303246] md:text-[28px]">
                Your recent activity shows positive momentum.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#69667A]">
                Your journal entries, goals and progress can be analyzed
                together to identify useful patterns, blockers and
                opportunities for improvement.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/70 bg-white/70 px-5 py-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A969D]">
                Insight status
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#7567C8]" />

                <span className="text-sm font-semibold text-[#3B3A48]">
                  Ready for analysis
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-[26px] border border-[#E4E0D9] bg-white p-6 shadow-[0_4px_20px_rgba(39,43,58,0.035)] md:p-7">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A969D]">
                Personal patterns
              </p>

              <h2 className="mt-1 text-[20px] font-semibold">
                What your activity suggests
              </h2>
            </div>

            <div className="mt-6 space-y-3">
              {insights.map((insight) => {
                const Icon = insight.icon;

                return (
                  <article
                    key={insight.title}
                    className="flex gap-4 rounded-2xl border border-[#EEEAE4] bg-[#FCFBF9] p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0EDF9] text-[#7567C8]">
                      <Icon size={17} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[#363844]">
                        {insight.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-[#8F8B93]">
                        {insight.text}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="rounded-[26px] border border-[#E4E0D9] bg-white p-6 shadow-[0_4px_20px_rgba(39,43,58,0.035)] md:p-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A969D]">
              Analysis
            </p>

            <h2 className="mt-1 text-[20px] font-semibold">
              Current patterns
            </h2>

            <div className="mt-7 space-y-6">
              {patterns.map((pattern) => (
                <div key={pattern.label}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#67646D]">
                      {pattern.label}
                    </span>

                    <span className="text-xs font-semibold text-[#7567C8]">
                      {pattern.value}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#EAE7E1]">
                    <div
                      className="h-full rounded-full bg-[#7567C8]"
                      style={{
                        width: `${pattern.value}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-[#EEEAE4] pt-5">
              <div className="flex items-start gap-3">
                <AlertCircle
                  size={16}
                  className="mt-0.5 shrink-0 text-[#7567C8]"
                />

                <p className="text-xs leading-5 text-[#96939D]">
                  These insights are currently sample UI data. They will
                  later be generated from your journal, goals and progress
                  using the AI analysis service.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-[26px] border border-[#E4E0D9] bg-white p-6 shadow-[0_4px_20px_rgba(39,43,58,0.035)] md:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A969D]">
                Next step
              </p>

              <h2 className="mt-1 text-[20px] font-semibold">
                Keep journaling to improve your insights
              </h2>

              <p className="mt-2 max-w-2xl text-xs leading-5 text-[#96939D]">
                The more useful context you record, the better the system
                can identify goals, activities, blockers and meaningful
                patterns over time.
              </p>
            </div>

            <button
              onClick={() => {
                window.location.href = "/journal";
              }}
              className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#293148] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#20263A]"
            >
              Open Journal
              <ArrowUpRight size={14} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}