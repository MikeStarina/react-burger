import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from "./order-details.module.css";
import {
  CheckMarkIcon,
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export default function OrderDetails(props) {

  const { order } = useSelector(store => store.cart);

  console.log(order);
  return (
    <>
      <div className={styles.popup_container}>
        
        <h2 className="text text_type_digits-large">{order.order.number}</h2>
        <p className={`${styles.order_id_text} text text_type_main-default`}>
          идентификатор заказа
        </p>
        <CheckMarkIcon type="primary" />
        <p className={`${styles.subtitle} text text_type_main-small`}>
          ваш заказ начали готовить
        </p>
        <p className="text text_type_main-small text_color_inactive">
          дождитесь готовности на орбитальной станции
        </p>
      </div>
    </>
  );
}

OrderDetails.propTypes = {
  closeModal: PropTypes.func,
};
