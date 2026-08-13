import {
  Target,
  Plus,
  X,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

const GOALS_KEY = "goal-journal-goals";

function getSavedGoals() {
  const saved = localStorage.getItem(GOALS_KEY);

  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }

  return [];
}

export default function Goals() {
  const [goals, setGoals] = useState(getSavedGoals);
  const [modalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  function openModal() {
    setTitle("");
    setDescription("");
    setTargetDate("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function handleCreateGoal(e) {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newGoal = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      targetDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const updatedGoals = [newGoal, ...goals];

    setGoals(updatedGoals);

    localStorage.setItem(
      GOALS_KEY,
      JSON.stringify(updatedGoals)
    );

    closeModal();
  }

  function toggleGoal(id) {
    const updatedGoals = goals.map((goal) =>
      goal.id === id
        ? {
            ...goal,
            completed: !goal.completed,
          }
        : goal
    );

    setGoals(updatedGoals);

    localStorage.setItem(
      GOALS_KEY,
      JSON.stringify(updatedGoals)
    );
  }

  return (
    <div className="min-h-full bg-[#F7F5F1] text-[#252938]">
      <header className="border-b border-[#E7E3DC] bg-[#F7F5F1]/95 px-6 py-5 backdrop-blur md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#96939A]">
            Personal growth
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-[28px] font-semibold tracking-[-0.035em]">
                Goals
              </h1>

              <p className="mt-1 text-sm text-[#85828A]">
                Set meaningful goals and keep track of your progress.
              </p>
            </div>

            <button
              onClick={openModal}
              className="flex w-fit items-center gap-2 rounded-full bg-[#293148] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#20263A]"
            >
              <Plus size={15} />
              Add goal
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6 py-7 md:px-10 md:py-9">
        {goals.length === 0 ? (
          <section className="rounded-[26px] border border-[#E4E0D9] bg-white px-6 py-16 text-center shadow-[0_4px_20px_rgba(39,43,58,0.035)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0EDF9] text-[#7567C8]">
              <Target size={25} />
            </div>

            <h2 className="mt-5 text-lg font-semibold">
              No goals yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#96939D]">
              Start by creating your first goal and turn your intentions
              into something you can work towards.
            </p>

            <button
              onClick={openModal}
              className="mt-6 rounded-full bg-[#7567C8] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#6658B8]"
            >
              Create your first goal
            </button>
          </section>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {goals.map((goal) => (
              <article
                key={goal.id}
                className={`rounded-[24px] border bg-white p-5 shadow-[0_4px_20px_rgba(39,43,58,0.035)] ${
                  goal.completed
                    ? "border-[#D9D5E9]"
                    : "border-[#E4E0D9]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleGoal(goal.id)}
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                      goal.completed
                        ? "bg-[#7567C8] text-white"
                        : "bg-[#F0EDF9] text-[#7567C8] hover:bg-[#E7E2F5]"
                    }`}
                  >
                    <CheckCircle2 size={18} />
                  </button>

                  <div className="min-w-0 flex-1">
                    <h2
                      className={`text-base font-semibold ${
                        goal.completed
                          ? "text-[#96939D] line-through"
                          : "text-[#363844]"
                      }`}
                    >
                      {goal.title}
                    </h2>

                    {goal.description && (
                      <p className="mt-2 text-sm leading-5 text-[#85828A]">
                        {goal.description}
                      </p>
                    )}

                    {goal.targetDate && (
                      <div className="mt-4 flex items-center gap-2 text-xs text-[#96939D]">
                        <CalendarDays size={13} />

                        <span>
                          Target:{" "}
                          {new Date(
                            `${goal.targetDate}T00:00:00`
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C2030]/50 px-5 py-8 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="w-full max-w-lg rounded-[28px] border border-[#E4E0D9] bg-white p-6 shadow-[0_20px_60px_rgba(29,32,48,0.18)] md:p-7"
            role="dialog"
            aria-modal="true"
            aria-labelledby="goal-modal-title"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#96939D]">
                  Personal growth
                </p>

                <h2
                  id="goal-modal-title"
                  className="mt-1 text-xl font-semibold text-[#293148]"
                >
                  Create a new goal
                </h2>

                <p className="mt-1 text-xs text-[#96939D]">
                  Define something meaningful you want to achieve.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#96939D] transition hover:bg-[#F5F3EF] hover:text-[#363844]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={handleCreateGoal}
              className="mt-7 space-y-5"
            >
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#85828A]">
                  Goal title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Complete my portfolio"
                  autoFocus
                  className="mt-2 w-full rounded-xl border border-[#DDD9D2] bg-[#FCFBF9] px-4 py-3 text-sm text-[#363844] outline-none transition placeholder:text-[#B2AFA9] focus:border-[#7567C8] focus:ring-2 focus:ring-[#7567C8]/10"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#85828A]">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What do you want to accomplish?"
                  rows={4}
                  className="mt-2 w-full resize-none rounded-xl border border-[#DDD9D2] bg-[#FCFBF9] px-4 py-3 text-sm text-[#363844] outline-none transition placeholder:text-[#B2AFA9] focus:border-[#7567C8] focus:ring-2 focus:ring-[#7567C8]/10"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#85828A]">
                  Target date
                </label>

                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#DDD9D2] bg-[#FCFBF9] px-4 py-3 text-sm text-[#363844] outline-none transition focus:border-[#7567C8] focus:ring-2 focus:ring-[#7567C8]/10"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-[#DDD9D2] bg-white px-5 py-2.5 text-xs font-semibold text-[#65626A] transition hover:bg-[#F7F5F1]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-full bg-[#293148] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#20263A]"
                >
                  Create goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}