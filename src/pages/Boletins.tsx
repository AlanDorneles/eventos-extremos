import styles from "./styles/Boletins.module.css";
import { useMemo, useState } from "react";
import { Boletim } from "../types/Boletim";


const boletins: Boletim[] = [
  // ===== 2025 =====
  {
    year: 2025,
    number: "04",
    dateBR: "04/07/2025",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/04-07-Boletim_4__EHF.pdf",
  },
  {
    year: 2025,
    number: "03",
    dateBR: "01/07/2025",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/2025/Boletim_3__EHF.pdf",
  },
  {
    year: 2025,
    number: "02",
    dateBR: "28/06/2025",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/2025/28-05-25-Boletim-002-FURG.pdf",
  },
  {
    year: 2025,
    number: "01",
    dateBR: "26/06/2025",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/2025/26-06-Boletim_1-FURG.pdf",
  },

  // ===== 2024 =====
  {
    year: 2024,
    number: "24",
    dateBR: "04/07/2024",
    href: "https://www.furg.br/arquivos/Noticias/2024/04-07-2024-Boletim_242-furg.pdf",
  },
  {
    year: 2024,
    number: "23",
    dateBR: "26/06/2024",
    href: "https://www.furg.br/arquivos/Noticias/2024/26-06-2024-Boletim_231-furg.pdf",
  },
  {
    year: 2024,
    number: "22",
    dateBR: "20/06/2024",
    href: "https://www.furg.br/arquivos/eventos_extremos/boletim-22-eventos-extremos-furg.pdf",
  },
  {
    year: 2024,
    number: "21",
    dateBR: "11/06/2024",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/2024/1006-Boletim-21-furg.pdf",
  },
  {
    year: 2024,
    number: "20",
    dateBR: "05/06/2024",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/2024/0506_Boletim_20.pdf",
  },
  {
    year: 2024,
    number: "19",
    dateBR: "04/06/2024",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/2024/0406_Boletim_191.pdf",
  },
  {
    year: 2024,
    number: "18",
    dateBR: "30/05/2024",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/2024/3105_Boletim_18_Corrigido.pdf",
  },
  {
    year: 2024,
    number: "17",
    dateBR: "28/05/2024",
    href: "https://www.furg.br/arquivos/Noticias/2024/2805_Boletim_17.pdf",
  },
  {
    year: 2024,
    number: "16",
    dateBR: "24/05/2024",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/2024/2405_Boletim_16_2.pdf",
  },
  {
    year: 2024,
    number: "15",
    dateBR: "23/05/2024",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/2024/2305_Boletim_15.pdf",
  },
  {
    year: 2024,
    number: "14",
    dateBR: "23/05/2024",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/2024/2305_-_Boletim_14.pdf",
  },
  {
    year: 2024,
    number: "13",
    dateBR: "22/05/2024",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/2024/2205_Boletim_132.pdf",
  },
  {
    year: 2024,
    number: "12",
    dateBR: "19/05/2024",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/2024/2005_Boletim_12_Corrigido.pdf",
  },
  {
    year: 2024,
    number: "11",
    dateBR: "18/05/2024",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/2024/2005Boletim_11_-_Corrigido.pdf",
  },
  {
    year: 2024,
    number: "10",
    dateBR: "16/05/2024",
    href: "https://www.furg.br/arquivos/Noticias/2024/1605_Boletim_10.pdf",
  },
  {
    year: 2024,
    number: "09",
    dateBR: "15/05/2024",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/2024/2005_Boletim_9_-_corrigido.pdf",
  },
  {
    year: 2024,
    number: "08",
    dateBR: "13/05/2024",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/2024/Boletim_08_-_link.pdf",
  },
  {
    year: 2024,
    number: "07",
    dateBR: "11/05/2024",
    href: "https://furg.br/noticias/noticias-institucional/setimo-boletim-de-acompanhamento-atualiza-regioes-mais-criticas-do-rio-grande",
  },
  {
    year: 2024,
    number: "06",
    dateBR: "09/05/2024",
    href: "https://www.furg.br/arquivos/Noticias/2024/0905-boletim-comite-eventos-extremos-furg.pdf",
  },
  {
    year: 2024,
    number: "05",
    dateBR: "08/05/2024",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/2024/0805_-_ATT-_Boletim_04_070524.pdf",
  },
  {
    year: 2024,
    number: "04",
    dateBR: "07/05/2024",
    href: "https://youtu.be/tWPO-PNSprQ",
  },
  {
    year: 2024,
    number: "03",
    dateBR: "06/05/2024",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/2024/06-05-boletim_03_050524_v4.pdf",
  },
  {
    year: 2024,
    number: "02",
    dateBR: "04/05/2024",
    href: "https://www.furg.br/arquivos/Noticias/2024/0405-Boletim_02_040524_v2.pdf",
  },
  {
    year: 2024,
    number: "01",
    dateBR: "03/05/2024",
    href: "https://www.furg.br/arquivos/Informes_da_Reitoria/2024/0305boletim_evento_extremo_01_2024.pdf",
  },
];

export default function BoletinsPanel() {
  const [activeYear, setActiveYear] = useState<2025 | 2024>(2025);
  const [q, setQ] = useState("");

  const years = useMemo(
    () => Array.from(new Set(boletins.map(b => b.year))).sort((a, b) => b - a) as (2025 | 2024)[],
    []
  );

  const filtered = useMemo(() => {
    const qn = q.trim().toLowerCase();
    return boletins
      .filter(b => b.year === activeYear)
      .filter(b => {
        if (!qn) return true;
        const texto = [
          b.title ?? `Boletim de Evento Extremo - ${b.number} - ${b.dateBR}`,
          b.number,
          b.dateBR,
        ].join(" ").toLowerCase();
        return texto.includes(qn);
      })
      // ordena do mais novo para o mais antigo (pela data em BR — como fallback, ordena pelo número desc)
      .sort((a, b) => {
        // tenta ordenar por data (dd/mm/aaaa)
        const [da, ma, ya] = a.dateBR.split("/").map(Number);
        const [db, mb, yb] = b.dateBR.split("/").map(Number);
        const ta = new Date(ya, ma - 1, da).getTime();
        const tb = new Date(yb, mb - 1, db).getTime();
        if (!Number.isNaN(tb - ta)) return tb - ta;
        // fallback: número desc
        return Number(b.number) - Number(a.number);
      });
  }, [activeYear, q]);

  return (
    <div className="container mb-3">
      <article className="panel is-primary">
        <p className="panel-heading">Boletins de Evento Extremo</p>

        <p className="panel-tabs">
          {years.map(y => (
            <a
              key={y}
              className={y === activeYear ? "is-active" : undefined}
              onClick={() => setActiveYear(y)}
              role="tab"
              aria-selected={y === activeYear}
              style={{ cursor: "pointer" }}
            >
              {y}
            </a>
          ))}
        </p>

        <div className="panel-block">
          <p className="control has-icons-left" style={{ width: "100%" }}>
            <input
              className="input is-primary"
              type="text"
              placeholder="Buscar por número, data ou título…"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="panel-block">
            <em>Nenhum boletim encontrado.</em>
          </div>
        ) : (
          filtered.map((b, i) => {
            const label =
              b.title ??
              `Boletim de Evento Extremo - ${b.number} - ${b.dateBR}`;
            return (
              <a
                key={`${b.year}-${b.number}-${i}`}
                className="panel-block"
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
              >
                <span className="panel-icon">
                  <i className="fas fa-book" aria-hidden="true"></i>
                </span>
                {label}
              </a>
            );
          })
        )}
      </article>
    </div>
  );
}
