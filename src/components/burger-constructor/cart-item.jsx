import React from 'react';
import styles from "./cart-item.module.css";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { DROP_CHANGE_ORDER } from "../../services/actions/cart-actions.jsx";
import { REMOVE_FROM_CART } from "../../services/actions/cart-actions.jsx";
import { DECREASE_COUNTER } from "../../services/actions/data-actions.jsx";

export default function CartItem({ elem }) {
  const ref = useRef(null);
  const { items } = useSelector((store) => store.cart);
  const dispatch = useDispatch();


  //удаление из корзины
  const deleteFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      id: ref.current.id,
    });
    dispatch({
      type: DECREASE_COUNTER,
      data: ref.current.id,
    });
  };

  //перетаскивание внутри корзины
  const dropHandler = (item) => {
    

    const draggedItemIndex = items.findIndex((elem) => elem._id === item._id);
    const hoveredItemIndex = items.findIndex(
      (elem) => elem._id === ref.current.id
    );
    const hoveredItem = items.filter((elem) => elem._id === ref.current.id);
    const newItems = items;
    newItems.splice(draggedItemIndex, 1);
    newItems.splice(hoveredItemIndex, 0, item);

    dispatch({
      type: DROP_CHANGE_ORDER,
      items: newItems,
    });
  };

  const [, drag] = useDrag({
    type: "Ingdt",
    item: elem,
  });

  const [, drop] = useDrop({
    accept: "Ingdt",

    drop: (item) => {
      dropHandler(item);
    },
  });
  

  drag(drop(ref));

  return (
    <li key={elem._id} className={styles.card} id={elem._id} ref={ref}>
      <DragIcon />
      <ConstructorElement
        text={elem.name}
        thumbnail={elem.image}
        price={elem.price}
        handleClose={deleteFromCart}
      />
    </li>
  );
}
