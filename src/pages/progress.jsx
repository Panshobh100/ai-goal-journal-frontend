import {
  TrendingUp,
  Target,
  Flame,
  CheckCircle2,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

const weeklyData = [
  { day: "Mon", value: 62 },
  { day: "Tue", value: 74 },
  { day: "Wed", value: 48 },
  { day: "Thu", value: 82 },
  { day: "Fri", value: 68 },
  { day: "Sat", value: 91 },
  { day: "Sun", value: 76 },
];

const activities = [
  {
    title: "Morning Meditation",
    detail: "Completed today's session",
    time: "Today",
    icon: CheckCircle2,
  },
  {
    title: "Read 24 Books",
    detail: "Read for 35 minutes",
    time: "Yesterday",
    icon: Target,
  },
  {
    title: "Learn Web Design",
    detail: "Completed a learning session",
    time: "2 days ago",
    icon: TrendingUp,
  },
];

export default function Progress() {
  const average =
    Math.round(
      weeklyData.reduce((sum, item) => sum + item.value, 0) /
        weeklyData.length
    );

  return (
    <div className="w-full bg-[#F7F5F1] text-[#252938]">
      <header className="border-b border-[#E7E3DC] bg-[#F7F5F1]/95 px-6 py-5 backdrop-blur md:px-10">
        <div className="mx-auto max-w-[1450px]">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#96939A]">
            Your journey
          </p>

          <h1 className="text-[27px] font-semibold tracking-[-0.035em] md:text-[31px]">
            Progress
          </h1>

          <p className="mt-1 text-sm text-[#85828A]">
            See how consistently you are moving toward your goals.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1450px] px-6 py-7 md:px-10 md:py-9">
        <section className="grid gap-4 md:grid-cols-3">
          <StatCard
            icon={<TrendingUp size={18} />}
            label="WEEKLY PROGRESS"
            value={`${average}%`}
            description="average this week"
          />

          <StatCard
            icon={<Flame size={18} />}
            label="CURRENT STREAK"
            value="7"
            description="days in a row"
          />

          <StatCard
            icon={<CheckCircle2 size={18} />}
            label="COMPLETED"
            value="18"
            description="activities completed"
          />
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-[26px] border border-[#E4E0D9] bg-white p-6 shadow-[0_4px_20px_rgba(39,43,58,0.035)] md:p-7">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A969D]">
                  Activity overview
                </p>

                <h2 className="mt-1 text-[20px] font-semibold">
                  Weekly consistency
                </h2>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EDF9] text-[#7567C8]">
                <TrendingUp size={17} />
              </div>
            </div>

            <div className="mt-8 flex h-[220px] items-end justify-between gap-3">
              {weeklyData.map((item) => (
                <div
                  key={item.day}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >
                  <div className="flex w-full flex-1 items-end justify-center">
                    <div
                      className="w-full max-w-[38px] rounded-t-xl bg-[#7567C8] transition-all hover:bg-[#6658B7]"
                      style={{
                        height: `${item.value}%`,
                      }}
                    />
                  </div>

                  <span className="mt-3 text-[10px] font-medium text-[#9A969D]">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[26px] border border-[#E4E0D9] bg-white p-6 shadow-[0_4px_20px_rgba(39,43,58,0.035)] md:p-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A969D]">
              Goal completion
            </p>

            <h2 className="mt-1 text-[20px] font-semibold">
              Overall progress
            </h2>

            <div className="mt-8 flex items-center justify-center">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-[#EAE7E1]">
                <div className="absolute inset-[-14px] rounded-full border-[14px] border-transparent border-l-[#7567C8] border-t-[#7567C8] border-r-[#7567C8] rotate-[-35deg]" />

                <div className="text-center">
                  <p className="text-3xl font-semibold">68%</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#9A969D]">
                    complete
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between border-t border-[#EEEAE4] pt-5">
              <div>
                <p className="text-xs text-[#9A969D]">
                  Goals on track
                </p>

                <p className="mt-1 text-lg font-semibold">
                  3 / 4
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-[#7567C8]">
                <ArrowUpRight size={14} />
                12% this month
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-[26px] border border-[#E4E0D9] bg-white p-6 shadow-[0_4px_20px_rgba(39,43,58,0.035)] md:p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A969D]">
                Recent activity
              </p>

              <h2 className="mt-1 text-[20px] font-semibold">
                Your latest progress
              </h2>
            </div>

            <CalendarDays
              size={18}
              className="text-[#9A969D]"
            />
          </div>

          <div className="mt-6 divide-y divide-[#EEEAE4]">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.title}
                  className="flex items-center gap-4 py-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0EDF9] text-[#7567C8]">
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#363844]">
                      {activity.title}
                    </p>

                    <p className="mt-1 text-xs text-[#9A969D]">
                      {activity.detail}
                    </p>
                  </div>

                  <span className="text-[11px] text-[#AAA6AD]">
                    {activity.time}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, description }) {
  return (
    <section className="rounded-[22px] border border-[#E4E0D9] bg-white p-5 shadow-[0_4px_20px_rgba(39,43,58,0.035)]">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EDF9] text-[#7567C8]">
        {icon}
      </div>

      <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A969D]">
        {label}
      </p>

      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-[26px] font-semibold tracking-tight">
          {value}
        </span>

        <span className="text-xs text-[#9A969D]">
          {description}
        </span>
      </div>
    </section>
  );
}