import { Route, Routes} from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

export const Root = () => {
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/satelite" element={<Home/>}/>
        </Routes>
    </BrowserRouter>
    )
}

