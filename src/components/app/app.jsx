import React from "react";
import styles from "./app.module.css";

import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import Modal from "../modal/modal.jsx";
import IngredientsDetails from "../Ingredients-details/ingredients-details.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../services/actions/data-actions.jsx";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
  CLOSE_MODAL,
  ORDER_POPUP_ISOPENED,
  INGREDIENT_POPUP_ISOPENED,
} from "../../services/actions/popup-actions";
import { makeOrder } from "../../services/actions/cart-actions.jsx";

function App() {
  const dispatch = useDispatch();

  const { data, dataRequestSuccess } = useSelector((store) => store.mainData);
  const { popup, isOpened, ingredient } = useSelector((store) => store.popup);
  const { items, dataSendSuccess } = useSelector((store) => store.cart);
  
  React.useEffect(() => {
    dispatch(getData());
  }, []);

  const openModal = (e) => {
    if (e.target.textContent === "Оформить заказ") {
      dispatch({
        type: ORDER_POPUP_ISOPENED,
      });
    

      dispatch(makeOrder(items));
    } else {
      dispatch({
        type: INGREDIENT_POPUP_ISOPENED,
        id: e.currentTarget.id,
      });
    }
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>
        <DndProvider backend={HTML5Backend}>
          <section className={styles.content}>
            {dataRequestSuccess && (
              <BurgerIngredients data={data} openModal={openModal} />
            )}
            {dataRequestSuccess && <BurgerConstructor openModal={openModal} />}
          </section>
        </DndProvider>
      </main>

      {isOpened && dataSendSuccess && popup === "order popup" && (
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
      {isOpened && popup === "ingredients popup" && (
        <Modal closeModal={closeModal}>
          <IngredientsDetails data={data} ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
}

export default App;
