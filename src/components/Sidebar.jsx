import {
  LayoutDashboard,
  BookOpen,
  Target,
  TrendingUp,
  Sparkles,
  UserRound,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Journal",
    icon: BookOpen,
    path: "/journal",
  },
  {
    label: "Goals",
    icon: Target,
    path: "/goals",
  },
  {
    label: "Progress",
    icon: TrendingUp,
    path: "/progress",
  },
  {
    label: "AI Insights",
    icon: Sparkles,
    path: "/insights",
  },
];

const secondaryItems = [
  {
    label: "Profile",
    icon: UserRound,
    path: "/profile",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  const currentPath = window.location.pathname;

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col bg-[#293148] text-white">

      {/* =====================================================
          LOGO
      ===================================================== */}

      <div className="flex h-[88px] items-center px-7">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7567C8] shadow-[0_4px_15px_rgba(117,103,200,0.3)]">

            <Sparkles
              size={17}
              className="text-white"
              strokeWidth={1.8}
            />

          </div>

          <div>
            <h1 className="text-[17px] font-semibold tracking-[-0.02em]">
              GoalWise
            </h1>

            <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-white/35">
              Personal growth
            </p>
          </div>

        </div>

      </div>


      {/* =====================================================
          MAIN NAVIGATION
      ===================================================== */}

      <div className="px-4">

        <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
          Workspace
        </p>

        <nav className="space-y-1">

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPath === item.path;

            return (
              <NavItem
                key={item.label}
                item={item}
                Icon={Icon}
                active={active}
              />
            );
          })}

        </nav>

      </div>


      {/* =====================================================
          DIVIDER
      ===================================================== */}

      <div className="mx-7 my-7 h-px bg-white/[0.07]" />


      {/* =====================================================
          PERSONAL
      ===================================================== */}

      <div className="px-4">

        <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
          Personal
        </p>

        <nav className="space-y-1">

          {secondaryItems.map((item) => {
            const Icon = item.icon;
            const active = currentPath === item.path;

            return (
              <NavItem
                key={item.label}
                item={item}
                Icon={Icon}
                active={active}
              />
            );
          })}

        </nav>

      </div>


      {/* =====================================================
          BOTTOM PROFILE
      ===================================================== */}

      <div className="mt-auto px-4 pb-5">

        <div className="mb-4 h-px bg-white/[0.07]" />

        <div className="group flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-white/[0.05]">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7567C8] text-xs font-semibold">
            S
          </div>

          <div className="min-w-0 flex-1">

            <p className="truncate text-xs font-semibold text-white/90">
              Suhani
            </p>

            <p className="mt-0.5 truncate text-[10px] text-white/35">
              Personal account
            </p>

          </div>

          <button className="text-white/25 transition group-hover:text-white/50">
            <LogOut size={15} />
          </button>

        </div>

      </div>

    </aside>
  );
}


/* =============================================================
   NAV ITEM
============================================================= */

function NavItem({ item, Icon, active }) {
  return (
    <a
      href={item.path}
      className={`group relative flex h-11 items-center gap-3 rounded-xl px-3.5 text-xs font-medium transition-all duration-200 ${
        active
          ? "bg-white/[0.10] text-white"
          : "text-white/45 hover:bg-white/[0.05] hover:text-white/80"
      }`}
    >

      {/* Active indicator */}
      {active && (
        <span className="absolute left-0 h-5 w-[2px] rounded-r-full bg-[#BFB5F1]" />
      )}

      <Icon
        size={17}
        strokeWidth={active ? 2 : 1.7}
        className={`transition ${
          active
            ? "text-[#C8BDF5]"
            : "text-white/40 group-hover:text-white/70"
        }`}
      />

      <span className="flex-1">
        {item.label}
      </span>

      {active && (
        <ChevronRight
          size={13}
          className="text-white/25"
        />
      )}

    </a>
  );
}