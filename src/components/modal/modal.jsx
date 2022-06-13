import React, {useEffect, useState}  from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import IngredientsDetails from '../Ingredients-details/ingredients-details.jsx';

const popup = document.querySelector('#popup');

export default function Modal(props) {

    const escClose = (e) => {


        if (e.key === "Escape") {
       
          props.closeModal()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', escClose);
        return () => {
          document.removeEventListener('keydown', escClose);
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

Modal.propTypes = {
    data: PropTypes.array,
    closeModal: PropTypes.func,
    escClose: PropTypes.func,
    popupType: PropTypes.string,
    ingredient: PropTypes.string

};