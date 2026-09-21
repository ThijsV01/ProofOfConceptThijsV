import { NavLink } from "react-router-dom";
import {User,Sparkles,Library,Bookmark,GraduationCap, LogOut, BookOpen} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

function Sidebar() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <BookOpen size = {30}></BookOpen>
        <h2>Libri</h2>
      </div>

      <nav className="sidebar-navigation">

        {user.role === "student" && (
          <>
            <NavLink to="/profile">
              <User size={20} />
              Reading profile
            </NavLink>
            <NavLink to="/advice">
              <Sparkles size={20} />
              Reading advice
            </NavLink>
            <NavLink to="/catalog">
              <Library size={20} />
              Catalog
            </NavLink>
            <NavLink to="/readinglist">
              <Bookmark size={20} />
              My readinglist
            </NavLink>
          </>
        )}

        {user.role === "docent" && (

          <NavLink to="/teacher">
            <GraduationCap size={20} />
            Teacher
          </NavLink>
        )}
        
      </nav>
      
       <button className="sidebar-logout" onClick={logout}>
                <LogOut size={20} />
                Log out
            </button>
    </aside>
  );
}

export default Sidebar;
