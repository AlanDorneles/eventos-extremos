import styles from "./styles/sobre.module.css";

const Sobre = () => {
    return (
        <div className={styles.container}>
            <div className={styles.initText}>
            
                <p>O grupo de Monitoramento de Eventos Extremos não se responsabiliza pela divulgação dos dados da página em outros meios. O intuito da página é apenas demonstração visual de dados e centralização dos dados meteorológicos afim de diminuir o tempo de busca de dados por parte dos meteorologistas na criação de suas previsões.</p>
                
                <p>Nossos dados coletados:</p>
                <ul className={styles.hasDottedList}>
                    <li>INMET - Dados de estações meteorológicas</li>
                    <li>RedeMET - Imagens de Radar</li>
                    <li>Windy - iFrame</li>
                    <li>CPPMET - Imagens de satélite ( GOES-16 - CH 2 )</li>
                    <li>CPTEC  - Imagens de satélite ( GOES-16 - CH 14 )</li>
                </ul>

            </div>

            <div className={styles.contact}>
                <div className={`${styles.team} ${styles.column}`}>
                    <p className={styles.title}>Equipe</p>

                    
                </div>

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

                        <button type="submit">ENVIAR</button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Sobre;