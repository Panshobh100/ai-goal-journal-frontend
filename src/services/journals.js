/**
 * src/services/journals.js
 *
 * Journal API service — talks to the real FastAPI Journal endpoints:
 *
 *   GET    /journals/
 *   POST   /journals/
 *   PUT    /journals/{journal_id}
 *   DELETE /journals/{journal_id}
 *
 * Ownership (user_id) is determined by the backend from the authenticated
 * user — the frontend never sends a user_id.
 */

import { api } from "./api";

/**
 * Map a backend JournalResponse to the shape the Journal UI uses:
 *   created_at -> createdAt
 *   updated_at -> updatedAt
 */
function mapJournal(entry) {
  return {
    id: entry.id,
    title: entry.title || "",
    content: entry.content,
    createdAt: entry.created_at,
    updatedAt: entry.updated_at,
  };
}

export const JournalService = {
  async list() {
    const entries = await api.get("/journals/");
    return Array.isArray(entries) ? entries.map(mapJournal) : [];
  },

  async create({ title, content }) {
    const created = await api.post("/journals/", { title, content });
    return mapJournal(created);
  },

  async update(id, { title, content }) {
    const payload = {};
    if (title !== undefined) payload.title = title;
    if (content !== undefined) payload.content = content;
    const updated = await api.put(`/journals/${id}`, payload);
    return mapJournal(updated);
  },

  async remove(id) {
    return api.delete(`/journals/${id}`);
  },
};
