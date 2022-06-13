import React from "react";
import styles from './ingredients-details.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';



export default function IngredientsDetails(props) {

    //console.log(props.ingredient);

    const index = props.data.findIndex(item => item._id === props.ingredient);
    //const ingredient = props.data[index];
    console.log(props.data[index]);

    return (
        <><div className={styles.popup_container}>
            <div className={styles.close_box}>
                <CloseIcon onClick={props.closeModal}/>
            </div>
            <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
            <img src={props.data[index].image_large}></img>
            <p className="text text_type_main-default">{props.data[index].name}</p>
            <div className={styles.container}>
                <div className={styles.data_box}>
                    <p className="text text_type_main-small text_color_inactive">Каллории, ккал</p>
                    <p className="text text_type_main-small text_color_inactive">{props.data[index].calories}</p>
                </div>
                <div className={styles.data_box}>
                    <p className="text text_type_main-small text_color_inactive">Белки, г</p>
                    <p className="text text_type_main-small text_color_inactive">{props.data[index].proteins}</p>
                </div>
                <div className={styles.data_box}>
                    <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
                    <p className="text text_type_main-small text_color_inactive">{props.data[index].fat}</p>
                </div>
                <div className={styles.data_box}>
                    <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_main-small text_color_inactive">{props.data[index].carbohydrates}</p>
                </div>
            </div>
        </div>
        </>
    )
}

IngredientsDetails.propTypes = {
    data: PropTypes.array,
    ingredient: PropTypes.string,
    closeModal: PropTypes.func

};