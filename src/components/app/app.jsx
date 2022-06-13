import React from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Modal from '../modal/modal.jsx';




function App() {

  const [cart, setCart] = React.useState([]);
  const [data, setData] = React. useState([]);
  const [popup, setPopup] = React. useState('orderPopup');
  const [isOpened, setIsOpened] = React.useState(false);
  const [ingredient, setIngredient] = React.useState('');
  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    fetch ('https://norma.nomoreparties.space/api/ingredients', 
    {headers: {"Content-Type": "application/json"}})
    .then(res => {if (res.ok) {return res.json();}})
    .then(res => {
      //console.log(res);
      setData(res.data);
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

  const escClose = (e) => {


    if (e.key === "Escape") {
   
      closeModal()
    }
  }

  const addToCart = (id) => {


    const newCart = [...cart];
    const item = data.filter(elem => elem._id === id);
    //console.log(item[0]);

    const atCart = newCart.findIndex(elem => elem._id === id);

    if (atCart != -1) {
      newCart[atCart].count = newCart[atCart].count + 1;
     
    } else {
      item[0].count = 1;
      newCart.push(item[0]);
    }   
    
    setCart(newCart);

    

    const priceTotal = cart.reduce((acc, item) => acc + item.price, 0); 
    setTotalPrice(priceTotal);
  }

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <h1 className='text text_type_main-large'>Соберите бургер</h1>
        <section className={styles.content}>
          <BurgerIngredients data={data} addToCart={addToCart} cartData={cart}/>
          <BurgerConstructor cartData={cart} openModal={openModal} total={totalPrice} />
        </section>
        
      </main>

      {isOpened && <Modal closeModal={closeModal} escClose={escClose} popupType={popup} data={data} ingredient={ingredient} />}
    </>
  );
}

export default App;
