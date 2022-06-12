import { useRef, useState, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';




export default function BurgerIngredients(props) {

    const [current, setCurrent] = useState('buns');
    const [count, setCount] = useState({})

    const bunsScrollRef = useRef(null);
    const saucesScrollRef = useRef(null);
    const mainsScrollRef = useRef(null);

    const bunsArr = props.data.filter(object => object['type'] === 'bun');
    const sauceArr = props.data.filter(object => object['type'] === 'sauce');
    const mainArr = props.data.filter(object => object['type'] === 'main');


    const clickHandler = (e) => {
        props.addToCart(e.currentTarget.id);
        const id = e.currentTarget.id;
        
       
    }


    useEffect(() => {
        if (current === 'buns') {
            bunsScrollRef.current.scrollIntoView({ behavior: "smooth", block: 'nearest' });
        } else if (current === 'sauces') {
            saucesScrollRef.current.scrollIntoView({ behavior: "smooth", block: 'nearest' });
        } else if (current === 'mains') {
            mainsScrollRef.current.scrollIntoView({ behavior: "smooth", block: 'nearest' });
        }
    }, [current]);
    

   
 

    return (
        <div className={styles.burger_ingredients}>
            <div className={styles.button_container}>
                <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>Булки</Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>Начинки</Tab>
            </div>
            <div className={styles.menu}>
                <h2 className='text text_type_main-medium' ref={bunsScrollRef}>Булки</h2>
                <ul className={styles.list}>
                    {bunsArr.map((item) => (
                        <li key={item._id} id={item._id} className={styles.card} onClick={clickHandler}>
                            {count > 0 && <Counter count={count} />}
                            <img src={item.image} alt={item.name} />
                            <div className={styles.price_container}>
                                <p className='text text_type_digits-medium'>{item.price}</p>
                                <CurrencyIcon />

                            </div>
                            
                            <p className='text text_type_main-default'>{item.name}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.menu}>
                <h2 className='text text_type_main-medium' ref={saucesScrollRef}>Соусы</h2>
                <ul className={styles.list}>
                    {sauceArr.map((item) => (
                        <li key={item._id} className={styles.card} id={item._id} onClick={clickHandler}>
                            <img src={item.image} alt={item.name} />
                            <div className={styles.price_container}>
                                <p className='text text_type_digits-medium'>{item.price}</p>
                                <CurrencyIcon />

                            </div>
                            
                            <p className='text text_type_main-default'>{item.name}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.menu}>
                <h2 className='text text_type_main-medium' ref={mainsScrollRef}>Начинки</h2>
                <ul className={styles.list}>
                    {mainArr.map((item) => (
                        <li key={item._id} className={styles.card} id={item._id} onClick={clickHandler}>
                            <img src={item.image} alt={item.name} />
                            <div className={styles.price_container}>
                                <p className='text text_type_digits-medium'>{item.price}</p>
                                <CurrencyIcon />

                            </div>
                            
                            <p className='text text_type_main-default'>{item.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}