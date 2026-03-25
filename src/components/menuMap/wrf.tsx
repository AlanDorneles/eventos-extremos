import { useEffect, useMemo, useState, useCallback } from "react";
import styles from "./menuMap.module.css";
import { useWrfImages } from "../../contexts/wrfImages";
import "bulma/css/bulma.min.css";

const WrfMenu: React.FC = () => {
  // controla apenas se o menu está “ativo”/mostrando seleção (não mexe no Context)
  const [enabled, setEnabled] = useState(true);

  const {
    visibleImages,
    currentIndex,
    setCurrentIndex,
    variable,
    setVariable,
    fetchWrfImages,
    loading,
    error,
    latestFolder,
    rangeHours,
    setRangeHours,
    // se você tiver imagesAll no context, pode usar para otimizar fetch:
    // imagesAll,
  } = useWrfImages();

  // Seleciona uma variável de forma consistente e dispara fetch
  const selectVar = useCallback(
    (v: "VENTO_10M" | "PRECIPITACAO" | "VENTO_LEVELS_200hPa" | "VENTO_LEVELS_500hPa" | "UMIDADE_2M") => {
      setEnabled(true);
      setVariable(v);
      setRangeHours(24);     // padrão: 24h ao trocar variável
      setCurrentIndex(0);
      fetchWrfImages(v);     // menu controla a troca
    },
    [setVariable, setRangeHours, setCurrentIndex, fetchWrfImages]
  );

  // Se o menu estiver enabled mas ainda não tiver imagens, pode carregar uma vez
  // (opcional, útil quando abre a página e o menu já está enabled)
  useEffect(() => {
    if (!enabled) return;
    // se você quiser evitar refetch sempre ao montar:
    // if (imagesAll.length > 0) return;
    fetchWrfImages(variable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // carrega 1x ao montar (se você quiser)

  // Extrai hora do nome (URLs podem ter ":" codificado como %3A)
  const extractHour = (url: string) => {
    const m1 = url.match(/_(\d{2})%3A00%3A00/i);
    if (m1) return m1[1];
    const m2 = url.match(/_(\d{2}):00:00/i);
    if (m2) return m2[1];
    return "--";
  };

  // Agrupa botões em blocos de 24 horas
  const groups = useMemo(() => {
    const n = visibleImages.length;
    const rows = Math.ceil(n / 24);
    return Array.from({ length: rows }, (_, rowIdx) => {
      const start = rowIdx * 24;
      const end = Math.min(start + 24, n);
      return { rowIdx, start, slice: visibleImages.slice(start, end) };
    });
  }, [visibleImages]);

  // Deriva “checks” do estado global (Context), sem estado paralelo
  const checkedVento = enabled && variable === "VENTO_10M";
  const checkedPrecip = enabled && variable === "PRECIPITACAO";
  const checkedVento200 = enabled && variable === "VENTO_LEVELS_200hPa";
  const checkedVento500 = enabled && variable === "VENTO_LEVELS_500hPa";
  const checkedUmidade2M = enabled && variable === "UMIDADE_2M";

  // Toggle: se clicar no que já está ativo, apenas “desabilita” (oculta)
  const toggle = (target: "VENTO_10M" | "PRECIPITACAO" | "VENTO_LEVELS_200hPa" | "VENTO_LEVELS_500hPa" | "UMIDADE_2M") => {
    if (!enabled) {
      selectVar(target);
      return;
    }

    if (variable === target) {
      // desmarca -> apenas oculta o menu (não altera o state global)
      setEnabled(false);
      return;
    }

    // troca de variável
    selectVar(target);
  };

  return (
    <div className={styles.containerRadar}>
      <h6 className="title is-6">WRF</h6>

      <div className="field">
        <label className="checkbox" style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={checkedVento}
            onChange={() => toggle("VENTO_10M")}
            disabled={loading}
          />
          &nbsp;Vento a 10m
        </label>

        <label className="checkbox" style={{ display: "block", marginTop: 6 }}>
          <input
            type="checkbox"
            checked={checkedPrecip}
            onChange={() => toggle("PRECIPITACAO")}
            disabled={loading}
          />
          &nbsp;Precipitação acumulada
        </label>

        <label className="checkbox" style={{ display: "block", marginTop: 6 }}>
          <input
            type="checkbox"
            checked={checkedVento200}
            onChange={() => toggle("VENTO_LEVELS_200hPa")}
            disabled={loading}
          />
          &nbsp;Vento a 200hPa
        </label>

        <label className="checkbox" style={{ display: "block", marginTop: 6 }}>
          <input
            type="checkbox"
            checked={checkedVento500}
            onChange={() => toggle("VENTO_LEVELS_500hPa")}
            disabled={loading}
          />
          &nbsp;Vento a 500hPa
        </label>

	<label className="checkbox" style={{ display: "block", marginTop: 6 }}>
          <input
            type="checkbox"
            checked={checkedUmidade2M}
            onChange={() => toggle("UMIDADE_2M")}
            disabled={loading}
          />
          &nbsp;Umidade a 2 metros
        </label>

        {loading && <p>Carregando imagens...</p>}
        {error && (
          <p className="help is-danger" style={{ marginTop: 8 }}>
            {error}
          </p>
        )}
      </div>

      {/* Só mostra controles se estiver enabled */}
      {enabled && (
        <>
          <div style={{ marginBottom: 10 }}>
            <div className="tags are-small">
              <span className="tag is-dark">
                Variável: <b style={{ marginLeft: 6 }}>{variable}</b>
              </span>
              <span className="tag is-dark">
                Pasta: <b style={{ marginLeft: 6 }}>{latestFolder ?? "—"}</b>
              </span>
            </div>

            <label className="label" style={{ marginBottom: 6 }}>
              Intervalo de tempo:
            </label>

            <div className="select is-primary is-small">
              <select
                value={rangeHours}
                onChange={(e) => setRangeHours(Number(e.target.value) as any)}
                disabled={visibleImages.length === 0 || loading}
              >
                <option value={24}>1 dia (24h)</option>
                <option value={48}>2 dias (48h)</option>
                <option value={9999}>3 dias (completo)</option>
              </select>
            </div>
          </div>

          {visibleImages.length > 0 && (
            <div style={{ marginTop: 14 }}>
              {groups.map(({ rowIdx, start, slice }) => (
                <div key={rowIdx}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, 60px)",
                      gap: 8,
                    }}
                  >
                    {slice.map((src, i) => {
                      const idx = start + i;
                      const hour = extractHour(src);
                      const isActive = idx === currentIndex;

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCurrentIndex(idx)}
                          className={
                            "button is-small" +
                            (isActive ? " is-primary" : " is-primary is-outlined")
                          }
                          aria-pressed={isActive}
                          disabled={loading}
                        >
                          {hour}h
                        </button>
                      );
                    })}
                  </div>

                  {rowIdx < groups.length - 1 && (
                    <div
                      style={{
                        height: 1,
                        background: "rgba(0,0,0,0.12)",
                        margin: "12px 0",
                      }}
                      aria-hidden
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WrfMenu;
