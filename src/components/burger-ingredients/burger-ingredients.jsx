import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients.module.css";

export default function BurgerIngredients(props) {
  const [current, setCurrent] = useState("");

  const bunsScrollRef = useRef(null);
  const saucesScrollRef = useRef(null);
  const mainsScrollRef = useRef(null);

  const bunsArr = props.data.filter((object) => object["type"] === "bun");
  const sauceArr = props.data.filter((object) => object["type"] === "sauce");
  const mainArr = props.data.filter((object) => object["type"] === "main");

  const card = (item) => {
    return (
      <li
        key={item._id}
        id={item._id}
        className={styles.card}
        onClick={props.openModal}
      >
        {/* <Counter /> */}
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
  };

  useEffect(() => {
    if (current === "buns") {
      bunsScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (current === "sauces") {
      saucesScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (current === "mains") {
      mainsScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [current]);

  return (
    <div className={styles.burger_ingredients}>
      <div className={styles.button_container}>
        <ul className={styles.button_list}>
          <li className={styles.button_item}>
            <Tab value="buns" active={current === "buns"} onClick={setCurrent}>
              Булки
            </Tab>
          </li>
          <li className={styles.button_item}>
            <Tab
              value="sauces"
              active={current === "sauces"}
              onClick={setCurrent}
            >
              Соусы
            </Tab>
          </li>
          <li className={styles.button_item}>
            <Tab
              value="mains"
              active={current === "mains"}
              onClick={setCurrent}
            >
              Начинки
            </Tab>
          </li>
        </ul>
      </div>
      <div className={styles.menu_container}>
        <div className={styles.menu}>
          <h2 className="text text_type_main-medium" ref={bunsScrollRef}>
            Булки
          </h2>
          <ul className={styles.list}>{bunsArr.map((item) => card(item))}</ul>
        </div>

        <div className={styles.menu}>
          <h2 className="text text_type_main-medium" ref={saucesScrollRef}>
            Соусы
          </h2>
          <ul className={styles.list}>{sauceArr.map((item) => card(item))}</ul>
        </div>

        <div className={styles.menu}>
          <h2 className="text text_type_main-medium" ref={mainsScrollRef}>
            Начинки
          </h2>
          <ul className={styles.list}>{mainArr.map((item) => card(item))}</ul>
        </div>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.array,
  openModal: PropTypes.func,
};
