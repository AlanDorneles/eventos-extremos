import React, { useEffect, useState } from "react";
import { useWrfImages } from "../contexts/wrfImages";

const WrfPage: React.FC = () => {
    const { images } = useWrfImages();
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(true);

    console.log("[WRF PAGE] Renderizou. Imagens recebidas:", images);

    useEffect(() => {
        console.log("[WRF PAGE] images mudou:", images);
        setIndex(0);
    }, [images]);

    useEffect(() => {
        if (!playing) return;
        if (!images || images.length === 0) return;

        const t = setInterval(() => {
            setIndex((i) => {
                return (i + 1) % images.length;
            });
        }, 2500);

        return () => clearInterval(t);
    }, [playing, images]);

    if (!images || images.length === 0) {
        console.log("[WRF PAGE] Nenhuma imagem selecionada");
        return (
            <div style={{ padding: 16 }}>
                <h2 className="title is-4">WRF</h2>
                <p>Nenhuma imagem selecionada. Use o menu WRF para escolher imagens.</p>
            </div>
        );
    }

    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
    const next = () => setIndex((i) => (i + 1) % images.length);

    console.log("[WRF PAGE] Exibindo imagem atual:", images[index]);

	return (
		<div style={{ padding: 12, display: "flex", flexDirection: "column", alignItems: "center" }}>
			<h2 className="title is-4">WRF — Visualizador</h2>

			<div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center" }}>
				<button className="button" onClick={prev}>&lt;</button>

				<div
					style={{
						width: 720,
						height: 480,
						border: "1px solid #ddd",
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<img
						src={images[index]}
						alt={`wrf-${index}`}
						style={{ maxWidth: "100%", maxHeight: "100%" }}
					/>
				</div>

				<button className="button" onClick={next}>&gt;</button>
			</div>

			<div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
				<button className="button is-small" onClick={() => setPlaying((p) => !p)}>
					{playing ? "Pausar" : "Tocar"}
				</button>
				<small>{index + 1} / {images.length}</small>
			</div>

			<div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
				{images.map((src, i) => (
					<div
						key={i}
						onClick={() => setIndex(i)}
						style={{
							width: 120,
							height: 80,
							cursor: "pointer",
							border: i === index ? "2px solid #3273dc" : "1px solid #ddd"
						}}
					>
						<img
							src={src}
							alt={`thumb-${i}`}
							style={{ width: "100%", height: "100%", objectFit: "cover" }}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default WrfPage;
