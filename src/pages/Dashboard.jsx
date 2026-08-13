import {
  Bell,
  Flame,
  Target,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  PenLine,
  Clock3,
  MoreHorizontal,
  ChevronRight,
  Brain,
} from "lucide-react";

const goals = [
  {
    title: "Morning Meditation",
    subtitle: "Build a consistent morning routine",
    progress: 68,
    accent: "#7567C8",
  },
  {
    title: "Read 24 Books",
    subtitle: "Expand your knowledge every week",
    progress: 42,
    accent: "#9A86C8",
  },
  {
    title: "Learn Web Design",
    subtitle: "Complete your design roadmap",
    progress: 85,
    accent: "#5C6380",
  },
];

const activities = [
  {
    time: "Today · 2:30 PM",
    title: "Completed a journal reflection",
    description: "You reflected on today's progress.",
  },
  {
    time: "Yesterday · 8:00 PM",
    title: "Updated Learn Web Design",
    description: "Goal progress increased by 8%.",
  },
  {
    time: "Yesterday · 9:15 AM",
    title: "10 day streak achieved",
    description: "Consistency is becoming a habit.",
  },
];

export default function Dashboard() {
  return (
    <div className="w-full bg-[#F7F5F1] text-[#252938]">
      <header className="border-b border-[#E7E3DC] bg-[#F7F5F1]/95 px-6 py-5 backdrop-blur md:px-10">
        <div className="mx-auto flex max-w-[1450px] items-center justify-between">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#96939A]">
              Wednesday · August 12
            </p>

            <h1 className="text-[27px] font-semibold tracking-[-0.035em] text-[#252938] md:text-[31px]">
              Good evening, Suhani
              <span className="ml-2">👋</span>
            </h1>

            <p className="mt-1 text-sm text-[#85828A]">
              Your growth is a journey, not a destination.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-[#DED9D1] bg-white text-[#5D6070] transition hover:border-[#C8C1B7] hover:shadow-sm sm:flex"
              aria-label="Notifications"
            >
              <Bell size={18} strokeWidth={1.7} />

              <span className="absolute right-[9px] top-[8px] h-1.5 w-1.5 rounded-full bg-[#7567C8]" />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#292F43] text-sm font-semibold text-white shadow-sm">
              S
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1450px] px-6 py-7 md:px-10 md:py-9">
        <section className="grid gap-4 md:grid-cols-4">
          <StatCard
            icon={<Flame size={18} />}
            label="CURRENT STREAK"
            value="10"
            suffix="days"
          />

          <StatCard
            icon={<Target size={18} />}
            label="ACTIVE GOALS"
            value="3"
            suffix=""
          />

          <StatCard
            icon={<CheckCircle2 size={18} />}
            label="COMPLETED"
            value="24"
            suffix="this month"
          />

          <StatCard
            icon={<TrendingUp size={18} />}
            label="WEEKLY PROGRESS"
            value="78"
            suffix="%"
          />
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_350px]">
          <div className="space-y-5">
            <section className="rounded-[26px] border border-[#E4E0D9] bg-white p-6 shadow-[0_4px_20px_rgba(39,43,58,0.035)] md:p-7">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A969D]">
                    Your objectives
                  </p>

                  <h2 className="mt-1.5 text-[22px] font-semibold tracking-[-0.025em]">
                    Goal Progress
                  </h2>
                </div>

                <button className="group flex items-center gap-1 text-xs font-semibold text-[#7567C8]">
                  View all
                  <ChevronRight
                    size={15}
                    className="transition group-hover:translate-x-0.5"
                  />
                </button>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {goals.map((goal) => (
                  <GoalCard key={goal.title} {...goal} />
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[26px] border border-[#E4E0D9] bg-white shadow-[0_4px_20px_rgba(39,43,58,0.035)]">
              <div className="p-6 md:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0EDF9] text-[#7567C8]">
                      <PenLine size={18} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A969D]">
                        Daily reflection
                      </p>

                      <h2 className="mt-0.5 text-[19px] font-semibold">
                        Today's Journal
                      </h2>
                    </div>
                  </div>

                  <button className="rounded-full p-2 text-[#96939A] hover:bg-[#F6F4F0]">
                    <MoreHorizontal size={19} />
                  </button>
                </div>

                <div className="mt-6 rounded-2xl bg-[#FAF9F7] p-5">
                  <p className="text-sm leading-7 text-[#73717A]">
                    "I felt productive today, especially while working on my
                    learning goals. I still need to focus more on..."
                  </p>
                </div>

                <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2 text-xs text-[#94919A]">
                    <Sparkles size={14} className="text-[#7567C8]" />

                    <span>AI reflection prompt available</span>
                  </div>

                  <button className="group flex items-center justify-center gap-2 rounded-full bg-[#293148] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#20263A]">
                    Continue writing

                    <ArrowUpRight
                      size={14}
                      className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </div>

              <div className="border-t border-[#E9E5DE] bg-[#F7F4FF] px-6 py-5 md:px-7">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8E2FA] text-[#7567C8]">
                    <Brain size={16} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7567C8]">
                      AI prompt
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#54515E]">
                      What was the most challenging part of your day?
                    </p>
                  </div>
                </div>

                <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-xs font-bold text-[#293148] transition hover:bg-[#F4F1FF]">
                  Get another prompt
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </section>
          </div>

          <div className="space-y-5">
            <section className="rounded-[26px] border border-[#E4E0D9] bg-white p-6 shadow-[0_4px_20px_rgba(39,43,58,0.035)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A969D]">
                    Activity
                  </p>

                  <h2 className="mt-1 text-[19px] font-semibold">
                    Recent Activity
                  </h2>
                </div>

                <Clock3 size={17} className="text-[#96939A]" />
              </div>

              <div className="mt-6 space-y-5">
                {activities.map((activity) => (
                  <div key={activity.title} className="flex gap-3">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#7567C8]" />

                    <div>
                      <p className="text-[10px] text-[#AAA6AD]">
                        {activity.time}
                      </p>

                      <p className="mt-1 text-xs font-semibold text-[#454752]">
                        {activity.title}
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-[#96939A]">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[26px] border border-[#E4E0D9] bg-white p-6 shadow-[0_4px_20px_rgba(39,43,58,0.035)]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EDF9] text-[#7567C8]">
                  <Brain size={17} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A969D]">
                    Coming next
                  </p>

                  <h3 className="mt-0.5 text-[17px] font-semibold">
                    AI Journal Analysis
                  </h3>
                </div>
              </div>

              <p className="mt-5 text-xs leading-6 text-[#929098]">
                Your journal entries will eventually be analyzed to identify
                goals, completed activities, blockers, and useful patterns.
              </p>

              <div className="mt-5 space-y-2">
                <AnalysisItem label="Goals detected" />
                <AnalysisItem label="Completed activities" />
                <AnalysisItem label="Potential blockers" />
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, suffix }) {
  return (
    <section className="rounded-[22px] border border-[#E4E0D9] bg-white p-5 shadow-[0_4px_20px_rgba(39,43,58,0.035)]">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EDF9] text-[#7567C8]">
          {icon}
        </div>

        <TrendingUp size={15} className="text-[#C4BEE0]" />
      </div>

      <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A969D]">
        {label}
      </p>

      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-[26px] font-semibold tracking-tight text-[#252938]">
          {value}
        </span>

        {suffix && (
          <span className="text-xs text-[#9A969D]">
            {suffix}
          </span>
        )}
      </div>
    </section>
  );
}

function GoalCard({ title, subtitle, progress, accent }) {
  return (
    <div className="rounded-2xl border border-[#ECE8E1] bg-[#FCFBF9] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[#363844]">
            {title}
          </h3>

          <p className="mt-1 text-[11px] leading-5 text-[#99969D]">
            {subtitle}
          </p>
        </div>

        <span
          className="text-xs font-bold"
          style={{ color: accent }}
        >
          {progress}%
        </span>
      </div>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#EAE7E1]">
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: accent,
          }}
        />
      </div>
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