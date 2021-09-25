import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

interface IModalProps {
    header?: string
    closeHandler: () => void
}

export const Modal: FC<IModalProps> = ({ children, header, closeHandler }) => {
    useEffect(() => {
        const close = (e: KeyboardEvent) => {
            if(e.key === "Escape"){
                closeHandler()
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    },[closeHandler])

    if (modalRoot) {
    return ReactDOM.createPortal(
        <>
            <div className={styles.modal}>
                <div className={header ? styles.modalHeader : styles.modalHeaderRight}>
                    {header && <h2 className="text text_type_main-large">{header}</h2>}
                    <button 
                        className={styles.closeButton} 
                        onClick={(e)=> {
                            e.stopPropagation();
                            closeHandler && closeHandler()
                            }}
                    >
                        <CloseIcon type="primary"/>
                    </button>
                </div>
                {children}
            </div>
            <ModalOverlay onClickClose={closeHandler} />
        </>, 
        modalRoot
    )}
    return <></>
}
