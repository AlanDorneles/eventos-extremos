import { Route, Routes} from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

export const Root = () => {
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/produtos/radar" element={<Home />}/>
            <Route path="/produtos/satelite" element={<Home/>}/>
            <Route path="/produtos/estacoes" element={<Home/>}/>
            <Route path="/boletins" element={<Home/>}/>
            <Route path="/windy" element={<Home/>}/>
            <Route path="/produtos/wrf" element={<Home/>}/>
        </Routes>
    </BrowserRouter>
    )
}

