import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("../pages/Home"));

export const Root: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="loader-wrapper">
            <img src="/liao_loader.gif" alt="Carregando" className="loader-image" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} /> {/* REDIRECIONAMENTO */}
          <Route path="/sobre" element={<Home />} />
          <Route path="/satelite" element={<Home />} />
          <Route path="/estacoes" element={<Home />} />
          <Route path="/wrf" element={<Home />} />
          <Route path="/boletins" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
