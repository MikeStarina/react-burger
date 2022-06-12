import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export default function BurgerConstructor({cartData, openModal, total}) {

    
    //console.log(cartData);

    const card = (cartData) => {

        const bun = cartData.findIndex(item => item.type === 'bun');

        if (bun != -1) {
            
            const otherIngredients = cartData.findIndex(item => item.type != 'bun');
            const noBun = cartData.filter(item => item.type != 'bun');

            return (
                <>
                    <li key={bun} className={styles.card} onClick={openModal} id={cartData[bun]._id}>
                                
                        <ConstructorElement type={'top'} text={cartData[bun].name + ' (верх)'} thumbnail={cartData[bun].image} price={cartData[bun].price} isLocked={otherIngredients != -1} />
                    </li>
                    {noBun.map((elem, index) => {

                
                    
                        return (
        
                        
                                <li key={index} className={styles.card} onClick={openModal} id={elem._id}>
                                    <DragIcon />
                                    <ConstructorElement text={elem.name} thumbnail={elem.image} price={elem.price} />
                                </li>
                            
                        )
                
                    })}

                    <li key={cartData[bun]._id + String(bun)} className={styles.card} onClick={openModal} id={cartData[bun]._id}>
                                
                        <ConstructorElement type={'bottom'} text={cartData[bun].name + ' (низ)'} thumbnail={cartData[bun].image} price={cartData[bun].price} isLocked={otherIngredients != -1} />
                    </li>
                </>
            )
        } else {

            return (
                <>
                    {cartData.map((elem, index) => {
                        return (
                        
                            
                            <li key={index} className={styles.card} onClick={openModal} id={elem._id}>
                                <DragIcon />
                                <ConstructorElement text={elem.name} thumbnail={elem.image} price={elem.price} />
                            </li>
                        
                        )
                    })}
                </>
            )
           
        }
    }

    const cardRender = card(cartData);

 
   

    return (
        <div className={styles.burger_constructor}>
            <ul className={styles.list}>
            {cardRender}
            
            </ul>
            <div className={styles.checkout}>
                <div className={styles.price_box}>
                    <p className={`${styles.total_price} text text_type_digits-medium`}>{total}</p>
                    <CurrencyIcon />
                </div>
                <Button type="primary" size="large" onClick={openModal}>Оформить заказ</Button>
            </div>
        </div>
    );


}