import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export default function BurgerConstructor({ data, openModal, bun }) {
  console.log(bun);

  const otherIngredients = data.filter((item) => item.type != "bun");

  return (
    <div className={styles.burger_constructor}>
      <div className={styles.bun_item}>
        <ConstructorElement
          type={"top"}
          text={bun.name + " (верх)"}
          thumbnail={bun.image}
          price={bun.price}
          isLocked={true}
        />
      </div>
      <div className={styles.scrollBlock}>
        <ul className={styles.list}>
          {otherIngredients.map((elem, index) => {
            return (
              <li key={index} className={styles.card} id={elem._id}>
                <DragIcon />
                <ConstructorElement
                  text={elem.name}
                  thumbnail={elem.image}
                  price={elem.price}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.bun_item}>
        <ConstructorElement
          type={"bottom"}
          text={bun.name + " (низ)"}
          thumbnail={bun.image}
          price={bun.price}
          isLocked={true}
        />
      </div>

      <div className={styles.checkout}>
        <div className={styles.price_box}>
          <p className={`${styles.total_price} text text_type_digits-medium`}>
            333
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
