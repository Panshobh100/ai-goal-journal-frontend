import Sidebar from './Sidebar';

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-paper">
      <Sidebar />

      <main className="ml-[250px] min-h-screen">
        <div className="mx-auto w-full max-w-[1440px] px-8 py-8 lg:px-10">
          {children}
        </div>
      </main>
    </div>
  );
}