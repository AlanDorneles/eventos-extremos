import "./App.css";
import "../node_modules/bulma/css/bulma.min.css";
import MenuPrincipal from "./components/menuPrincipal/menuPrincipal";
import "./sass/navbar.scss"
import { Root } from "./routes/routes";
import MenuConfiguration from "./components/menuConfiguration/menuConfiguration";
import { useMenuContext } from "./contexts/MenuContext";

function Container() {

const {showMenu} = useMenuContext()
    
    return(
      <>
          <MenuPrincipal  id="menu" />
          <Root />
          <MenuConfiguration style={{display: showMenu ? '' : 'none' }}/>   
          </>
    ) 

}
export default Container;
