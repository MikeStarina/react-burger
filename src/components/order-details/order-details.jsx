import React from "react";
import styles from './order-details.module.css';
import { CheckMarkIcon, CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

export default function OrderDetails(props) {


    return (
        <>
            <div className={styles.popup_container}>
            <div className={styles.close_box}>
                <CloseIcon onClick={props.closeModal}/>
            </div>
                <h2 className='text text_type_digits-large'>034536</h2>
                <p className={`${styles.order_id_text} text text_type_main-default`}>идентификатор заказа</p>
                <CheckMarkIcon type="primary" />
                <p className={`${styles.subtitle} text text_type_main-small`}>ваш заказ начали готовить</p>
                <p className='text text_type_main-small text_color_inactive'>дождитесь готовности на орбитальной станции</p>
            </div>
        </>
    )
}

OrderDetails.propTypes = {
    closeModal: PropTypes.func

};