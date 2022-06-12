import React, {useEffect, useState}  from 'react';
import styles from './modal.module.css';
import { CloseIcon, CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import IngredientsDetails from '../Ingredients-details/ingredients-details.jsx';

const popup = document.querySelector('#popup');

export default function Modal(props) {

    //console.log(props.popupType);

    useEffect(() => {
        document.addEventListener('keydown', props.escClose);
        return () => {
          document.removeEventListener('keydown', props.escClose);
        }
    }, [])

    return createPortal(
        (
        <>
            
                <div className={styles.popup}>
                    
                    
                    {props.popupType === 'order popup' ? <OrderDetails closeModal={props.closeModal} /> : <IngredientsDetails data={props.data} ingredient={props.ingredient} closeModal={props.closeModal} />}
                        
                        
                    
                </div>
            
                <ModalOverlay closeModal={props.closeModal} />

        </>
        ), popup

    );
}