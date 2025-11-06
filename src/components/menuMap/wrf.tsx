import React, { useEffect, useState } from "react";
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

    const { setImages } = useWrfImages();
    const [loading, setLoading] = useState(false);

    const loadImagesFromFolder = async (type: "precipitacao" | "vento_10m") => {
        const dateFolder = getYesterdayFolder();
        const folder = `/wrf/${type}/${dateFolder}`;

        console.log("%c[WRF MENU] =======================", "color: #33cc33");
        console.log("%c[WRF MENU] Tipo selecionado:", "color: #33cc33", type);
        console.log("%c[WRF MENU] Pasta de data:", "color: #33cc33", dateFolder);
        console.log("%c[WRF MENU] Caminho completo:", "color: #33cc33", folder);

        setLoading(true);

        try {
            console.log("%c[WRF MENU] Fazendo fetch para:", "color: #1e90ff", `${folder}/index.json`);
            const res = await fetch(`${folder}/index.json`);

            console.log("%c[WRF MENU] resposta do fetch:", "color: #1e90ff", res.status, res.ok);

            if (!res.ok) throw new Error("index.json não encontrado");

            const data = await res.json();
            console.log("%c[WRF MENU] Conteúdo do index.json:", "color: #1e90ff", data);

            const urls = data.files
                .filter((f: string) => {
                    const ext = f.split(".").pop()?.toLowerCase();
                    const isValid = ext && IMG_EXT.includes(ext);
                    console.log(`Arquivo detectado: ${f} | Extensão válida?`, isValid);
                    return isValid;
                })
                .map((f: string) => {
                    const finalPath = `${folder}/${f}`;
                    console.log("➡️ URL final da imagem:", finalPath);
                    return finalPath;
                });

            console.log("%c[WRF MENU] URLs finais enviadas ao contexto:", "color: #ffaa00", urls);

            setImages(urls);
        } catch (e) {
            console.error("%c[WRF MENU] Erro carregando imagens:", "color: red", e);
            setImages([]);
        } finally {
            setLoading(false);
        }
    };

    const toggleOption = (opt: "precipitacao" | "vento_10m") => {
        console.log("%c[WRF MENU] Checkbox clicado:", "color: purple", opt);

        const next = selectedOption === opt ? "none" : opt;
        console.log("%c[WRF MENU] Próxima opção selecionada:", "color: purple", next);

        setSelectedOption(next);

        if (next === "none") {
            console.log("%c[WRF MENU] Nenhuma opção — limpando imagens.", "color: orange");
            setImages([]);
            return;
        }

        loadImagesFromFolder(next);
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
        </div>
    );
};

export default WrfMenu;
