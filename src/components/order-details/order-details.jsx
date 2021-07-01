import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./order-details.module.css";
import Modal from "../modal/modal";
import done from "../../images/done.png";

const modalRoot = document.getElementById("react-modals");

const OrderDetails = ({onClose}) => {
    return ReactDOM.createPortal(
    (
        <Modal onClose={onClose}>
            <div className={styles.container}>
                <h2 className="text text_type_digits-large mb-4">034536</h2>
                <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
                <img className="mb-15" src={done} alt=""/>
                <span className="text text_type_main-default mb-2">Ваш заказ начали готовить</span>
                <span className="text text_type_main-default text_color_inactive mb-10">Дождитесь готовности на орбитальной станции</span>
            </div>
        </Modal>
    ), modalRoot
    );
}

OrderDetails.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default OrderDetails;