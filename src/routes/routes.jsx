import { Route, Routes} from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

export const Root = () => {
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/radar" element={<Home />}/>
            <Route path="/windy" element={<Home/>}/>
            <Route path="/estacoes" element={<Home/>}/>
            <Route path="/sobre" element={<Home/>}/>
            <Route path="/boletins" element={<Home/>}/>
        </Routes>
    </BrowserRouter>
    )
}

