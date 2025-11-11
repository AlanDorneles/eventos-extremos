import styles from "./styles/sobre.module.css";
import {ThemedImage} from '../utils/ThemedImage'
const API_URL = import.meta.env.VITE_API_URL;

const Sobre = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const newlester = !!formData.get("newlester")

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
      <div className={styles.initText}>
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

      

        <div className="fixed-grid has-4-cols">
          <div className="grid">
            <div className="cell is-flex is-justify-content-center is-align-items-center">

              <ThemedImage
                lightSrc="/FURG_COM_TEXTO1.png"
                darkSrc="/dark-mode/DARK_FURG_COM_TEXTO1.png"  
                alt="FURG"
                className={styles.img2}
                />
            </div>
            <div className="cell is-flex is-justify-content-center is-align-items-center">
              <ThemedImage
                lightSrc="/IO_COM_TEXTO.png"
                darkSrc="/dark-mode/DARK_IO_COM_TEXTO.png"   
                alt="INSTITUTO DE OCEANOGRAFIA"
                className={styles.img}
                />
            </div>
            <div className="cell is-flex is-justify-content-center is-align-items-center">
             <ThemedImage
                lightSrc="/NULOG.png"
                darkSrc="/dark-mode/DARK_NULOG.png"   
                alt="NUCLEO DE OCEANOGRAFIA GEOLOGICA"
                className={styles.img}
                />
            </div>
            <div className="cell is-flex is-justify-content-center is-align-items-center">
              <img className={styles.img4} src="/LIAO3.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.initText}>
        <h2 className="title is-6">DADOS</h2>

        <p style={{ textAlign: "justify" }}>
          O Laboratório de Interação Atmosfera-Oceano (LIAO) não se
          responsabiliza pela divulgação dos dados da página em outros meios. O
          intuito da página é apenas demonstração visual e centralização dos
          dados meteorológicos afim de diminuir o tempo de busca de dados por
          parte dos meteorologistas na criação de suas previsões.
        </p>

        <div className="is-flex is-justify-content-space-evenly is-align-items-center	">
          <div>
            <p>ORIGEM DOS DADOS:</p>
            <ul className={styles.hasDottedList}>
              <li>INMET - Dados de estações meteorológicas</li>
              <li>RedeMET - Imagens de Radar</li>
              <li>CPPMET - Imagens de satélite ( GOES-19 - CH 2 )</li>
              <li>CPTEC - Imagens de satélite ( GOES-19 - CH 16 )</li>
              <li>Boletins - Comitê de Eventos Extremos (FURG)</li>
            </ul>
          </div>

          <div
            className="fixed-grid has-2-cols"
            style={{ height: "20em", width: "20em" }}
          >
            <div className="grid">
              <div className={styles.cell}>
                <ThemedImage
                lightSrc="/cptec.jpeg"
                darkSrc="/dark-mode/DARK_CPTEC.png"   
                alt="CPTEC"
                className={styles.img}
                />
              </div>
              <div className={styles.cell}>
               <ThemedImage
                lightSrc="/inmet2.png"
                darkSrc="/dark-mode/DARK_INMET.png" 
                alt="INMET"
                className={styles.img}
                />
              </div>
              <div className={styles.cell}>
                 <ThemedImage
                lightSrc="/redemet.png"
                darkSrc="/dark-mode/DARK_REDEMET.png"   
                alt="REDEMET"
                className={styles.img}
                />
              </div>
              <div className={styles.cell}>
                 <ThemedImage
                lightSrc="/cppmet.png"
                darkSrc="/dark-mode/DARK_CPPMET.png"   
                alt="FURG"
                className={styles.img}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contact}>
        <div className={`${styles.team} ${styles.column}`}>
          <p className={styles.title}>Equipe</p>

          <ul className={styles.imageList}>
            <li>
              <img className={styles.avatar56} src="/LIAO1.png" />

              <div>
                <p className={styles.researcher}>Jaci Maria Bilhalva Saraiva</p>
                <p className={styles.researcherAbout}>
                  Doutora em Ciências Atmosféricas
                </p>
              </div>
            </li>
            <li>
              <img className={styles.avatar56} src="/LIAO1.png" />
              <div>
                <p className={styles.researcher}>Jeferson Machado Prietsch</p>
                <p className={styles.researcherAbout}>
                  Doutor em Ciências Atmosféricas
                </p>
              </div>
            </li>
            <li>
              <img className={styles.avatar56} src="/LIAO1.png" />
              <div>
                <p className={styles.researcher}>Ricardo Acosta Gotuzzo</p>
                <p className={styles.researcherAbout}>
                  Doutor em Ciências Atmosféricas
                </p>
              </div>
            </li>
            <li>
              <img className={styles.avatar56} src="/LIAO1.png" />
              <div>
                <p className={styles.researcher}>
                  Alan Ricardo Drebes Dorneles
                </p>
                <p className={styles.researcherAbout}>Analista de Sistemas</p>
              </div>
            </li>
            <li>
              <img className={styles.avatar56} src="/LIAO1.png" />
              <div>
                <p className={styles.researcher}>Pablo Viana</p>
                <p className={styles.researcherAbout}>Bolsista</p>
              </div>
            </li>
            <li>
              <img className={styles.avatar56} src="/LIAO1.png" />
              <div>
                <p className={styles.researcher}>Anna Diniz Alexeff</p>
                <p className={styles.researcherAbout}>Bolsista</p>
              </div>
            </li>
            <li>
              <img className={styles.avatar56} src="/LIAO1.png" />
              <div>
                <p className={styles.researcher}>Gabrielly de Almeida Gomes</p>
                <p className={styles.researcherAbout}>Bolsista</p>
              </div>
            </li>
            <li>
              <img className={styles.avatar56} src="/LIAO1.png" />
              <div>
                <p className={styles.researcher}>Larissa de Paula Miranda </p>
                <p className={styles.researcherAbout}>Bolsista</p>
              </div>
            </li>
          </ul>
        </div>
        <div id="line" className={`${styles.line} ${styles.column}`} />
        <div className={`${styles.mail} ${styles.column}`}>
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
              <label class="checkbox" htmlFor="newlester">
                <input type="checkbox" id="newlester"
                name="newlester" />
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

export default Sobre;
