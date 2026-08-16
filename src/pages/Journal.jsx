import {
  BookOpen,
  Plus,
  Search,
  Trash2,
  X,
  CalendarDays,
  Pencil,
} from "lucide-react";
import { useMemo, useState } from "react";

const JOURNAL_KEY = "goal-journal-entries";

function loadEntries() {
  try {
    const saved = localStorage.getItem(JOURNAL_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function Journal() {
  const [entries, setEntries] = useState(loadEntries);

  const [open, setOpen] = useState(false);
  const [viewEntry, setViewEntry] = useState(null);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  function save(updated) {
    setEntries(updated);

    try {
      localStorage.setItem(
        JOURNAL_KEY,
        JSON.stringify(updated)
      );
    } catch {
      setError("Unable to save journal entries.");
    }
  }

  function openCreate() {
    setEditingId(null);
    setTitle("");
    setContent("");
    setError("");
    setOpen(true);
  }

  function openEdit(entry) {
    setEditingId(entry.id);
    setTitle(entry.title);
    setContent(entry.content);
    setError("");
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    setEditingId(null);
    setTitle("");
    setContent("");
    setError("");
  }

  function submitEntry(e) {
    e.preventDefault();

    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    if (!cleanTitle) {
      setError("Please enter an entry title.");
      return;
    }

    if (cleanTitle.length < 3) {
      setError("Entry title must contain at least 3 characters.");
      return;
    }

    if (!cleanContent) {
      setError("Please write something in your journal.");
      return;
    }

    if (editingId) {
      const updated = entries.map((entry) =>
        entry.id === editingId
          ? {
              ...entry,
              title: cleanTitle,
              content: cleanContent,
              updatedAt: new Date().toISOString(),
            }
          : entry
      );

      save(updated);
    } else {
      const entry = {
        id:
          typeof crypto !== "undefined" &&
          crypto.randomUUID
            ? crypto.randomUUID()
            : Date.now(),

        title: cleanTitle,
        content: cleanContent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      save([entry, ...entries]);
    }

    closeModal();
  }

  function confirmDelete(id) {
    setDeleteId(id);
  }

  function cancelDelete() {
    setDeleteId(null);
  }

  function deleteEntry() {
    const updated = entries.filter(
      (entry) => entry.id !== deleteId
    );

    save(updated);
    setDeleteId(null);

    if (viewEntry?.id === deleteId) {
      setViewEntry(null);
    }
  }

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return entries;

    return entries.filter(
      (entry) =>
        entry.title.toLowerCase().includes(query) ||
        entry.content.toLowerCase().includes(query)
    );
  }, [entries, search]);

  return (
    <div className="min-h-full bg-[#120B0C] text-[#E8D8C4]">

      {/* HEADER */}

      <header className="border-b border-[#6D2932]/30 bg-[#180E10] px-6 py-6 md:px-10">
        <div className="mx-auto max-w-[1250px]">

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C7B7A3]">
            Reflection
          </p>

          <div className="mt-2 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h1 className="text-3xl font-semibold text-[#E8D8C4]">
                Journal
              </h1>

              <p className="mt-2 text-sm text-[#C7B7A3]">
                Reflect, write, and understand your journey.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreate}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#6D2932] px-5 py-3 text-sm font-semibold text-[#E8D8C4] transition hover:bg-[#561C24]"
            >
              <Plus size={16} />
              New entry
            </button>

          </div>
        </div>
      </header>

      {/* MAIN */}

      <main className="mx-auto max-w-[1250px] px-6 py-8 md:px-10">

        {/* SEARCH */}

        <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#6D2932]/30 bg-[#1B1012] px-4">

          <Search
            size={17}
            className="text-[#C7B7A3]"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your journal..."
            className="w-full bg-transparent py-3 text-sm text-[#E8D8C4] outline-none placeholder:text-[#75625D]"
          />

        </div>

        {/* EMPTY STATE */}

        {filtered.length === 0 ? (

          <div className="rounded-2xl border border-[#6D2932]/30 bg-[#1B1012] px-6 py-20 text-center">

            <BookOpen
              className="mx-auto text-[#C7B7A3]"
              size={30}
            />

            <h2 className="mt-4 text-lg font-semibold text-[#E8D8C4]">
              {search
                ? "No matching entries"
                : "No journal entries"}
            </h2>

            <p className="mt-2 text-sm text-[#C7B7A3]">
              {search
                ? "Try searching for another word or phrase."
                : "Start writing about your day, thoughts, and progress."}
            </p>

            {!search && (
              <button
                type="button"
                onClick={openCreate}
                className="mt-6 rounded-xl bg-[#6D2932] px-5 py-3 text-sm font-semibold text-[#E8D8C4] hover:bg-[#561C24]"
              >
                Create first entry
              </button>
            )}

          </div>

        ) : (

          /* ENTRIES */

          <div className="grid gap-5 md:grid-cols-2">

            {filtered.map((entry) => (

              <article
                key={entry.id}
                className="rounded-2xl border border-[#6D2932]/30 bg-[#1B1012] p-6 transition hover:border-[#6D2932]"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0">

                    <h2 className="truncate font-semibold text-[#E8D8C4]">
                      {entry.title}
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-[11px] text-[#C7B7A3]">

                      <CalendarDays size={13} />

                      {new Date(
                        entry.createdAt
                      ).toLocaleDateString("en-IN")}

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() => confirmDelete(entry.id)}
                    className="rounded-lg p-2 text-[#C7B7A3] transition hover:bg-[#561C24] hover:text-[#E8D8C4]"
                    title="Delete entry"
                  >
                    <Trash2 size={15} />
                  </button>

                </div>

                <p className="mt-5 line-clamp-4 whitespace-pre-wrap text-sm leading-7 text-[#C7B7A3]">
                  {entry.content}
                </p>

                <div className="mt-5 flex items-center gap-2 border-t border-[#6D2932]/20 pt-4">

                  <button
                    type="button"
                    onClick={() => setViewEntry(entry)}
                    className="rounded-lg border border-[#6D2932]/40 px-3 py-2 text-xs font-semibold text-[#C7B7A3] transition hover:bg-[#561C24] hover:text-[#E8D8C4]"
                  >
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => openEdit(entry)}
                    className="flex items-center gap-1.5 rounded-lg border border-[#6D2932]/40 px-3 py-2 text-xs font-semibold text-[#C7B7A3] transition hover:bg-[#561C24] hover:text-[#E8D8C4]"
                  >
                    <Pencil size={13} />
                    Edit
                  </button>

                </div>

              </article>

            ))}

          </div>

        )}

      </main>

      {/* CREATE / EDIT MODAL */}

      {open && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-5 py-8 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >

          <div className="w-full max-w-lg rounded-2xl border border-[#6D2932]/40 bg-[#1B1012] p-6 shadow-2xl">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-wider text-[#C7B7A3]">
                  Reflection
                </p>

                <h2 className="mt-2 text-xl font-semibold text-[#E8D8C4]">
                  {editingId
                    ? "Edit journal entry"
                    : "New journal entry"}
                </h2>

              </div>

              <button
                type="button"
                onClick={closeModal}
                className="text-[#C7B7A3] transition hover:text-[#E8D8C4]"
              >
                <X size={19} />
              </button>

            </div>

            <form
              onSubmit={submitEntry}
              className="mt-6 space-y-5"
            >

              <div>

                <label className="text-[10px] font-bold uppercase tracking-wider text-[#C7B7A3]">
                  Entry title
                </label>

                <input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setError("");
                  }}
                  placeholder="What is this entry about?"
                  autoFocus
                  className="mt-2 w-full rounded-xl border border-[#6D2932]/40 bg-[#120B0C] px-4 py-3 text-sm text-[#E8D8C4] outline-none placeholder:text-[#75625D] focus:border-[#6D2932]"
                />

              </div>

              <div>

                <label className="text-[10px] font-bold uppercase tracking-wider text-[#C7B7A3]">
                  Journal
                </label>

                <textarea
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    setError("");
                  }}
                  rows={8}
                  placeholder="Write your thoughts..."
                  className="mt-2 w-full resize-none rounded-xl border border-[#6D2932]/40 bg-[#120B0C] px-4 py-3 text-sm leading-6 text-[#E8D8C4] outline-none placeholder:text-[#75625D] focus:border-[#6D2932]"
                />

              </div>

              {error && (

                <div className="rounded-xl border border-[#6D2932] bg-[#561C24]/30 px-4 py-3 text-sm text-[#E8D8C4]">
                  {error}
                </div>

              )}

              <div className="flex justify-end gap-2">

                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-[#6D2932]/40 px-5 py-3 text-sm font-semibold text-[#C7B7A3] hover:bg-[#561C24]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#6D2932] px-5 py-3 text-sm font-semibold text-[#E8D8C4] hover:bg-[#561C24]"
                >
                  {editingId
                    ? "Save changes"
                    : "Save journal entry"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* VIEW MODAL */}

      {viewEntry && (

        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 px-5 py-8 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setViewEntry(null);
            }
          }}
        >

          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#6D2932]/40 bg-[#1B1012] p-6 shadow-2xl">

            <div className="flex items-start justify-between gap-5">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-wider text-[#C7B7A3]">
                  Journal entry
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-[#E8D8C4]">
                  {viewEntry.title}
                </h2>

                <div className="mt-2 flex items-center gap-2 text-xs text-[#C7B7A3]">
                  <CalendarDays size={13} />

                  {new Date(
                    viewEntry.createdAt
                  ).toLocaleDateString("en-IN")}
                </div>

              </div>

              <button
                type="button"
                onClick={() => setViewEntry(null)}
                className="text-[#C7B7A3] hover:text-[#E8D8C4]"
              >
                <X size={19} />
              </button>

            </div>

            <div className="mt-6 border-t border-[#6D2932]/30 pt-6">

              <p className="whitespace-pre-wrap text-sm leading-8 text-[#C7B7A3]">
                {viewEntry.content}
              </p>

            </div>

            <div className="mt-7 flex justify-end gap-2 border-t border-[#6D2932]/20 pt-5">

              <button
                type="button"
                onClick={() => {
                  setViewEntry(null);
                  openEdit(viewEntry);
                }}
                className="flex items-center gap-2 rounded-xl border border-[#6D2932]/40 px-4 py-2.5 text-xs font-semibold text-[#C7B7A3] hover:bg-[#561C24] hover:text-[#E8D8C4]"
              >
                <Pencil size={13} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => setViewEntry(null)}
                className="rounded-xl bg-[#6D2932] px-4 py-2.5 text-xs font-semibold text-[#E8D8C4] hover:bg-[#561C24]"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

      {/* DELETE CONFIRMATION */}

      {deleteId && (

        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl border border-[#6D2932]/40 bg-[#1B1012] p-6 shadow-2xl">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#561C24]/50">
              <Trash2 className="h-5 w-5 text-[#E8D8C4]" />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-[#E8D8C4]">
              Delete this entry?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#C7B7A3]">
              This journal entry will be permanently removed from this device.
            </p>

            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                onClick={cancelDelete}
                className="rounded-xl border border-[#6D2932]/40 px-4 py-2.5 text-sm font-medium text-[#C7B7A3] hover:bg-[#561C24]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={deleteEntry}
                className="rounded-xl bg-[#6D2932] px-4 py-2.5 text-sm font-semibold text-[#E8D8C4] hover:bg-[#561C24]"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}