import styles from "../styles/sobre.module.css";
import { ThemedImage } from "../../utils/ThemedImage";
import { useState } from "react";
import {
  FaLinkedinIn,
  FaGithub,
  FaShareAlt,
  FaResearchgate,
} from "react-icons/fa";
const API_URL = import.meta.env.VITE_API_URL;

const teamMembers = [
  {
    id: "jaci",
    name: "Jaci Maria Bilhalva Saraiva",
    role: "Doutora em Ciências Atmosféricas",
    socials: {
      linkedin: "https://www.linkedin.com/in/jaci-saraiva-a990552b",
      lattes: "http://lattes.cnpq.br/7225442251603573",
      researchgate: "https://www.researchgate.net/profile/Jaci-Saraiva-2",
      googleScholar: "https://scholar.google.com/citations?user=JaciSaraiva",
    },
  },
  {
    id: "jeferson",
    name: "Jeferson Machado Prietsch",
    role: "Doutor em Ciências Atmosféricas",
    socials: {
      lattes: "http://lattes.cnpq.br/8790484877258054",
      researchgate: "https://www.researchgate.net/profile/Jeferson-Machado",
      googleScholar:
        "https://scholar.google.com.br/citations?hl=pt-BR&user=b1m4G04AAAAJ",
    },
  },
  {
    id: "ricardo",
    name: "Ricardo Acosta Gotuzzo",
    role: "Doutor em Ciências Atmosféricas",
    socials: {
      linkedin: "https://www.linkedin.com/in/ricardoacostagotuzzo",
      github: "https://github.com/ricardoacosta",
      lattes: "http://lattes.cnpq.br/",
      googleScholar:
        "https://scholar.google.com.br/citations?user=7InaTFUAAAAJ&hl=pt-BR&oi=ao",
    },
  },
  {
    id: "alan",
    name: "Alan Ricardo Drebes Dorneles",
    role: "Analista de Sistemas ",
    socials: {
      linkedin: "https://www.linkedin.com/in/alan-dorneles",
      github: "https://github.com/AlanDorneles",
      lattes: "http://lattes.cnpq.br/9086225102077634",
      researchgate: "https://www.researchgate.net/profile/Alan-Dorneles",
    },
  },
  {
    id: "Carol",
    name: "Carol Viana",
    role: "Graduanda em Sistemas de Informação",
    socials: {
      github: "https://github.com/citrusgz",
    },
  },
  {
    id: "anna",
    name: "Anna Diniz Alexeff",
    role: "Graduanda em Oceanografia",
    socials: {
      linkedin: "https://www.linkedin.com/in/anna-alexeeff",
      github: "https://github.com/annaalexeeff",
      lattes: "http://lattes.cnpq.br/2477477884700296",
    },
  },
  {
    id: "gabrielly",
    name: "Gabrielly de Almeida Gomes",
    role: "Graduanda em Oceanografia",
    socials: {},
  },
  {
    id: "larissa",
    name: "Larissa de Paula Miranda",
    role: "Oceanológa",
    socials: {
      linkedin: "https://www.linkedin.com/in/larissa-miranda-5984902a3/",
      github: "https://github.com/Larissamiranda97",
      lattes:
        "https://wwws.cnpq.br/cvlattesweb/PKG_MENU.menu?f_cod=330ED444EBAA87ED86BA2AD7F9E21823#",
    },
  },
];

const LiaoTab = () => {
  const [socialsOpenFor, setSocialsOpenFor] = useState(null);
  const hasHref = (href) => typeof href === "string" && href.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const newlester = !!formData.get("newlester");

    try {
      const res = await fetch(`${API_URL}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, newlester }),
      });

      if (res.ok) {
        alert("E-mail enviado com sucesso!");
        e.target.reset(); // Limpa o formulário
      } else {
        alert("Erro ao enviar e-mail.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.initText} ${styles.surfaceCard}`}>
        <h2 className="title is-6">
          O LABORATÓRIO DE INTERAÇÃO ATMOSFERA-OCEANO (LIAO)
        </h2>
        <p style={{ textAlign: "justify" }}>
          O LIAO faz parte do núcleo de oceanologia geológica (NULOG), do
          Instituo de Oceanografia (IO) da Universidade Federal do Rio Grande
          (FURG). O LIAO é formado por professores e técnicos doutores, alunos
          de graduação e pós-graduação de diferentes áreas do conhecimento. O
          laboratório tem como objetivo desenvolver pesquisas meteoceanográficas
          na busca da compreensão dos fenômenos costeiros, seus impactos fisícos
          e sociais. O laboratório utiliza dados observados de diferentes
          instituições nacionais e internacionais, bem como dados sintéticos
          provenientes de satélites e dados gerados a partir de modelagem
          numérica.
        </p>

        <div className={styles.partnerHeroGrid}>
          <div className="grid">
            <div
              className={`cell is-flex is-justify-content-center is-align-items-center ${styles.partnerCell}`}
            >
              <ThemedImage
                lightSrc="/FURG_COM_TEXTO1.png"
                darkSrc="/dark-mode/DARK_FURG_COM_TEXTO1.png"
                alt="FURG"
                className={styles.img2}
              />
            </div>
            <div
              className={`cell is-flex is-justify-content-center is-align-items-center ${styles.partnerCell}`}
            >
              <ThemedImage
                lightSrc="/IO_COM_TEXTO.png"
                darkSrc="/dark-mode/DARK_IO_COM_TEXTO.png"
                alt="INSTITUTO DE OCEANOGRAFIA"
                className={styles.img}
              />
            </div>
            <div
              className={`cell is-flex is-justify-content-center is-align-items-center ${styles.partnerCell}`}
            >
              <ThemedImage
                lightSrc="/NULOG.png"
                darkSrc="/dark-mode/DARK_NULOG.png"
                alt="NUCLEO DE OCEANOGRAFIA GEOLOGICA"
                className={styles.img}
              />
            </div>
            <div
              className={`cell is-flex is-justify-content-center is-align-items-center ${styles.partnerCell}`}
            >
              <img className={styles.img4} src="/LIAO3.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.initText} ${styles.surfaceCard}`}>
        <h2 className="title is-6">DADOS</h2>

        <p style={{ textAlign: "justify" }}>
          O Laboratório de Interação Atmosfera-Oceano (LIAO) não se
          responsabiliza pela divulgação dos dados da página em outros meios. O
          intuito da página é apenas demonstração visual e centralização dos
          dados meteorológicos afim de diminuir o tempo de busca de dados por
          parte dos meteorologistas na criação de suas previsões.
        </p>

        <div
          className={`is-flex is-justify-content-space-evenly is-align-items-center ${styles.dataSourcesRow}`}
        >
          <div className={styles.dataOriginText}>
            <p>ORIGEM DOS DADOS:</p>
            <ul className={styles.hasDottedList}>
              <li>INMET - Dados de estações meteorológicas</li>
              <li>RedeMET - Imagens de Radar</li>
              <li>CPPMET - Imagens de satélite ( GOES-19 - CH 2 )</li>
              <li>CPTEC - Imagens de satélite ( GOES-19 - CH 16 )</li>
              <li>Boletins - Comitê de Eventos Extremos (FURG)</li>
            </ul>
          </div>

          <div className={styles.sourceGrid}>
            <div className="grid">
              <div className={`${styles.cell} ${styles.partnerCell}`}>
                <ThemedImage
                  lightSrc="/cptec.jpeg"
                  darkSrc="/dark-mode/DARK_CPTEC.png"
                  alt="CPTEC"
                  className={`${styles.img} ${styles.sourceLogo}`}
                />
              </div>
              <div className={`${styles.cell} ${styles.partnerCell}`}>
                <ThemedImage
                  lightSrc="/inmet_logo.png"
                  darkSrc="/dark-mode/DARK_INMET.png"
                  alt="INMET"
                  className={`${styles.img} ${styles.sourceLogo}`}
                />
              </div>
              <div className={`${styles.cell} ${styles.partnerCell}`}>
                <ThemedImage
                  lightSrc="/redemet_logo.png"
                  darkSrc="/redemet_logo.png"
                  alt="REDEMET"
                  className={`${styles.img} ${styles.sourceLogo}`}
                />
              </div>
              <div className={`${styles.cell} ${styles.partnerCell}`}>
                <ThemedImage
                  lightSrc="/cppmet.png"
                  darkSrc="/dark-mode/DARK_CPPMET.png"
                  alt="FURG"
                  className={`${styles.img} ${styles.sourceLogo}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.contact} ${styles.surfaceCard}`}>
        <div className={styles.team}>
          <p className={styles.title}>Equipe</p>

          <ul className={styles.imageList}>
            {teamMembers.map((member) => {
              const isOpen = socialsOpenFor === member.id;
              const hasLinkedin = hasHref(member.socials?.linkedin);
              const hasGithub = hasHref(member.socials?.github);
              const hasLattes = hasHref(member.socials?.lattes);
              const hasResearchGate = hasHref(member.socials?.researchgate);
              const hasGoogleScholar = hasHref(member.socials?.googleScholar);
              const hasAnySocial =
                hasLinkedin ||
                hasGithub ||
                hasResearchGate ||
                hasGoogleScholar ||
                hasLattes;

              return (
                <li key={member.id}>
                  <img
                    className={styles.avatar56}
                    src="/LIAO1.png"
                    alt={member.name}
                  />

                  <div className={styles.memberInfoWrap}>
                    <p className={styles.researcher}>{member.name}</p>
                    <p className={styles.researcherAbout}>{member.role}</p>
                  </div>

                  <div className={styles.socialHub}>
                    <div className={styles.socialDesktop}>
                      {hasLinkedin && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="LinkedIn"
                        >
                          <FaLinkedinIn />
                        </a>
                      )}
                      {hasGithub && (
                        <a
                          href={member.socials.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="GitHub"
                        >
                          <FaGithub />
                        </a>
                      )}
                      {hasResearchGate && (
                        <a
                          href={member.socials.researchgate}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="ResearchGate"
                        >
                          <FaResearchgate />
                        </a>
                      )}
                      {hasGoogleScholar && (
                        <a
                          href={member.socials.googleScholar}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Google Scholar"
                        >
                          <span
                            className={styles.socialMaskIcon}
                            style={{
                              maskImage: "url(/google_scholar.svg)",
                              WebkitMaskImage: "url(/google_scholar.svg)",
                            }}
                            aria-hidden="true"
                          />
                        </a>
                      )}
                      {hasLattes && (
                        <a
                          href={member.socials.lattes}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Lattes"
                        >
                          <img
                            src="/lattes.svg"
                            alt="Lattes"
                            className={styles.lattesIcon}
                          />
                        </a>
                      )}
                    </div>

                    <div className={styles.socialMobile}>
                      {hasAnySocial && (
                        <button
                          className="button is-small is-primary is-outlined"
                          type="button"
                          aria-label="Abrir redes sociais"
                          onClick={() =>
                            setSocialsOpenFor((prev) =>
                              prev === member.id ? null : member.id,
                            )
                          }
                        >
                          <FaShareAlt />
                        </button>
                      )}

                      {isOpen && hasAnySocial && (
                        <div className={styles.socialMobileMenu}>
                          {hasLinkedin && (
                            <a
                              href={member.socials.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="LinkedIn"
                            >
                              <FaLinkedinIn />
                            </a>
                          )}
                          {hasGithub && (
                            <a
                              href={member.socials.github}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="GitHub"
                            >
                              <FaGithub />
                            </a>
                          )}
                          {hasResearchGate && (
                            <a
                              href={member.socials.researchgate}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="ResearchGate"
                            >
                              <FaResearchgate />
                            </a>
                          )}
                          {hasGoogleScholar && (
                            <a
                              href={member.socials.googleScholar}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="Google Scholar"
                            >
                              <span
                                className={styles.socialMaskIcon}
                                style={{
                                  maskImage: "url(/google_scholar.svg)",
                                  WebkitMaskImage: "url(/google_scholar.svg)",
                                }}
                                aria-hidden="true"
                              />
                            </a>
                          )}
                          {hasLattes && (
                            <a
                              href={member.socials.lattes}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="Lattes"
                            >
                              <img
                                src="/lattes.svg"
                                alt="Lattes"
                                className={styles.lattesIcon}
                              />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className={`${styles.contactFormSection} ${styles.surfaceCard}`}>
        <div className={styles.mail}>
          <p className={styles.title}>Nos envie uma mensagem</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nome</label>
              <input
                className="input"
                type="text"
                id="name"
                name="name"
                placeholder="Nome"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">E-mail</label>
              <input
                className="input"
                type="email"
                id="email"
                name="email"
                placeholder="E-mail"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Escreva sua mensagem</label>
              <textarea
                className="textarea"
                id="message"
                name="message"
                rows="8"
                placeholder="Escreva sua mensagem"
              />
            </div>

            <div className={styles.formGroup}>
              <label className="checkbox" htmlFor="newlester">
                <input type="checkbox" id="newlester" name="newlester" />
                Receber atualizações no e-mail
              </label>
            </div>

            <button className="button is-primary" type="submit">
              ENVIAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LiaoTab;
