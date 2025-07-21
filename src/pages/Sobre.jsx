import styles from "./styles/sobre.module.css";

const Sobre = () => {
  return (
    <div className={styles.container}>
      <div className={styles.initText}>
        <h2 className="title is-5">NOSSOS DADOS</h2>

        <p>
          O Laboratório de Interação Atmosfera-Oceano (LIAO) não se
          responsabiliza pela divulgação dos dados da página em outros meios. O
          intuito da página é apenas demonstração visual e centralização dos
          dados meteorológicos afim de diminuir o tempo de busca de dados por
          parte dos meteorologistas na criação de suas previsões.
        </p>

        <div className="is-flex is-justify-content-space-evenly">
          <div>
            <p>Nossos dados coletados:</p>
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
                <img
                  className={styles.imgNotSquared}
                  src="/cptec.jpeg"
                  alt=""
                />
              </div>
              <div className={styles.cell}>
                <img className={styles.img} src="/inmet2.png" alt="" />
              </div>
              <div className={styles.cell}>
                <img
                  className={styles.imgNotSquared}
                  src="/redemet.png"
                  alt=""
                />
              </div>
              <div className={styles.cell}>
                <img className={styles.img} src="/cppmet.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 
            <div className={styles.contact}>
                <div className={`${styles.team} ${styles.column}`}>
                    <p className={styles.title}>Equipe</p>

                    <ul className={styles.imageList}>
                        <li>
                            <img src="https://www.delas.pt/files/2018/05/shutterstock_246796558-1200x675_c.jpg" alt="Image 1" />
                            <div>
                                <p className={styles.researcher}>Pesquisador 1</p>
                                <p className={styles.researcherAbout}>Especialista em pesquisar</p>
                            </div>
                        </li>
                        <li>
                            <img src="https://www.delas.pt/files/2018/05/shutterstock_246796558-1200x675_c.jpg" alt="Image 2" />
                            <div>
                                <p className={styles.researcher}>Pesquisador 1</p>
                                <p className={styles.researcherAbout}>Especialista em pesquisar</p>
                            </div>
                        </li>
                        <li>
                            <img src="https://www.delas.pt/files/2018/05/shutterstock_246796558-1200x675_c.jpg" alt="Image 3" />
                            <div>
                                <p className={styles.researcher}>Pesquisador 1</p>
                                <p className={styles.researcherAbout}>Especialista em pesquisar</p>
                            </div>
                        </li>
                        <li>
                            <img src="https://www.delas.pt/files/2018/05/shutterstock_246796558-1200x675_c.jpg" alt="Image 3" />
                            <div>
                                <p className={styles.researcher}>Pesquisador 1</p>
                                <p className={styles.researcherAbout}>Especialista em pesquisar</p>
                            </div>
                        </li>
                        <li>
                            <img src="https://www.delas.pt/files/2018/05/shutterstock_246796558-1200x675_c.jpg" alt="Image 3" />
                            <div>
                                <p className={styles.researcher}>Pesquisador 1</p>
                                <p className={styles.researcherAbout}>Especialista em pesquisar</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div id="line" className={`${styles.line} ${styles.column}`} />
                <div className={`${styles.mail} ${styles.column}`}>
                    <p className={styles.title}>Nos envie uma mensagem</p>

                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Nome</label>
                            <input className="input" type="text" id="name" name="name" placeholder="Nome" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">E-mail</label>
                            <input className="input" type="email" id="email" name="email" placeholder="E-mail" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message">Escreva sua mensagem</label>
                            <textarea className="textarea" id="message" name="message" rows="4" placeholder="Escreva sua mensagem" />
                        </div>

                        <button className={styles.enviarForm} type="submit">ENVIAR</button>
                    </form>
                </div>
            </div> */}
    </div>
  );
};

export default Sobre;
