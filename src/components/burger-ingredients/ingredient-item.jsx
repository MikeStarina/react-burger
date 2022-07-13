import React from 'react';
import { useDrag } from "react-dnd";

import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ingredient-item.module.css";





export function IngredientItem({ item, openModal }) {

  const [{ isDrag }, dndRef] = useDrag({
    type: "Ingredient",
    item: item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <li key={item._id} id={item._id} onClick={openModal} ref={dndRef} className={styles.card} >
      
        {item.counter > 0 && <Counter count={item.counter} />}
      
      <img src={item.image} alt={item.name} />
      <div className={styles.price_container}>
        <p className={`${styles.price} text text_type_digits-default`}>
          {item.price}
        </p>
        <CurrencyIcon />
      </div>

      <p className={`${styles.description} text text_type_main-default`}>
        {item.name}
      </p>
    </li>
  );
}
