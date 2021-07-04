import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

const Modal =({ children, header=null, onClose })=> {
    useEffect(() => {
        const close = (e) => {
            if(e.key === "Escape"){
                onClose()
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    },[onClose])

    const closeHandler = (e) => {
        e.stopPropagation();
        onClose();
    }

    return ReactDOM.createPortal(
        (
        <>
            <div className={styles.modal}>
                <div className={header ? styles.modalHeader : styles.modalHeaderRight}>
                    {header && <h2 className="text text_type_main-large">{header}</h2>}
                    <button className={styles.closeButton} onClick={e => closeHandler(e)}>
                        <CloseIcon type="primary"/>
                    </button>
                </div>
                {children}
            </div>
            <ModalOverlay onClickClose={closeHandler} />
        </>
        ),modalRoot
    )
}

Modal.propTypes = {
    children: PropTypes.node,
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired,
}

export default Modal;