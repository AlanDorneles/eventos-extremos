import React, { useState, useEffect } from "react";
import styles from "./menuMap.module.css";
import { useWrfImages } from "../../contexts/wrfImages";

const IMG_EXT = ["png", "jpg", "jpeg", "gif", "webp"];

function getYesterdayFolder(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${day}`;
}

const WrfMenu: React.FC = () => {
  const [selectedOption, setSelectedOption] =
    useState<"none" | "precipitacao" | "vento_10m">("none");

  const { images, setImages, currentIndex, setCurrentIndex } = useWrfImages();

  const [rawImages, setRawImages] = useState<string[]>([]); // todas as imagens (3 dias)
  const [dayRange, setDayRange] = useState<1 | 2 | 3>(1);   // select

  const [loading, setLoading] = useState(false);

  const loadImagesFromFolder = async (type: "precipitacao" | "vento_10m") => {
    setLoading(true);

    const dateFolder = getYesterdayFolder();
    const folder = `/wrf/${type}/${dateFolder}`;

    try {
      const res = await fetch(`${folder}/index.json`);
      if (!res.ok) throw new Error("index.json não encontrado");

      const data = await res.json();

      const urls = data.files
        .filter((f: string) => {
          const ext = f.split(".").pop()?.toLowerCase();
          return ext && IMG_EXT.includes(ext);
        })
        .map((f: string) => `${folder}/${f}`);

      setRawImages(urls);        // salva todas
      setDayRange(1);            // padrão: 1 dia
      setCurrentIndex(0);

    } catch (e) {
      console.error("Erro carregando imagens:", e);
      setRawImages([]);
      setImages([]);
      setCurrentIndex(0);
    } finally {
      setLoading(false);
    }
  };

  const toggleOption = (opt: "precipitacao" | "vento_10m") => {
    const next = selectedOption === opt ? "none" : opt;
    setSelectedOption(next);

    if (next === "none") {
      setRawImages([]);
      setImages([]);
      setCurrentIndex(0);
      return;
    }

    loadImagesFromFolder(next);
  };

  useEffect(() => {
    if (rawImages.length === 0) return;

    const limit = dayRange === 1 ? 24 : dayRange === 2 ? 48 : rawImages.length;
    const cut = rawImages.slice(0, limit);

    setImages(cut);
    setCurrentIndex(0);

  }, [dayRange, rawImages, setImages, setCurrentIndex]);

  const extractHour = (file: string) => {
    const match = file.match(/_(\d{2}):00:00/);
    return match ? match[1] : "--";
  };

  return (
    <div className={styles.containerRadar}>
      <h6 className="title is-6">WRF</h6>

      <div className="field">
        <label className="checkbox" style={{ display: "block", marginBottom: 6 }}>
          <input
            type="checkbox"
            checked={selectedOption === "precipitacao"}
            onChange={() => toggleOption("precipitacao")}
          />
          &nbsp;Precipitação acumulada
        </label>

        <label className="checkbox" style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={selectedOption === "vento_10m"}
            onChange={() => toggleOption("vento_10m")}
          />
          &nbsp;Vento a 10m
        </label>

        {loading && <p>Carregando imagens...</p>}
      </div>

      {rawImages.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <label className="label">Intervalo de tempo:</label>
          <select
            className="select"
            value={dayRange}
            onChange={(e) => setDayRange(Number(e.target.value) as 1 | 2 | 3)}
          >
            <option value={1}>1 dia (24h)</option>
            <option value={2}>2 dias (48h)</option>
            <option value={3}>3 dias (completo)</option>
          </select>
        </div>
      )}

        {images.length > 0 && (
        <div
            style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 60px)",
            gap: "8px",
            marginTop: "14px",
            }}
        >
            {images.map((src, i) => {
            const hour = extractHour(src);

            const isActive = i === currentIndex;

            return (
                <div
                key={i}
                onClick={() => setCurrentIndex(i)}
                style={{
                    cursor: "pointer",
                    padding: "6px 0",
                    textAlign: "center",
                    borderRadius: "6px",
                    border: isActive ? "2px solid #3273dc" : "1px solid #ccc",
                    background: isActive ? "#dbeafe" : "#f0f0f0",
                    fontWeight: isActive ? "bold" : "normal",
                    color: isActive ? "#1d4ed8" : "#000",
                    transition: "0.2s",
                }}
                >
                {hour}h
                </div>
            );
            })}
        </div>
        )}
    </div>
  );
};

export default WrfMenu;
