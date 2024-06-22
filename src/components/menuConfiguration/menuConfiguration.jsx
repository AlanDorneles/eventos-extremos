import { useShowMenuConfiguration } from "../../contexts/showMenu";

export default function MenuConfiguration() {
  const { showMenu, setShowMenu } = useShowMenuConfiguration();

  const handleShowMenu = () => {
    return setShowMenu(false);
  };

  return (
    <div id="menu-configuration" className="p-3" style={{ display: showMenu ? "" : "none" }}>
      <div className="is-flex-direction-column">
        <div className="is-flex is-justify-content-space-between is-align-content-center">
          <p className="p-2 has-text-weight-bold">Configurações</p>
          <div>
            <button
              className="button is-link is-inverted is-rounded "
              onClick={handleShowMenu}
            >
              X
            </button>
          </div>
        </div>
        <div className="mt-4 pl-3">
          <label className="checkbox">
            <input
              type="checkbox"
            />
            teste
          </label>
        </div>
      </div>
    </div>
  );
}
