import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";


export const Root: React.FC = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/produtos/radar" />} />
        <Route path="/sobre" element={<Home />} />
        <Route path="/produtos/radar" element={<Home />} />
        <Route path="/produtos/satelite" element={<Home />} />
        <Route path="/produtos/estacoes" element={<Home />} />
        <Route path="/boletins" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
