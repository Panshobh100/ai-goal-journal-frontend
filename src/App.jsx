import { Navigate, Route, Routes } from 'react-router-dom';

import AppShell from './components/AppShell';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Journal from './pages/Journal';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

export default function App() {
  return (
    <Routes>
      {/* Login and Register */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Main application pages */}
      <Route
        path="/dashboard"
        element={
          <AppShell>
            <Dashboard />
          </AppShell>
        }
      />

      <Route
        path="/journal"
        element={
          <AppShell>
            <Journal />
          </AppShell>
        }
      />

      <Route
        path="/goals"
        element={
          <AppShell>
            <Goals />
          </AppShell>
        }
      />

      <Route
        path="/profile"
        element={
          <AppShell>
            <Profile />
          </AppShell>
        }
      />

      {/* Default page */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Unknown URL */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}