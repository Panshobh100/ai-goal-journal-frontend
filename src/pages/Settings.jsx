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

const defaults = {
  notifications: true,
  aiInsights: true,
  journalReminders: true,
  compactMode: false,
};

function getSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);

    return saved
      ? { ...defaults, ...JSON.parse(saved) }
      : defaults;
  } catch {
    return defaults;
  }
}

export default function Settings() {
  const [settings, setSettings] = useState(getSettings);
  const [saved, setSaved] = useState(false);

  function update(key) {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));

    setSaved(false);
  }

  function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setSaved(true);

    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-full bg-[#120B0C] text-[#E8D8C4]">
      <header className="border-b border-[#6D2932]/30 bg-[#180E10] px-6 py-6 md:px-10">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C7B7A3]">
            Preferences
          </p>

          <div className="mt-2 flex items-center gap-3">
            <SettingsIcon size={23} className="text-[#C7B7A3]" />

            <h1 className="text-3xl font-semibold">
              Settings
            </h1>
          </div>

          <p className="mt-2 text-sm text-[#C7B7A3]">
            Customize how Goal Journal works for you.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1000px] px-6 py-8 md:px-10">
        <div className="space-y-5">
          <SettingSection
            icon={Bell}
            title="Notifications"
            description="Stay updated with reminders."
          >
            <SettingRow
              title="Enable notifications"
              description="Receive important reminders and updates."
              enabled={settings.notifications}
              onChange={() => update("notifications")}
            />
          </SettingSection>

          <SettingSection
            icon={Sparkles}
            title="AI preferences"
            description="Control personalized AI insights."
          >
            <SettingRow
              title="Enable AI insights"
              description="Generate reflections based on your activity."
              enabled={settings.aiInsights}
              onChange={() => update("aiInsights")}
            />
          </SettingSection>

          <SettingSection
            icon={BookOpen}
            title="Journal"
            description="Manage your reflection experience."
          >
            <SettingRow
              title="Journal reminders"
              description="Receive reminders to maintain your journaling habit."
              enabled={settings.journalReminders}
              onChange={() => update("journalReminders")}
            />
          </SettingSection>

          <SettingSection
            icon={Moon}
            title="Interface"
            description="Adjust the application layout."
          >
            <SettingRow
              title="Compact mode"
              description="Use a more condensed content layout."
              enabled={settings.compactMode}
              onChange={() => update("compactMode")}
            />
          </SettingSection>

          <div className="flex justify-end gap-4 pt-2">
            {saved && (
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C7B7A3]">
                <Check size={14} />
                Settings saved
              </div>
            )}

            <button
              onClick={saveSettings}
              className="flex items-center gap-2 rounded-xl bg-[#6D2932] px-5 py-3 text-xs font-semibold text-[#E8D8C4] hover:bg-[#561C24]"
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

function SettingSection({ icon: Icon, title, description, children }) {
  return (
    <section className="rounded-2xl border border-[#6D2932]/30 bg-[#1B1012] p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#561C24] text-[#C7B7A3]">
          <Icon size={19} />
        </div>

        <div>
          <h2 className="font-semibold text-[#E8D8C4]">
            {title}
          </h2>

          <p className="mt-1 text-xs text-[#C7B7A3]">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-6">
        {children}
      </div>
    </section>
  );
}

function SettingRow({
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-xl border border-[#6D2932]/20 bg-[#150C0E] p-4">
      <div>
        <h3 className="text-sm font-semibold text-[#E8D8C4]">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-[#C7B7A3]">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        aria-pressed={enabled}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-[#6D2932]" : "bg-[#3A2023]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-[#E8D8C4] transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}