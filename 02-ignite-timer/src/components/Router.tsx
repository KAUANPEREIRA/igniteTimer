import { Route, Routes } from "react-router-dom";
import MobileRedirect from "../helpers/MobileRedirect";
import { DefaulLayout } from "../layouts/DefaultLayout";
import { History } from "../pages/History";
import { Home } from "../pages/Home";
export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaulLayout />}>
        <Route path="/404" element={<div>Página não encontrada</div>} />
        <Route path="/" element={<MobileRedirect />} />
        <Route path="/" element={<Home />} />
        <Route path="/History" element={<History />} />
      </Route>
    </Routes>
  );
}
