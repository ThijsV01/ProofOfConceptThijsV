import { NavLink } from "react-router-dom";
import {
    Home,
    User,
    Sparkles,
    Library,
    Bookmark,
    GraduationCap,
} from "lucide-react";

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <h2>Libri</h2>
            </div>

            <nav className="sidebar-navigation">
                <NavLink to="/">
                <Home size={20}/>
                    Home
                </NavLink>

                <NavLink to="/leesprofiel">
                <User size={20}/>
                    Leesprofiel
                </NavLink>

                <NavLink to="/advies">
                <Sparkles size={20}/>
                    Leesadvies
                </NavLink>

                <NavLink to="/catalogus">
                <Library size={20}/>
                    Catalogus
                </NavLink>

                <NavLink to="/leeslijst">
                <Bookmark size={20}/>
                    Mijn leeslijst
                </NavLink>

                <NavLink to="/docent">
                <GraduationCap size={20}/>
                    Docent
                </NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;