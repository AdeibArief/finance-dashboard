import useStore from "../../store/useStore";

const Navbar = ({
  theme,
  toggleTheme,
  activePage,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const role = useStore((state) => state.role);
  const setRole = useStore((state) => state.setRole);

  return (
    <header className="h-16 bg-base-100 border-b border-base-100 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="btn btn-ghost btn-sm lg:hidden"
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>
      <h1 className="text-lg font-semibold">{activePage}</h1>
      </div>
      <div className="flex items-center gap-4">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="select select-bordered select-sm"
        >
          <option value="viewer">👁️ Viewer</option>
          <option value="admin">⚙️ Admin</option>
        </select>
        <button
          className="btn btn-ghost btn-sm gap-2 rounded-full w-10"
          onClick={toggleTheme}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <span className="text-sm text-base-content/60">Shaik Adeib</span>
        <div className="avatar placeholder">
          <div className="bg-primary text-primary-content rounded-full w-9 flex items-center justify-center">
            <span className="text-sm">SA</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
