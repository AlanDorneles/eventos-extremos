import React, { useState } from "react";
import Login from "./Login";
import RequestAccess from "./RequestAccess";
import RecoveryPassword from "./RecoveryPassword";

export default function HubLogin() {
  type StateLogin = "login" | "requestAccess" | "recoveryPassword";
  const [actionLogin, setActionLogin] = useState<StateLogin>("login");
  const [activeTab, setActiveTab] = useState<boolean[]>([true,false,false])

  const handleTabClick = (tab: StateLogin, index: number) => {
    setActionLogin(tab);
    const updatedTabs = [false, false, false];
    updatedTabs[index] = true;
    setActiveTab(updatedTabs);
  };

  const renderForm = () => {
    switch (actionLogin) {
      case "login":
        return <Login />;
      case "requestAccess":
     return <RequestAccess />;
      case "recoveryPassword":
        return <RecoveryPassword />;
      default:
        return "login";
    }
  };

  return (
    <main style={{ display: "flex", flexDirection: "row", height: "100vh"}}>
      <section
        style={{
          flex: 1,
          background: "url(/cover.png) no-repeat center center",
          backgroundSize: "cover",
        }}
      >
        {/* Place your illustration here */}
      </section>
      <div className="p-5" style={{height:"100vh",maxHeight:"100vh", overflowY:"auto"}}>
        <div className="tabs is-centered">
          <ul>
            <li onClick={() => {setActionLogin("login"), handleTabClick("login", 0)}} className={activeTab[0] ? "is-active" : ""}>
              <a>Login</a>
            </li>
            <li onClick={() => {setActionLogin("requestAccess"),handleTabClick("requestAccess", 1)}} className={activeTab[1] ? "is-active" : ""}>
              <a>Pedir acesso</a>
            </li>
            <li onClick={() => {setActionLogin("recoveryPassword"),handleTabClick("recoveryPassword", 2)}} className={activeTab[2] ? "is-active" : ""}>
              <a>Recuperar senha</a>
            </li>
          </ul>
        </div>
        <div className="is-flex is-justify-content-space-evenly">
            <figure className="image is-48x48">
                <img src="/logo_IO_stexto.png" />
            </figure>
            <figure className="image is-48x48">
                <img src="/logo_furg_stexto.png" />
            </figure>
        </div>
        {/* Renderiza o formulário correspondente ao estado atual */}
        {renderForm()}
      </div>
    </main>
  );
}
