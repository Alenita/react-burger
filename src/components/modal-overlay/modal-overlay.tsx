import React, { FC } from "react";

import styles from "./modal-overlay.module.css";

interface IModalOverlay {
    onClickClose: (e: React.SyntheticEvent<EventTarget>) => void
}

const ModalOverlay: FC<IModalOverlay> = ({onClickClose, children}) => {

    return(
        <div className={styles.container} 
            onClick={onClickClose}>
            {children}
        </div>
    )
}

export default ModalOverlay;