# AI Goal Journal — Frontend

React + Vite + Tailwind + React Router. Firebase Auth wired for email/password.

## Setup

```
npm install
cp .env.example .env      # fill in Swayam's Firebase config values
npm run dev
```

## Structure

```
src/
  components/   Button, Input, Card, Navbar, Sidebar, AppShell, ProtectedRoute
  context/      AuthContext (Firebase auth state, login/register/logout)
  pages/        Login, Register, Dashboard, Journal, Goals, Profile
  firebase.js   Firebase app + auth init (reads VITE_FIREBASE_* env vars)
```

## Routes

| Path | Access | Page |
|---|---|---|
| `/login` | public | Login |
| `/register` | public | Register |
| `/dashboard` | protected | Dashboard |
| `/journal` | protected | Journal (text entry, save, history) |
| `/goals` | protected | Goals |
| `/profile` | protected | Profile |

Protected routes redirect to `/login` if no Firebase session.

## Notes

- `Journal.jsx` saves entries via a mock `saveEntry()` — swap for the real API call once backend endpoint exists.
- Fill real Firebase config in `.env` (see `.env.example`); never commit real keys.
- Tailwind tokens (colors, fonts) live in `tailwind.config.js` — moss/clay/ember palette, Fraunces + Inter type.
