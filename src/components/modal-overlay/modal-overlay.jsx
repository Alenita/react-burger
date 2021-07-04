import React from "react";
import PropTypes from "prop-types";

import styles from "./modal-overlay.module.css";

const ModalOverlay = ({onClickClose, children}) => {

    return(
        <div className={styles.container} 
            onClick={onClickClose}>
            {children}
        </div>
    )
}

ModalOverlay.propTypes = {
    onClickClose: PropTypes.func.isRequired,
    children: PropTypes.node,
}

export default ModalOverlay;