import React, { useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients.module.css";
import { IngredientItem } from "./ingredient-item.jsx";
import { CHANGE_ACTIVE_MENU } from "../../services/actions/data-actions";
import { useSelector, useDispatch } from "react-redux";

export default function BurgerIngredients(props) {

  const { activeMenu } = useSelector((store) => store.mainData);
  const dispatch = useDispatch();

  const bunsScrollRef = useRef(null);
  const saucesScrollRef = useRef(null);
  const mainsScrollRef = useRef(null);
  const menuRef = useRef(null);

  const bunsArr = useMemo(() => props.data.filter((object) => object["type"] === "bun"), [props.data]);
  const sauceArr = useMemo(() => props.data.filter((object) => object["type"] === "sauce"), [props.data]);
  const mainArr = useMemo(() => props.data.filter((object) => object["type"] === "main"), [props.data]);


  
  const onScroll = () => {

  
    //область видимости
    const targetPositionTop = menuRef.current.getBoundingClientRect().y;
    const targetPositionBottom = window.innerHeight;

    //координаты заголовков списка
    const coordinates = [
      {
        name: "buns",
        position: bunsScrollRef.current.getBoundingClientRect().y,
      },
      {
        name: "sauces",
        position: saucesScrollRef.current.getBoundingClientRect().y,
      },
      {
        name: "mains",
        position: mainsScrollRef.current.getBoundingClientRect().y,
      },
    ];

    //Фильтрую координаты, которые попадают в область видимости
    const currentView = coordinates.filter((item) => {
      if (
        item.position > targetPositionTop &&
        item.position < targetPositionBottom
      ) {
        return item;
      }
    });


   //Проверяем сколько осталось заголовков в зоне видимости, фильтруем самый верхний и активируем его
 
    const filteredmenu = currentView.length > 1
    ? currentView.reduce(function (itemOne, itemTwo) {
      return itemOne.position < itemTwo.position
        ? itemOne.name
        : itemTwo.name;
    })
    : currentView.length === 1
    ?  currentView[0].name
    : undefined;

    //проверяем что в зоне видимости есть заголовок и он не равен текущему значению
  
    if (filteredmenu && filteredmenu !== activeMenu) {
      

      
        dispatch({
          type: CHANGE_ACTIVE_MENU,
          menu: filteredmenu,
        });
      
    } 
  
  };



  //клики меню

  const handleClick = (activeMenu) => {
    if (activeMenu === "buns") {
      bunsScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (activeMenu === "sauces") {
      saucesScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (activeMenu === "mains") {
      mainsScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    dispatch({
      type: CHANGE_ACTIVE_MENU,
      menu: activeMenu,
    });
  };

  return (
    <div className={styles.burger_ingredients}>
      <div className={styles.button_container}>
        <ul className={styles.button_list}>
          <li className={styles.button_item}>
            <Tab
              value="buns"
              active={activeMenu === "buns"}
              onClick={handleClick}
            >
              Булки
            </Tab>
          </li>
          <li className={styles.button_item}>
            <Tab
              value="sauces"
              active={activeMenu === "sauces"}
              onClick={handleClick}
            >
              Соусы
            </Tab>
          </li>
          <li className={styles.button_item}>
            <Tab
              value="mains"
              active={activeMenu === "mains"}
              onClick={handleClick}
            >
              Начинки
            </Tab>
          </li>
        </ul>
      </div>
      <div className={styles.menu_container} onScroll={onScroll} ref={menuRef}>
        <div className={styles.menu}>
          <h2 className="text text_type_main-medium" ref={bunsScrollRef}>
            Булки
          </h2>
          <ul className={styles.list}>
            {bunsArr.map((item) => (
              <IngredientItem
                item={item}
                openModal={props.openModal}
                key={item._id}
              />
            ))}
          </ul>
        </div>

        <div className={styles.menu}>
          <h2 className="text text_type_main-medium" ref={saucesScrollRef}>
            Соусы
          </h2>
          <ul className={styles.list}>
            {sauceArr.map((item) => (
              <IngredientItem
                item={item}
                openModal={props.openModal}
                key={item._id}
              />
            ))}
          </ul>
        </div>

        <div className={styles.menu} ref={mainsScrollRef}>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <ul className={styles.list}>
            {mainArr.map((item) => (
              <IngredientItem
                item={item}
                openModal={props.openModal}
                key={item._id}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.array,
  openModal: PropTypes.func,
};
