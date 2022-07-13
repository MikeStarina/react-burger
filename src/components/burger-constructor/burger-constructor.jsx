import React from 'react';
import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDrop, useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../../services/actions/cart-actions.jsx";
import {
  INCREASE_COUNTER,
  DECREASE_COUNTER,
} from "../../services/actions/data-actions.jsx";
import { useRef, useMemo } from "react";
import CartItem from "./cart-item.jsx";
import { v4 as uuidv4 } from 'uuid';








export default function BurgerConstructor({ openModal }) {
  const dispatch = useDispatch();
  const deleteRef = useRef(null);

  const { items } = useSelector((store) => store.cart);
  

  //стоимость заказа

  const totalPrice = items.reduce(function (acc, item) {
    return item.type === "bun" ? acc + item.price * 2 : acc + item.price;
  }, 0);
 

  //удаление булок

  const handleClose = () => {
    const bunToDelete = items.filter((item) => item.type === "bun");
    dispatch({
      type: REMOVE_FROM_CART,
      id: bunToDelete[0]._id,
    });

    dispatch({
      type: DECREASE_COUNTER,
      data: bunToDelete[0]._id,
    });
  };

  //добавление в корзину

  const addToCart = (item) => {

    item.key = uuidv4();
    console.log(item.key);


    dispatch({
      type: INCREASE_COUNTER,
      data: item._id,
    });

    if (
      item.type === "bun" &&
      items.findIndex((elem) => elem.type === "bun") !== -1
    ) {
      const currentBun = items.filter((elem) => elem.type === "bun");
      console.log(currentBun);
      dispatch({
        type: DECREASE_COUNTER,
        data: currentBun[0]._id,
      });
    }

    dispatch({
      type: ADD_TO_CART,
      data: item,
    });
  };

  //перетаскивание в корзину

  const [, dropTarget] = useDrop({
    accept: "Ingredient",
    drop: (item) => {
      addToCart(item);
    },
  });

  return (
    <div className={styles.burger_constructor} ref={dropTarget}>
      <div className={styles.bun_item}>
        {items.map((item) => {
          return item.type === "bun" ? (
            <li
              key={Math.random()}
              className={styles.card}
              id={item._id}
              ref={deleteRef}
            >
              <ConstructorElement
                type={"top"}
                text={item.name + " (верх)"}
                thumbnail={item.image}
                price={item.price}
                isLocked={items.length > 1 ? true : false}
                handleClose={items.length > 1 ? "" : handleClose}
              />
            </li>
          ) : (
            ""
          );
        })}
      </div>
      <div className={styles.scrollBlock}>
        <ul className={styles.list}>
          {items.map((elem, index) => {
            return elem.type != "bun" ? (
              <CartItem key={Math.random()} elem={elem} index={index} />
            ) : (
              ""
            );
          })}
        </ul>
      </div>

      <div className={styles.bun_item}>
        {items.map((item) => {
          return item.type === "bun" ? (
            <li key={Math.random()} className={styles.card}>
              <ConstructorElement
                type={"bottom"}
                text={item.name + " (низ)"}
                thumbnail={item.image}
                price={item.price}
                isLocked={items.length > 1 ? true : false}
                handleClose={items.length > 1 ? "" : handleClose}
              />
            </li>
          ) : (
            ""
          );
        })}
      </div>

      <div className={styles.checkout}>
        <div className={styles.price_box}>
          <p className={`${styles.total_price} text text_type_digits-medium`}>
            {totalPrice}
          </p>
          <CurrencyIcon />
        </div>
        <Button type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.array,
  openModal: PropTypes.func,
  bun: PropTypes.object,
};
