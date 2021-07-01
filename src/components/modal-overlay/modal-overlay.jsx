import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";
import Modal from "../modal/modal";

const ModalOverlay = ({onClickClose, children}) => {

    return(
        <div className={styles.container} 
            onClick={onClickClose}
        >
            {children}
        </div>
    )
}

Modal.propTypes = {
    onClickClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default ModalOverlay;