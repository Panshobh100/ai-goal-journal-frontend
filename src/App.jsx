import { Navigate, Route, Routes } from 'react-router-dom';

import AppShell from './components/AppShell';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Insights from './pages/Insights';
import Journal from './pages/Journal';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Progress from './pages/Progress';
import Register from './pages/Register';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

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
        path="/progress"
        element={
          <AppShell>
            <Progress />
          </AppShell>
        }
      />

      <Route
        path="/insights"
        element={
          <AppShell>
            <Insights />
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

      <Route
        path="/settings"
        element={
          <AppShell>
            <Settings />
          </AppShell>
        }
      />

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}