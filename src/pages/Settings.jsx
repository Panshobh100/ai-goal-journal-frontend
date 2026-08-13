import {
  Settings as SettingsIcon,
  Bell,
  Sparkles,
  BookOpen,
  Moon,
  Save,
  Check,
} from "lucide-react";
import { useState } from "react";

const SETTINGS_KEY = "goal-journal-settings";

const defaultSettings = {
  notifications: true,
  aiInsights: true,
  journalReminders: true,
  compactMode: false,
};

function getSettings() {
  const saved = localStorage.getItem(SETTINGS_KEY);

  if (saved) {
    try {
      return {
        ...defaultSettings,
        ...JSON.parse(saved),
      };
    } catch {
      return defaultSettings;
    }
  }

  return defaultSettings;
}

export default function Settings() {
  const [settings, setSettings] = useState(getSettings);
  const [saved, setSaved] = useState(false);

  function updateSetting(key, value) {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    setSaved(false);
  }

  function handleSave() {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <div className="min-h-full bg-[#F7F5F1] text-[#252938]">
      <header className="border-b border-[#E7E3DC] bg-[#F7F5F1]/95 px-6 py-5 backdrop-blur md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#96939A]">
            Preferences
          </p>

          <h1 className="text-[28px] font-semibold tracking-[-0.035em]">
            Settings
          </h1>

          <p className="mt-1 text-sm text-[#85828A]">
            Customize your GoalWise experience.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6 py-7 md:px-10 md:py-9">
        <div className="space-y-5">
          <section className="rounded-[26px] border border-[#E4E0D9] bg-white p-6 shadow-[0_4px_20px_rgba(39,43,58,0.035)] md:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0EDF9] text-[#7567C8]">
                <Bell size={18} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A969D]">
                  Notifications
                </p>

                <h2 className="mt-1 text-lg font-semibold">
                  Stay updated
                </h2>
              </div>
            </div>

            <div className="mt-6">
              <SettingRow
                title="Enable notifications"
                description="Receive reminders and important updates."
                enabled={settings.notifications}
                onChange={(value) =>
                  updateSetting("notifications", value)
                }
              />
            </div>
          </section>

          <section className="rounded-[26px] border border-[#E4E0D9] bg-white p-6 shadow-[0_4px_20px_rgba(39,43,58,0.035)] md:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0EDF9] text-[#7567C8]">
                <Sparkles size={18} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A969D]">
                  AI preferences
                </p>

                <h2 className="mt-1 text-lg font-semibold">
                  AI Insights
                </h2>
              </div>
            </div>

            <div className="mt-6">
              <SettingRow
                title="Enable AI insights"
                description="Allow the application to generate reflections from your activity."
                enabled={settings.aiInsights}
                onChange={(value) =>
                  updateSetting("aiInsights", value)
                }
              />
            </div>
          </section>

          <section className="rounded-[26px] border border-[#E4E0D9] bg-white p-6 shadow-[0_4px_20px_rgba(39,43,58,0.035)] md:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0EDF9] text-[#7567C8]">
                <BookOpen size={18} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A969D]">
                  Journal
                </p>

                <h2 className="mt-1 text-lg font-semibold">
                  Journal preferences
                </h2>
              </div>
            </div>

            <div className="mt-6">
              <SettingRow
                title="Journal reminders"
                description="Receive reminders to keep your daily reflection habit."
                enabled={settings.journalReminders}
                onChange={(value) =>
                  updateSetting("journalReminders", value)
                }
              />
            </div>
          </section>

          <section className="rounded-[26px] border border-[#E4E0D9] bg-white p-6 shadow-[0_4px_20px_rgba(39,43,58,0.035)] md:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0EDF9] text-[#7567C8]">
                <Moon size={18} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A969D]">
                  Interface
                </p>

                <h2 className="mt-1 text-lg font-semibold">
                  Display preferences
                </h2>
              </div>
            </div>

            <div className="mt-6">
              <SettingRow
                title="Compact mode"
                description="Use a more compact layout for application content."
                enabled={settings.compactMode}
                onChange={(value) =>
                  updateSetting("compactMode", value)
                }
              />
            </div>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            {saved && (
              <div className="flex items-center gap-2 text-xs font-medium text-[#7567C8]">
                <Check size={14} />
                Settings saved successfully.
              </div>
            )}

            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 rounded-full bg-[#293148] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#20263A]"
            >
              <Save size={14} />
              Save settings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function SettingRow({
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl border border-[#ECE8E2] bg-[#FCFBF9] p-4">
      <div>
        <h3 className="text-sm font-semibold text-[#363844]">
          {title}
        </h3>

        <p className="mt-1 max-w-xl text-xs leading-5 text-[#96939D]">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        aria-label={`Toggle ${title}`}
        aria-pressed={enabled}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-[#7567C8]" : "bg-[#D7D3CC]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}