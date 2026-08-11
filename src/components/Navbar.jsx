import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('goal-journal-user');
    navigate('/login');
  }

  const savedUser = localStorage.getItem('goal-journal-user');

  let email = '';

  if (savedUser) {
    try {
      email = JSON.parse(savedUser).email || '';
    } catch {
      email = '';
    }
  }

  return (
    <header className="flex items-center justify-between border-b border-line bg-paper/95 px-6 py-4 backdrop-blur">

      <button
        onClick={() => navigate('/dashboard')}
        className="font-display text-lg font-semibold text-moss-700"
      >
        Goal Journal
      </button>

      <div className="flex items-center gap-3">

        {email && (
          <span className="hidden text-sm text-ink/70 md:block">
            {email}
          </span>
        )}

        <Button
          variant="secondary"
          onClick={handleLogout}
        >
          Log out
        </Button>

      </div>

    </header>
  );
}