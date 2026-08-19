import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, checkingAuth } = useAuth();

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#561C24] text-[#E8D8C4]">
        <div className="text-center">

          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#6D2932] bg-[#32151A] shadow-[0_12px_35px_rgba(25,7,10,0.28)]">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#C7B7A3]/30 border-t-[#E8D8C4]" />
          </div>

          <p className="text-sm font-medium text-[#E8D8C4]">
            Preparing your journal...
          </p>

          <p className="mt-1 text-xs text-[#C7B7A3]/70">
            Just a moment
          </p>

        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}