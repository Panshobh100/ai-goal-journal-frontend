import {
  Sparkles,
  TrendingUp,
  Target,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";

export default function Insights() {
  const insights = [
    {
      icon: TrendingUp,
      title: "Your consistency is improving",
      text: "You have been showing up regularly. Keeping the habit small and consistent can help maintain your momentum.",
    },
    {
      icon: Target,
      title: "Focus on one priority",
      text: "Choose one important goal for the next few days and give it your main attention.",
    },
    {
      icon: BookOpen,
      title: "Reflection can reveal patterns",
      text: "Your journal entries can help you notice what improves or affects your productivity.",
    },
  ];

  return (
    <div className="min-h-full bg-[#120B0C] text-[#E8D8C4]">
      <header className="border-b border-[#6D2932]/30 bg-[#180E10] px-6 py-6 md:px-10">
        <div className="mx-auto max-w-[1250px]">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C7B7A3]">
            Personal intelligence
          </p>

          <h1 className="mt-2 text-3xl font-semibold">
            Insights
          </h1>

          <p className="mt-2 text-sm text-[#C7B7A3]">
            Understand your patterns and make better decisions.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1250px] px-6 py-8 md:px-10">
        <section className="rounded-2xl border border-[#6D2932]/40 bg-gradient-to-br from-[#561C24] to-[#1B1012] p-7 md:p-9">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8D8C4] text-[#561C24]">
            <Sparkles size={22} />
          </div>

          <h2 className="mt-6 text-2xl font-semibold">
            Your personal growth snapshot
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#C7B7A3]">
            Your progress is built from the small actions you take every
            day. Keep your goals realistic, reflect regularly, and focus
            on consistency rather than perfection.
          </p>

          <button className="mt-6 flex items-center gap-2 rounded-xl bg-[#E8D8C4] px-4 py-3 text-xs font-bold text-[#561C24]">
            View progress
            <ArrowUpRight size={14} />
          </button>
        </section>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {insights.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-2xl border border-[#6D2932]/30 bg-[#1B1012] p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#561C24] text-[#C7B7A3]">
                  <Icon size={18} />
                </div>

                <h3 className="mt-5 font-semibold text-[#E8D8C4]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#C7B7A3]">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}