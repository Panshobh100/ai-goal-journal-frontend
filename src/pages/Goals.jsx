import {
  Target,
  Plus,
  X,
  CheckCircle2,
  Trash2,
  Pencil,
  RotateCcw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { GoalService } from "../services/goals";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await GoalService.list();
        if (!cancelled) setGoals(data);
      } catch (err) {
        if (!cancelled) {
          setLoadError(
            err.message || "Failed to load goals."
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
  }, []);

  function openCreateModal() {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setFormError("");
    setModalOpen(true);
  }

  function openEditModal(goal) {
    setEditingId(goal.id);
    setTitle(goal.title);
    setDescription(goal.description || "");
    setFormError("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setTitle("");
    setDescription("");
    setFormError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle) {
      setFormError("Please enter a goal title.");
      return;
    }

    if (cleanTitle.length < 3) {
      setFormError(
        "Goal title should contain at least 3 characters."
      );
      return;
    }

    setSaving(true);
    setFormError("");

    try {
      if (editingId) {
        const updated = await GoalService.update(editingId, {
          title: cleanTitle,
          description: cleanDescription,
        });

        setGoals((prev) =>
          prev.map((goal) =>
            goal.id === editingId ? updated : goal
          )
        );
      } else {
        const created = await GoalService.create({
          title: cleanTitle,
          description: cleanDescription,
        });

        setGoals((prev) => [created, ...prev]);
      }

      closeModal();
    } catch (err) {
      setFormError(
        err.message || "Failed to save the goal."
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleCompleted(goal) {
    const nextStatus =
      goal.status === "completed" ? "active" : "completed";

    try {
      const updated = await GoalService.update(goal.id, {
        status: nextStatus,
      });

      setGoals((prev) =>
        prev.map((g) => (g.id === goal.id ? updated : g))
      );
    } catch (err) {
      setLoadError(
        err.message || "Failed to update the goal."
      );
    }
  }

  function confirmDelete(id) {
    setDeleteId(id);
  }

  function cancelDelete() {
    setDeleteId(null);
  }

  async function deleteGoal() {
    if (!deleteId) return;

    setDeleting(true);

    try {
      await GoalService.remove(deleteId);

      setGoals((prev) =>
        prev.filter((goal) => goal.id !== deleteId)
      );

      setDeleteId(null);
    } catch (err) {
      setLoadError(
        err.message || "Failed to delete the goal."
      );
      setDeleteId(null);
    } finally {
      setDeleting(false);
    }
  }

  function formatDate(date) {
    if (!date) return null;

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return null;
    }

    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(parsed);
  }

  return (
    <div className="min-h-full bg-background text-cream">

      {/* HEADER */}

      <header className="border-b border-border bg-surface px-5 py-7 md:px-8 lg:px-10">

        <div className="mx-auto max-w-[1250px]">

          <p className="section-label">
            PERSONAL GROWTH
          </p>

          <div className="mt-2 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-cream">
                Goals
              </h1>

              <p className="mt-2 text-sm text-beige/60">
                Define what matters and track your progress
                with intention.
              </p>

            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="primary-button w-fit"
            >
              <Plus size={16} />
              Add goal
            </button>

          </div>

        </div>

      </header>

      {/* MAIN */}

      <main className="mx-auto max-w-[1250px] px-5 py-7 md:px-8 lg:px-10">

        {loadError && (
          <div className="mb-5 rounded-xl border border-red-900/40 bg-red-950/20 px-4 py-3 text-sm text-red-400">
            {loadError}
          </div>
        )}

        {loading ? (

          <section className="panel px-6 py-20 text-center shadow-card">
            <p className="text-sm text-beige/55">
              Loading your goals…
            </p>
          </section>

        ) : goals.length === 0 ? (

          <section className="panel px-6 py-20 text-center shadow-card">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-wine/30 text-cream">
              <Target size={25} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-cream">
              No goals yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-beige/55">
              Start with one meaningful goal and turn your
              intention into measurable progress.
            </p>

            <button
              type="button"
              onClick={openCreateModal}
              className="mt-6 rounded-xl bg-burgundy px-5 py-3 text-xs font-semibold text-cream transition hover:bg-[#7D3540]"
            >
              Create your first goal
            </button>

          </section>

        ) : (

          <div className="grid gap-5 md:grid-cols-2">

            {goals.map((goal) => {

              const isCompleted = goal.completed;
              const progress = goal.progress;

              return (
                <article
                  key={goal.id}
                  className={`panel p-5 shadow-card transition ${
                    isCompleted
                      ? "border-burgundy/60"
                      : "hover:border-burgundy/60"
                  }`}
                >

                  {/* TITLE */}

                  <div className="flex items-start gap-4">

                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        isCompleted
                          ? "bg-burgundy text-cream"
                          : "bg-wine/30 text-beige"
                      }`}
                    >
                      <CheckCircle2 size={19} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                        <h2
                          className={`text-base font-semibold ${
                            isCompleted
                              ? "text-beige/45 line-through"
                              : "text-cream"
                          }`}
                        >
                          {goal.title}
                        </h2>

                        <span
                          className={`w-fit rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider ${
                            isCompleted
                              ? "bg-wine/40 text-beige"
                              : "bg-[#211316] text-beige/60"
                          }`}
                        >
                          {isCompleted
                            ? "Completed"
                            : "In Progress"}
                        </span>

                      </div>

                      {goal.description && (
                        <p className="mt-2 text-sm leading-6 text-beige/55">
                          {goal.description}
                        </p>
                      )}

                    </div>

                  </div>

                  {/* DATES */}

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">

                    <div className="rounded-xl border border-border bg-surface2 p-3">

                      <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-beige/40">
                        Created
                      </p>

                      <p className="mt-1 text-xs font-medium text-beige">
                        {formatDate(goal.createdAt)}
                      </p>

                    </div>

                    <div className="rounded-xl border border-border bg-surface2 p-3">

                      <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-beige/40">
                        Last updated
                      </p>

                      <p className="mt-1 text-xs font-medium text-beige">
                        {formatDate(goal.updatedAt)}
                      </p>

                    </div>

                  </div>

                  {/* PROGRESS */}

                  <div className="mt-5">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <p className="section-label">
                          PROGRESS
                        </p>

                        <span className="text-sm font-semibold text-cream">
                          {progress}%
                        </span>

                      </div>

                      {isCompleted && (
                        <span className="text-xs text-beige">
                          Completed ✓
                        </span>
                      )}

                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#382024]">

                      <div
                        className="h-full rounded-full bg-burgundy transition-all duration-300"
                        style={{
                          width: `${progress}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4">

                    <button
                      type="button"
                      onClick={() => toggleCompleted(goal)}
                      className="primary-button"
                    >
                      {isCompleted ? (
                        <>
                          <RotateCcw size={13} />
                          Reopen
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={13} />
                          Mark completed
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openEditModal(goal)
                      }
                      className="secondary-button"
                    >
                      <Pencil size={13} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        confirmDelete(goal.id)
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-red-900/40 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-950/30"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </main>

      {/* CREATE / EDIT MODAL */}

      {modalOpen && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-5 py-8 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >

          <div
            className="w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-2xl md:p-7"
            role="dialog"
            aria-modal="true"
          >

            <div className="flex items-start justify-between gap-5">

              <div>

                <p className="section-label">
                  PERSONAL GROWTH
                </p>

                <h2 className="mt-2 text-xl font-semibold text-cream">
                  {editingId
                    ? "Edit goal"
                    : "Create a new goal"}
                </h2>

                <p className="mt-1 text-xs text-beige/50">
                  Define something meaningful you want to
                  achieve.
                </p>

              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-beige/50 transition hover:bg-surface2 hover:text-cream"
              >
                <X size={18} />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >

              <div>

                <label className="section-label">
                  GOAL TITLE
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setFormError("");
                  }}
                  placeholder="e.g. Meditate every morning"
                  autoFocus
                  className="dark-input mt-2"
                />

              </div>

              <div>

                <label className="section-label">
                  DESCRIPTION
                </label>

                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setFormError("");
                  }}
                  placeholder="What do you want to accomplish?"
                  rows={4}
                  className="dark-input mt-2 resize-none"
                />

              </div>

              {formError && (
                <div className="rounded-xl border border-red-900/40 bg-red-950/20 px-4 py-3 text-sm text-red-400">
                  {formError}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">

                <button
                  type="button"
                  onClick={closeModal}
                  className="secondary-button"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="primary-button disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving…"
                    : editingId
                    ? "Save changes"
                    : "Create goal"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* DELETE MODAL */}

      {deleteId && (

        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-950/30">
              <Trash2 className="h-5 w-5 text-red-400" />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-cream">
              Delete this goal?
            </h2>

            <p className="mt-2 text-sm leading-6 text-beige/55">
              This goal will be permanently removed from
              your journal.
            </p>

            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                onClick={cancelDelete}
                className="secondary-button"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={deleteGoal}
                disabled={deleting}
                className="rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}