import { Card } from "../card/Card"
import { MenuStation } from "../menuStation/MenuStation"
import { Graphic } from "../chart/Chart"
import { MdClose } from "react-icons/md"
import styles from './Phenomena.module.css'
import PropTypes from 'prop-types';

export const Phenomena = ({handleCloseModal}) => {
    
    return(

        <div className={styles.container}>
            <div className={styles.containerCard}>
            <Card className={styles.Card} />
            </div>
            <div className={styles.containerGraphic}>
            <MenuStation/>
            <Graphic className={styles.GraphicPressure}/>
            </div>
            <div className={styles.close}>
            <button
                className="button is-danger"
                onClick={handleCloseModal}
            >
                <MdClose />
            </button>
            </div>
        </div>
        )
}

Phenomena.propTypes = {
    handleCloseModal: PropTypes.func
}