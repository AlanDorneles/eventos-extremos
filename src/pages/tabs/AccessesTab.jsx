import { useState, useEffect } from "react";
import styles from "../styles/sobre.module.css";

const API_URL = import.meta.env.VITE_API_URL;

const AccessesTab = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("total"); // "mes", "ano", "total"
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    fetchAccessStats();
  }, [filterType, selectedMonth, selectedYear]);

  const fetchAccessStats = async () => {
    try {
      setLoading(true);
      let url = `${API_URL}/access-stats`;

      if (filterType === "mes") {
        url += `?month=${selectedMonth}`;
      } else if (filterType === "ano") {
        url += `?year=${selectedYear}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Erro ao carregar estatísticas de acesso");
      }

      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar estatísticas:", err);
      setError(err.message);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  const getMonthLabel = () => {
    const [year, month] = selectedMonth.split("-");
    const date = new Date(year, parseInt(month) - 1);
    return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.initText} ${styles.surfaceCard}`}>
        <h2 className="title is-6">ESTATÍSTICAS DE ACESSOS</h2>

        {/* Abas de Filtro */}
        <div className={styles.filterTabs} style={{ marginBottom: "2rem" }}>
          <button
            className={`button is-small ${filterType === "total" ? "is-primary" : "is-light"}`}
            onClick={() => setFilterType("total")}
            style={{ marginRight: "0.5rem" }}
          >
            Total
          </button>
          <button
            className={`button is-small ${filterType === "ano" ? "is-primary" : "is-light"}`}
            onClick={() => setFilterType("ano")}
            style={{ marginRight: "0.5rem" }}
          >
            Ano
          </button>
          <button
            className={`button is-small ${filterType === "mes" ? "is-primary" : "is-light"}`}
            onClick={() => setFilterType("mes")}
          >
            Mês
          </button>
        </div>

        {/* Seletores de Mês e Ano */}
        {filterType === "mes" && (
          <div style={{ marginBottom: "2rem" }}>
            <label htmlFor="monthSelector" style={{ marginRight: "1rem" }}>
              Selecionar Mês:
            </label>
            <input
              id="monthSelector"
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="input"
              style={{ maxWidth: "200px" }}
            />
          </div>
        )}

        {filterType === "ano" && (
          <div style={{ marginBottom: "2rem" }}>
            <label htmlFor="yearSelector" style={{ marginRight: "1rem" }}>
              Selecionar Ano:
            </label>
            <input
              id="yearSelector"
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              min="2020"
              max={new Date().getFullYear()}
              className="input"
              style={{ maxWidth: "150px" }}
            />
          </div>
        )}

        {loading && (
          <div className="has-text-centered">
            <p>Carregando estatísticas...</p>
          </div>
        )}

        {error && (
          <div className="notification is-danger" style={{ marginBottom: "2rem" }}>
            <button
              className="delete"
              onClick={() => setError(null)}
              aria-label="Fechar notificação"
            />
            <p>{error}</p>
          </div>
        )}

        {stats && !loading && (
          <>
            {/* Resumo Geral */}
            <div className={styles.statsGrid} style={{ marginBottom: "3rem" }}>
              <div className={styles.statCard}>
                <p className={styles.statLabel}>Acessos</p>
                <p className={styles.statValue}>{stats.totalUniqueIPs}</p>
              </div>
              <div className={styles.statCard}>
                <p className={styles.statLabel}>Países</p>
                <p className={styles.statValue}>{stats.totalCountries}</p>
              </div>
              <div className={styles.statCard}>
                <p className={styles.statLabel}>Período</p>
                <p className={styles.statValue} style={{ fontSize: "0.85rem" }}>
                  {filterType === "total" && "Total de Acessos"}
                  {filterType === "ano" && `Ano ${selectedYear}`}
                  {filterType === "mes" && getMonthLabel()}
                </p>
              </div>
            </div>

            {/* Top Países */}
            <div className={styles.section}>
              <h3 className="title is-6">Acessos por País</h3>
              {Object.entries(stats.countryStats).length > 0 ? (
                <div className={styles.countryList}>
                  {Object.entries(stats.countryStats)
                    .sort(([, a], [, b]) => b.count - a.count)
                    .map(([code, data]) => (
                      <div key={code} className={styles.countryItem}>
                        <div className={styles.countryInfo}>
                          <span className={styles.countryCode}>{code}</span>
                          <span className={styles.countryName}>{data.name}</span>
                        </div>
                        <div className={styles.countryCount}>
                          <span>{data.count}</span>
                          <div className={styles.progressBar}>
                            <div
                              className={styles.progressFill}
                              style={{
                                width: `${
                                  (data.count / Math.max(...Object.values(stats.countryStats).map(c => c.count))) * 100
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p style={{ fontStyle: "italic", color: "#666" }}>
                  Nenhum acesso registrado para este período.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccessesTab;
