import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export default function BurgerConstructor({cartData}) {

    //console.log(cartData);

    return (
        <div className={styles.burger_constructor}>
            <ul className={styles.list}>
            {cartData.map((item, index) => {
                return (
                    <li key={index} className={styles.card}>
                        <DragIcon type="primary" />
                        <ConstructorElement text={item.name} thumbnail={item.image} price={item.price} />
                    </li>        
                )
            })}
            
            </ul>
            <div className={styles.checkout}>
                <div className={styles.price_box}>
                    <p className="text text_type_digits-medium">999</p>
                    <CurrencyIcon />
                </div>
                <Button type="primary" size="large">Оформить заказ</Button>
            </div>
        </div>
    );


}