import { Route, Routes} from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
//import Login from "../pages/Login.tsx";
import ProtectedRoute from "../auth/authentication";
//import RequestAccess from "../pages/RequestAccess.jsx";
import HubLogin from "../pages/HubLogin.tsx";

export const Root = () => {

    return(
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<HubLogin />} />
          <Route
            path="/"
            element={<ProtectedRoute element={<Home />} />}
          />
          <Route
            path="/produtos/radar"
            element={<ProtectedRoute element={<Home />} />}
          />
          <Route
            path="/produtos/satelite"
            element={<ProtectedRoute element={<Home />} />}
          />
          <Route
            path="/produtos/estacoes"
            element={<ProtectedRoute element={<Home />} />}
          />
          <Route
            path="/boletins"
            element={<ProtectedRoute element={<Home />} />}
          />
          <Route
            path="/windy"
            element={<ProtectedRoute element={<Home />} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Home />} />}
          />
        </Routes>
      </BrowserRouter>
    )
}

