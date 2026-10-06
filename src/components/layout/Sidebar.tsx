import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Sparkles,
  Library,
  Bookmark,
  GraduationCap,
  LogOut,
  BookOpen,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../context/useAuth";
import "./Sidebar.css";

function Sidebar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return null;
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <BookOpen size={30} />
          <h2>Libri</h2>
        </div>

        <button
          className="sidebar-menu-button"
          onClick={() => setIsOpen((current) => !current)}
          aria-label={isOpen ? "Menu sluiten" : "Menu openen"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav className="sidebar-navigation">
        {user.role === "student" && (
          <>
            <NavLink to="/profile" onClick={closeMenu}>
              <User size={20} />
              Leesprofiel
            </NavLink>

            <NavLink to="/advice" onClick={closeMenu}>
              <Sparkles size={20} />
              Leesadvies
            </NavLink>

            <NavLink to="/catalog" onClick={closeMenu}>
              <Library size={20} />
              Catalogus
            </NavLink>

            <NavLink to="/readinglist" onClick={closeMenu}>
              <Bookmark size={20} />
              Mijn leeslijst
            </NavLink>
          </>
        )}

        {user.role === "teacher" && (
          <NavLink to="/teacher" onClick={closeMenu}>
            <GraduationCap size={20} />
            Docent
          </NavLink>
        )}
      </nav>

      <button className="sidebar-logout" onClick={logout}>
        <LogOut size={20} />
        Uitloggen
      </button>
    </aside>
  );
}

export default Sidebar;