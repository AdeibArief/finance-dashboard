import { Eye, Moon, Settings, Sun } from "lucide-react";
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
      <div className="flex items-center gap-3">
        {/* <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="select select-bordered select-xs lg:select-sm"
        >
          <option value="viewer">👁️ Viewer</option>
          <option value="admin">⚙️ Admin</option>
        </select> */}

        <button
          className="btn btn-ghost btn-sm gap-1 w-fit"
          onClick={() => setRole(role === "viewer" ? "admin" : "viewer")}
        >
          {role === "viewer" ? (
            <>
              <Eye size={18} />
            </>
          ) : (
            <Settings size={18} />
          )}

          <span className="hidden lg:block text-sm">
            {role === "viewer" ? "Viewer" : "Admin"}
          </span>
        </button>
        <button
          className="btn btn-ghost btn-sm gap-2 rounded-full w-13"
          onClick={toggleTheme}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <span className="text-sm text-base-content/60 hidden lg:block">
          Shaik Adeib
        </span>
        <div className="avatar placeholder">
          <div className="bg-primary text-primary-content rounded-full w-9 flex items-center justify-center ">
            <span className="text-sm">SA</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
