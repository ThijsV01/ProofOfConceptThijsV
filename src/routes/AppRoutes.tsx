import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/guards/ProtectedRoute";
import RoleRoute from "../components/guards/RoleRoute";
import PublicRoute from "../components/guards/PublicRoute";

import AppLayout from "../components/layout/AppLayout";

import LoginPage from "../pages/Login/LoginPage";
import LandingPage from "../pages/Landing/LandingPage";
import AdvicePage from "../pages/Advice/AdvicePage";
import ProfilePage from "../pages/Profile/ProfilePage";
import CatalogPage from "../pages/Catalog/CatalogPage";
import ReadinglistPage from "../pages/Readinglist/ReadinglistPage";
import TeacherPage from "../pages/Teacher/TeacherPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>

        <Route element={<AppLayout />}>

          <Route element={<RoleRoute allowedRole="student" />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/advice" element={<AdvicePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/readinglist" element={<ReadinglistPage />} />
          </Route>

          <Route element={<RoleRoute allowedRole="docent" />}>
            <Route path="/teacher" element={<TeacherPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default AppRoutes;
