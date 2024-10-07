import styles from "./styles/sobre.module.css";

const Sobre = () => {
  return (
    <div className={styles.container}>
      <div className={styles.initText}>
        {/* <h4 className="title is-5">CONHEÇA O COMITÊ</h4>
        <p>
          O Comitê de Avaliação e Prognóstico de Eventos Extremos da FURG é um
          órgão integrante do Programa Institucional de Avaliação, Prognóstico e
          Mitigação de Impactos de Eventos Climáticos Extremos, instituído pela
          <a href="https://www.furg.br/arquivos/Noticias/2024/2103-resolucao-coepea-programa-eventos-extremos-furg.pdf" target="blank"> RESOLUÇÃO COEPEA/FURG N° 117</a>, de 10 de novembro de 2023. O órgão é
          composto por pesquisadores oriundos de diferentes especialidades, o
          que garante à Universidade a capacidade de abordar de forma
          multidisciplinar e abrangente os desafios relacionados aos eventos
          climáticos extremos.
        </p>

        <p>
          Dra. Jaci Maria Bilhalva Saraiva (IO) (Coordenadora) - Área de atuação
          em Meteorologia, com ênfase nos temas: Sistemas precipitantes
          tropicais, Previsão do Tempo e Previsão de Eventos Meteorológicos
          Extremos
        </p>

        <p>
          Dr. Eder Leandro Bayer Maier (ICHI) (Coordenador Adjunto) - Área de
          atuação: Geografia, Cartografia Digital, Geoprocessamento e
          Climatologia
        </p>

        <p>
          Dra. Elisa Helena Leão Fernandes (IO) - Área de atuação: Oceanografia
          Física Costeira e Estuarina, com ênfase na aplicação de técnicas de
          modelagem numérica e sensoriamento remoto.{" "}
        </p>

        <p>
          Dr. Glauber Acunha Gonçalves (C3) - Área de atuação: Geociências, com
          ênfase em Sensoriamento remoto, fotogrametria e Geoinformação.{" "}
        </p>

        <p>
          Dr. Osmar Olinto Moller Junior (IO) - Área de atuação: Oceanologia,
          com ênfase em circulação de Estuários e Plataforma Continental.{" "}
        </p>

        <p>
          Dr. Ricardo Acosta Gotuzzo (IO) - Área de Atuação: Ciências
          atmosféricas, com ênfase em Sistema Climático Terrestre, entendimento
          e modelagem dos processos nas interfaces biosfera-hidrosfera e
          atmosfera adjacente.{" "}
        </p>

        <p>
          Dr. Eduardo Resende Secchi (IO) - Área de atuação: Oceanologia.
          Atualmente é Pró-reitor de Pesquisa e Pós-graduação da Universidade
          Federal do Rio Grande - FURG.{" "}
        </p>

        <p>
          Dr. Leandro Bugoni (ICB) - Área de atuação: Biologia. Atualmente é
          Diretor de Pesquisa na Pró-reitoria de Pesquisa e pós-graduação da
          Universidade Federal do Rio Grande - FURG.{" "}
        </p> */}

        <h2 className="title is-5">NOSSOS DADOS</h2>

        <p>
          O grupo de Monitoramento de Eventos Extremos não se responsabiliza
          pela divulgação dos dados da página em outros meios. O intuito da
          página é apenas demonstração visual de dados e centralização dos dados
          meteorológicos afim de diminuir o tempo de busca de dados por parte
          dos meteorologistas na criação de suas previsões.
        </p>

        <p>Nossos dados coletados:</p>
        <ul className={styles.hasDottedList}>
          <li>INMET - Dados de estações meteorológicas</li>
          <li>RedeMET - Imagens de Radar</li>
          {/* <li>Windy - iFrame</li> */}
          <li>CPPMET - Imagens de satélite ( GOES-16 - CH 2 )</li>
          <li>CPTEC - Imagens de satélite ( GOES-16 - CH 14 )</li>
        </ul>
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
