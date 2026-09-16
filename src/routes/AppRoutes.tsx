import { Routes, Route } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

import HomePage from "../pages/Home/HomePage";
import LeesprofielPage from "../pages/Leesprofiel/LeesprofielPage";
import AdviesPage from "../pages/Advies/AdviesPage";
import CatalogusPage from "../pages/Catalogus/CatalogusPage";
import LeeslijstPage from "../pages/Leeslijst/LeeslijstPage";
import DocentPage from "../pages/Docent/DocentPage";

function AppRoutes() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/leesprofiel" element={<LeesprofielPage />} />
                <Route path="/advies" element={<AdviesPage />} />
                <Route path="/catalogus" element={<CatalogusPage />} />
                <Route path="/leeslijst" element={<LeeslijstPage />} />
                <Route path="/docent" element={<DocentPage />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;