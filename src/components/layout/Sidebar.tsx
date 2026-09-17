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
            <NavLink to="/profiel">
              <User size={20} />
              Leesprofiel
            </NavLink>
            <NavLink to="/advies">
              <Sparkles size={20} />
              Leesadvies
            </NavLink>
            <NavLink to="/catalogus">
              <Library size={20} />
              Catalogus
            </NavLink>
            <NavLink to="/leeslijst">
              <Bookmark size={20} />
              Mijn leeslijst
            </NavLink>
          </>
        )}

        {user.role === "docent" && (

          <NavLink to="/docent">
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
