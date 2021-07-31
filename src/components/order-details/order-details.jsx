import React from 'react';
import PropTypes from 'prop-types';

import styles from './order-details.module.css';
import done from '../../images/done.png';


const OrderDetails = ({orderId}) => {
    const succeedOrder = (
        <>
            <h2 className="text text_type_digits-large mb-4">{orderId}</h2>
            <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
            <img className="mb-15" src={done} alt=""/>
            <span className="text text_type_main-default mb-2">Ваш заказ начали готовить</span>
            <span className="text text_type_main-default text_color_inactive mb-10">Дождитесь готовности на орбитальной станции</span>
        </>
    );
    return (
        <div className={styles.container}>
            {orderId ? succeedOrder : <p>Загрузка...</p>}
        </div>
    );
}

OrderDetails.propTypes = {
    orderId: PropTypes.number,
}

export default OrderDetails;