import React from 'react';
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

export default function AppHeader() {
  const textStyles = "text text_type_main-default";

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.l_menu_box}>
          <div className={styles.link_container}>
            <BurgerIcon />
            <a
              href="#"
              className={`${styles.link} text text_type_main-default`}
            >
              Конструктор
            </a>
          </div>
          <div className={styles.link_container}>
            <ListIcon />
            <a
              href="#"
              className={`${styles.link} text text_type_main-default`}
            >
              Лента Заказов
            </a>
          </div>
        </div>

        <Logo />

        <div className={styles.r_menu_box}>
          <div className={styles.link_container}>
            <ProfileIcon />
            <a
              href="#"
              className={`${styles.link} text text_type_main-default`}
            >
              Личный Кабинет
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
