import React from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Modal from '../modal/modal.jsx';
import IngredientsDetails from '../Ingredients-details/ingredients-details.jsx';
import OrderDetails from '../order-details/order-details.jsx';




function App() {

  const [data, setData] = React. useState([]);
  const [popup, setPopup] = React. useState('orderPopup');
  const [isOpened, setIsOpened] = React.useState(false);
  const [ingredient, setIngredient] = React.useState('');
  const [bun, setBun] = React.useState({});

  React.useEffect(() => {
    fetch ('https://norma.nomoreparties.space/api/ingredients', 
    {headers: {"Content-Type": "application/json"}})
    .then(res => {
      if (res.ok) {return res.json()};
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then(res => {
      //console.log(res);
      setData(res.data);
      const theBun = res.data.find(item => item.type === 'bun');
      setBun(theBun);
    })
    .catch(err => console.log(err));
  }, [])

  
  const openModal = (e) => {
    let popupType;
    let id;
    //console.log(e.currentTarget);
    if (e.target.textContent === 'Оформить заказ') {
      popupType = 'order popup';
    } else {
      popupType = 'ingredients popup';
      id = e.currentTarget.id;
    }

    


    setIngredient(id);
    setPopup(popupType);
    
    setIsOpened(true);
  }

  const closeModal = () => {
    setIsOpened(false);
  }

  

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <h1 className='text text_type_main-large'>Соберите бургер</h1>
        <section className={styles.content}>
          <BurgerIngredients data={data} openModal={openModal} />
          <BurgerConstructor openModal={openModal} data={data} bun={bun} />
        </section>
        
      </main>

      {isOpened && popup === 'order popup' && <Modal closeModal={closeModal}>
          <OrderDetails closeModal={closeModal} />
        </Modal>
      }
      {isOpened && popup === 'ingredients popup' && <Modal closeModal={closeModal}>
          <IngredientsDetails data={data} ingredient={ingredient} closeModal={closeModal} />
        </Modal>
      }
    </>
  );
}

export default App;
