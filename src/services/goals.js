/**
 * src/services/goals.js
 *
 * Goal API service — talks to the real FastAPI Goal endpoints:
 *
 *   GET    /goals/
 *   POST   /goals/
 *   PUT    /goals/{goal_id}
 *   DELETE /goals/{goal_id}
 *
 * The backend GoalResponse only supports:
 *   id, user_id, title, description, status, created_at, updated_at
 *
 * It does NOT support targetDate / progress / completed, so those fields
 * are never sent to the backend.
 */

import { api } from "./api";

/**
 * Map a backend GoalResponse to the shape the Goals UI uses.
 * The UI derives its progress display from `status` because the backend
 * does not store a numeric progress value.
 */
function mapGoal(goal) {
  const completed = goal.status === "completed";

  return {
    id: goal.id,
    title: goal.title,
    description: goal.description || "",
    status: goal.status,
    createdAt: goal.created_at,
    updatedAt: goal.updated_at,
    // Derived display-only values (not stored in the backend).
    completed,
    progress: completed ? 100 : 0,
  };
}

export const GoalService = {
  async list() {
    const goals = await api.get("/goals/");
    return Array.isArray(goals) ? goals.map(mapGoal) : [];
  },

  async create({ title, description }) {
    const payload = { title };
    if (description) {
      payload.description = description;
    }
    const created = await api.post("/goals/", payload);
    return mapGoal(created);
  },

  async update(id, { title, description, status }) {
    const payload = {};
    if (title !== undefined) payload.title = title;
    if (description !== undefined) payload.description = description;
    if (status !== undefined) payload.status = status;
    const updated = await api.put(`/goals/${id}`, payload);
    return mapGoal(updated);
  },

  async remove(id) {
    return api.delete(`/goals/${id}`);
  },
};
