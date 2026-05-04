import styles from "./styles/sobre.module.css";
import { useState } from "react";
import LiaoTab from "./tabs/LiaoTab";
import AccessesTab from "./tabs/AccessesTab";

const Sobre = () => {
  const [activeTab, setActiveTab] = useState("liao");

  return (
    <div className={styles.container}>
      {/* Tabs */}
      <div className={styles.tabsContainer} style={{ width: "100%" }}>
        <div className="tabs is-toggle is-fullwidth" style={{ marginBottom: "2rem" }}>
          <ul>
            <li className={activeTab === "liao" ? "is-active" : ""}>
              <a
                onClick={() => setActiveTab("liao")}
                style={{ cursor: "pointer" }}
              >
                <span>LIAO</span>
              </a>
            </li>
            <li className={activeTab === "acessos" ? "is-active" : ""}>
              <a
                onClick={() => setActiveTab("acessos")}
                style={{ cursor: "pointer" }}
              >
                <span>Acessos</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "liao" && <LiaoTab />}
      {activeTab === "acessos" && <AccessesTab />}
    </div>
  );
};

export default Sobre;
