import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/guards/ProtectedRoute";
import RoleRoute from "../components/guards/RoleRoute";
import PublicRoute from "../components/guards/PublicRoute";

import AppLayout from "../components/layout/AppLayout";

import LoginPage from "../pages/Login/LoginPage";
import LandingPage from "../pages/Landing/LandingPage";
import AdviesPage from "../pages/Advies/AdviesPage";
import ProfielPage from "../pages/Profiel/ProfielPage";
import CatalogusPage from "../pages/Catalogus/CatalogusPage";
import LeeslijstPage from "../pages/Leeslijst/LeeslijstPage";
import DocentPage from "../pages/Docent/DocentPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>

        {/* Publieke pagina's */}

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Alles hieronder vereist een ingelogde gebruiker */}

      <Route element={<ProtectedRoute />}>

        {/* Layout met Sidebar + Topbar */}

        <Route element={<AppLayout />}>

          {/* Student pagina's */}

          <Route element={<RoleRoute allowedRole="student" />}>
            <Route path="/profiel" element={<ProfielPage />} />
            <Route path="/advies" element={<AdviesPage />} />
            <Route path="/catalogus" element={<CatalogusPage />} />
            <Route path="/leeslijst" element={<LeeslijstPage />} />
          </Route>

          {/* Docent pagina */}

          <Route element={<RoleRoute allowedRole="docent" />}>
            <Route path="/docent" element={<DocentPage />} />
          </Route>
        </Route>
      </Route>

      {/* 404 */}

      <Route path="/404" element={<NotFoundPage />} />

      {/* Alles wat niet bestaat → 404 */}

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default AppRoutes;
