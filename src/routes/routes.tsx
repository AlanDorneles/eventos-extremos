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
          <Route path="/" element={<Navigate to="/produtos/radar" />} />
          <Route path="/sobre" element={<Home />} />
          <Route path="/produtos/radar" element={<Home />} />
          <Route path="/produtos/satelite" element={<Home />} />
          <Route path="/produtos/estacoes" element={<Home />} />
          <Route path="/boletins" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
