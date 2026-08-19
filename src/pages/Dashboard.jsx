import {
  Target,
  BookOpen,
  Flame,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoalService } from "../services/goals";
import { JournalService } from "../services/journals";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = useAuth();

  const name =
    user?.email?.split("@")[0] || "there";

  /*
   * Load actual application data
   */

  const [goals, setGoals] = useState([]);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError("");

    async function load() {
      try {
        const [goalsData, journalsData] = await Promise.all([
          GoalService.list(),
          JournalService.list(),
        ]);
        if (!cancelled) {
          setGoals(goalsData);
          setJournals(journalsData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message ||
            "Failed to load dashboard data."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [user]);

  /*
   * Goal statistics
   */

  const activeGoals = goals.filter(
    (goal) => {
      const progress =
        typeof goal.progress === "number"
          ? goal.progress
          : goal.completed
          ? 100
          : 0;

      return progress < 100;
    }
  );

  const completedGoals = goals.filter(
    (goal) => {
      const progress =
        typeof goal.progress === "number"
          ? goal.progress
          : goal.completed
          ? 100
          : 0;

      return progress === 100;
    }
  );

  const averageProgress =
    goals.length > 0
      ? Math.round(
          goals.reduce((total, goal) => {
            const progress =
              typeof goal.progress === "number"
                ? goal.progress
                : goal.completed
                ? 100
                : 0;

            return total + progress;
          }, 0) / goals.length
        )
      : 0;

  /*
   * Recent journals
   */

  const recentJournals = [...journals]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 3);

  /*
   * Recent goals
   */

  const recentGoals = [...goals]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 3);

  /*
   * Current streak — consecutive days (ending today) with at
   * least one journal entry.
   */

  const streak = (() => {
    if (!journals.length) return 0;

    const dates = new Set(
      journals.map((j) =>
        new Date(j.createdAt).toDateString()
      )
    );

    let count = 0;
    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
      if (dates.has(cursor.toDateString())) {
        count++;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }

    return count;
  })();

  if (loading) {
    return (
      <div className="app-page">

        <div className="mx-auto max-w-[1500px] px-5 py-7 md:px-8 lg:px-10">

          <section className="relative overflow-hidden rounded-panel border border-border bg-surface px-6 py-7 shadow-card md:px-8 md:py-9">

            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-burgundy/10 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">

              <div>

                <p className="section-label">
                  PERSONAL OVERVIEW
                </p>

                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-cream md:text-4xl">
                  Welcome back, {name}.
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-beige">
                  Loading your dashboard…
                </p>

              </div>

            </div>

          </section>

          <div className="mt-5 text-sm text-beige/55">
            Loading goals and journals…
          </div>

        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="app-page">

        <div className="mx-auto max-w-[1500px] px-5 py-7 md:px-8 lg:px-10">

          <section className="relative overflow-hidden rounded-panel border border-border bg-surface px-6 py-7 shadow-card md:px-8 md:py-9">

            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-burgundy/10 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">

              <div>

                <p className="section-label">
                  PERSONAL OVERVIEW
                </p>

                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-cream md:text-4xl">
                  Welcome back, {name}.
                </h1>

              </div>

            </div>

          </section>

          <div className="mt-5 rounded-xl border border-red-900/40 bg-red-950/20 px-4 py-3 text-sm text-red-400">
            {error}
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="app-page">

      <div className="mx-auto max-w-[1500px] px-5 py-7 md:px-8 lg:px-10">

        {/* ================= HEADER ================= */}

        <section className="relative overflow-hidden rounded-panel border border-border bg-surface px-6 py-7 shadow-card md:px-8 md:py-9">

          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-burgundy/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="section-label">
                PERSONAL OVERVIEW
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-cream md:text-4xl">
                Welcome back, {name}.
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-beige">
                Keep your attention on what matters. Review
                your goals, reflect on your day and understand
                your progress.
              </p>

            </div>

            <Link
              to="/goals"
              className="primary-button w-fit"
            >
              <Plus size={16} />
              Add goal
            </Link>

          </div>

        </section>

        {/* ================= METRICS ================= */}

        <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <Metric
            icon={<Target size={18} />}
            label="ACTIVE GOALS"
            value={activeGoals.length}
            detail={
              completedGoals.length === 1
                ? "1 completed"
                : `${completedGoals.length} completed`
            }
          />

          <Metric
            icon={<Flame size={18} />}
            label="CURRENT STREAK"
            value={String(streak)}
            detail="days in a row"
          />

          <Metric
            icon={<BookOpen size={18} />}
            label="JOURNALS"
            value={journals.length}
            detail={
              journals.length === 1
                ? "entry"
                : "entries"
            }
          />

          <Metric
            icon={<TrendingUp size={18} />}
            label="AVG. PROGRESS"
            value={`${averageProgress}%`}
            detail="across goals"
          />

        </section>

        {/* ================= MAIN GRID ================= */}

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_0.9fr]">

          {/* ================= GOALS ================= */}

          <div className="panel p-6 shadow-card md:p-7">

            <div className="flex items-start justify-between">

              <div>

                <p className="section-label">
                  GOALS
                </p>

                <h2 className="mt-1 text-xl font-semibold text-cream">
                  Current objectives
                </h2>

                <p className="mt-1 text-xs text-beige/65">
                  Your goals and their current progress.
                </p>

              </div>

              <Link
                to="/goals"
                className="text-xs font-semibold text-beige transition hover:text-cream"
              >
                View all →
              </Link>

            </div>

            <div className="mt-6 space-y-3">

              {recentGoals.length === 0 ? (

                <EmptyBlock
                  icon={<Target size={20} />}
                  title="No goals created"
                  text="Create your first goal to start tracking progress."
                  link="/goals"
                  button="Create goal"
                />

              ) : (

                recentGoals.map((goal) => {

                  const progress =
                    typeof goal.progress === "number"
                      ? goal.progress
                      : goal.completed
                      ? 100
                      : 0;

                  return (
                    <GoalRow
                      key={goal.id}
                      title={goal.title}
                      description={
                        goal.description ||
                        "No description provided."
                      }
                      progress={progress}
                    />
                  );
                })

              )}

            </div>

          </div>

          {/* ================= AI INSIGHT ================= */}

          <div className="rounded-panel border border-burgundy/60 bg-gradient-to-br from-[#3A1A1F] to-surface p-6 shadow-glow md:p-7">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-burgundy text-cream">
              <Sparkles size={18} />
            </div>

            <p className="mt-6 section-label">
              AI INSIGHT
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-cream">
              {goals.length === 0
                ? "Your journey starts here."
                : averageProgress >= 75
                ? "You're building strong momentum."
                : averageProgress >= 40
                ? "You're making steady progress."
                : "Small progress still counts."}
            </h2>

            <p className="mt-4 text-sm leading-6 text-beige">

              {goals.length === 0
                ? "Create a goal and start journaling. Your AI accountability insights will become more useful as your activity grows."
                : `You currently have ${goals.length} ${
                    goals.length === 1
                      ? "goal"
                      : "goals"
                  } with an average progress of ${averageProgress}%. Keep showing up consistently.`}

            </p>

            <Link
              to="/insights"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-cream hover:text-beige"
            >
              Explore insights
              <ArrowUpRight size={14} />
            </Link>

          </div>

        </section>

        {/* ================= LOWER GRID ================= */}

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">

          {/* ================= PROGRESS ================= */}

          <div className="panel p-6 shadow-card md:p-7">

            <div className="flex items-start justify-between">

              <div>

                <p className="section-label">
                  PROGRESS
                </p>

                <h2 className="mt-1 text-xl font-semibold text-cream">
                  Goal overview
                </h2>

              </div>

              <TrendingUp
                size={18}
                className="text-beige"
              />

            </div>

            {goals.length === 0 ? (

              <div className="mt-8 rounded-xl border border-border bg-surface2 p-6 text-center">

                <Target
                  size={22}
                  className="mx-auto text-beige/40"
                />

                <p className="mt-3 text-sm font-semibold text-cream">
                  No progress data yet
                </p>

                <p className="mt-1 text-xs text-beige/45">
                  Create a goal to see your progress here.
                </p>

              </div>

            ) : (

              <div className="mt-7 space-y-4">

                {goals.slice(0, 5).map((goal) => {

                  const progress =
                    typeof goal.progress === "number"
                      ? goal.progress
                      : goal.completed
                      ? 100
                      : 0;

                  return (
                    <div key={goal.id}>

                      <div className="flex items-center justify-between">

                        <span className="truncate text-xs font-medium text-cream">
                          {goal.title}
                        </span>

                        <span className="ml-4 text-xs font-semibold text-beige">
                          {progress}%
                        </span>

                      </div>

                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#382024]">

                        <div
                          className="h-full rounded-full bg-burgundy transition-all duration-500"
                          style={{
                            width: `${progress}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                })}

              </div>

            )}

          </div>

          {/* ================= RECENT ACTIVITY ================= */}

          <div className="panel p-6 shadow-card md:p-7">

            <div className="flex items-start justify-between">

              <div>

                <p className="section-label">
                  ACTIVITY LOG
                </p>

                <h2 className="mt-1 text-xl font-semibold text-cream">
                  Recent activity
                </h2>

              </div>

              <CheckCircle2
                size={18}
                className="text-beige"
              />

            </div>

            <div className="mt-5">

              {recentJournals.length === 0 &&
              recentGoals.length === 0 ? (

                <div className="py-8 text-center">

                  <BookOpen
                    size={22}
                    className="mx-auto text-beige/35"
                  />

                  <p className="mt-3 text-sm font-semibold text-cream">
                    Nothing yet
                  </p>

                  <p className="mt-1 text-xs text-beige/45">
                    Your recent activity will appear here.
                  </p>

                </div>

              ) : (

                <div className="divide-y divide-border">

                  {recentJournals.map((entry) => (

                    <ActivityItem
                      key={`journal-${entry.id}`}
                      title="Journal entry created"
                      detail={entry.title}
                      time={formatRelativeDate(
                        entry.createdAt
                      )}
                    />

                  ))}

                  {recentGoals.map((goal) => (

                    <ActivityItem
                      key={`goal-${goal.id}`}
                      title="Goal created"
                      detail={goal.title}
                      time={formatRelativeDate(
                        goal.createdAt
                      )}
                    />

                  ))}

                </div>

              )}

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

/* =========================================================
   METRIC
========================================================= */

function Metric({
  icon,
  label,
  value,
  detail,
}) {
  return (
    <div className="panel p-5 shadow-card transition duration-200 hover:border-burgundy">

      <div className="flex items-center justify-between">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-wine/60 text-cream">
          {icon}
        </div>

        <span className="h-1.5 w-1.5 rounded-full bg-burgundy" />

      </div>

      <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.17em] text-beige/55">
        {label}
      </p>

      <div className="mt-1 flex items-baseline gap-2">

        <span className="text-2xl font-semibold text-cream">
          {value}
        </span>

        <span className="text-[11px] text-beige/50">
          {detail}
        </span>

      </div>

    </div>
  );
}

/* =========================================================
   GOAL ROW
========================================================= */

function GoalRow({
  title,
  description,
  progress,
}) {
  return (
    <div className="rounded-xl border border-border bg-[#1A0E10] p-4 transition hover:border-burgundy">

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">

          <h3 className="text-sm font-semibold text-cream">
            {title}
          </h3>

          <p className="mt-1 truncate text-xs text-beige/55">
            {description}
          </p>

        </div>

        <span className="text-sm font-semibold text-cream">
          {progress}%
        </span>

      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#382024]">

        <div
          className="h-full rounded-full bg-burgundy transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>
  );
}

/* =========================================================
   EMPTY BLOCK
========================================================= */

function EmptyBlock({
  icon,
  title,
  text,
  link,
  button,
}) {
  return (
    <div className="rounded-xl border border-border bg-surface2 p-7 text-center">

      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-wine/30 text-beige">
        {icon}
      </div>

      <p className="mt-3 text-sm font-semibold text-cream">
        {title}
      </p>

      <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-beige/45">
        {text}
      </p>

      <Link
        to={link}
        className="mt-4 inline-flex rounded-lg bg-burgundy px-4 py-2 text-xs font-semibold text-cream hover:bg-[#7D3540]"
      >
        {button}
      </Link>

    </div>
  );
}

/* =========================================================
   ACTIVITY ITEM
========================================================= */

function ActivityItem({
  title,
  detail,
  time,
}) {
  return (
    <div className="flex gap-3 py-4">

      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-burgundy" />

      <div className="min-w-0 flex-1">

        <p className="text-sm font-semibold text-cream">
          {title}
        </p>

        <p className="mt-1 truncate text-xs text-beige/55">
          {detail}
        </p>

      </div>

      <span className="shrink-0 text-[9px] text-beige/40">
        {time}
      </span>

    </div>
  );
}

/* =========================================================
   DATE
========================================================= */

function formatRelativeDate(date) {
  if (!date) return "";

  const created = new Date(date);

  if (Number.isNaN(created.getTime())) {
    return "";
  }

  const now = new Date();

  const diff =
    now.getTime() - created.getTime();

  const minutes = Math.floor(
    diff / (1000 * 60)
  );

  const hours = Math.floor(
    diff / (1000 * 60 * 60)
  );

  const days = Math.floor(
    diff / (1000 * 60 * 60 * 24)
  );

  if (minutes < 1) return "Just now";

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 7) {
    return `${days}d ago`;
  }

  return created.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}