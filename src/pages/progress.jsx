import {
  TrendingUp,
  Flame,
  CheckCircle2,
  CalendarDays,
  Target,
} from "lucide-react";

const weeklyData = [
  { day: "MON", value: 62 },
  { day: "TUE", value: 74 },
  { day: "WED", value: 48 },
  { day: "THU", value: 82 },
  { day: "FRI", value: 68 },
  { day: "SAT", value: 91 },
  { day: "SUN", value: 76 },
];

const activities = [
  {
    title: "Morning Meditation",
    detail: "Completed today's session",
    time: "Today",
  },
  {
    title: "Read 24 Books",
    detail: "Read for 35 minutes",
    time: "Yesterday",
  },
  {
    title: "Learn Web Design",
    detail: "Completed a learning session",
    time: "2 days ago",
  },
];

export default function Progress() {
  const average = Math.round(
    weeklyData.reduce(
      (sum, item) =>
        sum + item.value,
      0
    ) / weeklyData.length
  );

  return (
    <div className="app-page">

      <header className="border-b border-border bg-surface px-5 py-7 md:px-8 lg:px-10">

        <div className="mx-auto max-w-[1250px]">

          <p className="section-label">
            PERFORMANCE
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-cream">
            Progress
          </h1>

          <p className="mt-2 text-sm text-beige/60">
            Understand your consistency and
            movement toward your goals.
          </p>

        </div>

      </header>

      <main className="mx-auto max-w-[1250px] px-5 py-7 md:px-8 lg:px-10">

        {/* METRICS */}

        <div className="grid gap-4 md:grid-cols-3">

          <StatCard
            icon={<TrendingUp size={18} />}
            label="WEEKLY PROGRESS"
            value={`${average}%`}
            detail="average this week"
          />

          <StatCard
            icon={<Flame size={18} />}
            label="CURRENT STREAK"
            value="7"
            detail="days in a row"
          />

          <StatCard
            icon={<CheckCircle2 size={18} />}
            label="COMPLETED"
            value="18"
            detail="activities"
          />

        </div>

        {/* CHART + OVERALL */}

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_0.8fr]">

          <div className="panel p-6 shadow-card md:p-7">

            <p className="section-label">
              ACTIVITY OVERVIEW
            </p>

            <h2 className="mt-2 text-xl font-semibold text-cream">
              Weekly consistency
            </h2>

            <div className="mt-8 flex h-56 items-end gap-3">

              {weeklyData.map(
                (item) => (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col justify-end"
                  >

                    <div className="flex h-full items-end">

                      <div
                        className="mx-auto w-full max-w-[42px] rounded-t-lg bg-burgundy transition hover:bg-wine"
                        style={{
                          height: `${item.value}%`,
                        }}
                      />

                    </div>

                    <span className="mt-3 text-center text-[9px] font-semibold tracking-wider text-beige/40">
                      {item.day}
                    </span>

                  </div>
                )
              )}

            </div>

          </div>

          <div className="panel p-6 shadow-card md:p-7">

            <p className="section-label">
              GOAL COMPLETION
            </p>

            <h2 className="mt-2 text-xl font-semibold text-cream">
              Overall progress
            </h2>

            <div className="mt-8 flex justify-center">

              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-[#32191D]">

                <div className="absolute inset-[-12px] rounded-full border-[12px] border-transparent border-l-burgundy border-t-burgundy border-r-burgundy rotate-[-35deg]" />

                <div className="text-center">

                  <p className="text-3xl font-semibold text-cream">
                    68%
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-beige/45">
                    complete
                  </p>

                </div>

              </div>

            </div>

            <div className="mt-7 border-t border-border pt-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[10px] text-beige/45">
                    Goals on track
                  </p>

                  <p className="mt-1 text-lg font-semibold text-cream">
                    3 / 4
                  </p>

                </div>

                <Target
                  size={18}
                  className="text-beige/50"
                />

              </div>

            </div>

          </div>

        </div>

        {/* ACTIVITY */}

        <section className="panel mt-5 p-6 shadow-card md:p-7">

          <div className="flex items-center justify-between">

            <div>

              <p className="section-label">
                ACTIVITY LOG
              </p>

              <h2 className="mt-2 text-xl font-semibold text-cream">
                Recent progress
              </h2>

            </div>

            <CalendarDays
              size={18}
              className="text-beige/50"
            />

          </div>

          <div className="mt-5 divide-y divide-border">

            {activities.map(
              (activity) => (
                <div
                  key={activity.title}
                  className="flex items-center gap-4 py-4"
                >

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-wine/25 text-cream">
                    <CheckCircle2 size={16} />
                  </div>

                  <div className="flex-1">

                    <p className="text-sm font-semibold text-cream">
                      {activity.title}
                    </p>

                    <p className="mt-1 text-xs text-beige/50">
                      {activity.detail}
                    </p>

                  </div>

                  <span className="text-[10px] text-beige/35">
                    {activity.time}
                  </span>

                </div>
              )
            )}

          </div>

        </section>

      </main>

    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  detail,
}) {
  return (
    <div className="panel p-5 shadow-card">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-wine/25 text-cream">
        {icon}
      </div>

      <p className="mt-5 section-label">
        {label}
      </p>

      <div className="mt-1 flex items-baseline gap-2">

        <span className="text-2xl font-semibold text-cream">
          {value}
        </span>

        <span className="text-[11px] text-beige/45">
          {detail}
        </span>

      </div>

    </div>
  );
}