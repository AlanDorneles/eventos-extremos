import { Card } from "../card/Card"
import { MenuStation } from "../menuStation/MenuStation"
import { Graphic } from "../chart/Chart"
import { MdClose } from "react-icons/md"
import { useEffect, useState } from "react"
import styles from './Phenomena.module.css'
import PropTypes from 'prop-types';

export const Phenomena = ({handleCloseModal}) => {
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth <= 900 : false
    );
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 900);
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            setIsCardModalOpen(false);
        }
    }, [isMobile]);
    
    return(

        <div className={styles.container}>
            {!isMobile && (
                <div className={styles.containerCard}>
                    <Card className={styles.Card} />
                </div>
            )}
            <div className={styles.containerGraphic}>
                {isMobile && (
                    <button
                        type="button"
                        className={styles.cardToggleButton}
                        onClick={() => setIsCardModalOpen(true)}
                    >
                        Ver dados da estação
                    </button>
                )}
                <MenuStation/>
                <div className={styles.graphicPanel}>
                    <Graphic className={styles.GraphicPressure}/>
                </div>
            </div>

            {isMobile && isCardModalOpen && (
                <div className={styles.cardOverlayBackdrop} onClick={() => setIsCardModalOpen(false)}>
                    <div className={styles.cardOverlayModal} onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className={styles.cardOverlayClose}
                            onClick={() => setIsCardModalOpen(false)}
                            aria-label="Fechar dados da estação"
                        >
                            <MdClose />
                        </button>
                        <Card className={styles.Card} />
                    </div>
                </div>
            )}

            <div className={styles.close}>
                <button
                    className="button  is-rounded is-large is-danger is-outlined"
                    onClick={handleCloseModal}
                >
                    <MdClose className={styles.closeX} />
                </button>
            </div>
        </div>
        )
}

Phenomena.propTypes = {
    handleCloseModal: PropTypes.func
}