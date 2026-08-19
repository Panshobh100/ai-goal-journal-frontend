/**
 * src/services/users.js
 *
 * User API service — talks to the real FastAPI User endpoints:
 *
 *   GET    /users/me
 *   PUT    /users/me
 *   PUT    /users/me/preferences
 *
 * The backend derives the current user from the authenticated session
 * (dev fallback UID applies when no Authorization header is sent).
 */

import { api } from "./api";

/**
 * Map a backend UserResponse to the shape the Profile UI uses:
 *   created_at -> createdAt
 */
function mapUser(user) {
  return {
    id: user.id,
    firebaseUid: user.firebase_uid,
    email: user.email,
    displayName: user.display_name || "",
    profession: user.profession || "",
    bio: user.bio || "",
    timezone: user.timezone || "",
    preferences: user.preferences || {},
    createdAt: user.created_at,
  };
}

export const UserService = {
  async getMe() {
    const user = await api.get("/users/me");
    return mapUser(user);
  },

  async updateMe({ displayName, profession, bio, timezone }) {
    const payload = {};
    if (displayName !== undefined) payload.display_name = displayName;
    if (profession !== undefined) payload.profession = profession;
    if (bio !== undefined) payload.bio = bio;
    if (timezone !== undefined) payload.timezone = timezone;
    const updated = await api.put("/users/me", payload);
    return mapUser(updated);
  },

  async updatePreferences(preferences) {
    const updated = await api.put("/users/me/preferences", { preferences });
    return mapUser(updated);
  },
};