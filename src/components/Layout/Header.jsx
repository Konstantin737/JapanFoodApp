import React from "react";
import sushiImage from '../../assets/sushi.jpg'
import styles from './Header.module.css'
import HeaderCardButton from "./HeaderCardButton";

const Header = ({onShowCart}) => {
    return <>
        <header className={styles.header}>
            <h1>Японская Кухня</h1>
            <HeaderCardButton onClick={onShowCart}/> {/*передаем дальше функцию открытия корзины, к кнопке*/}
        </header>
        <div className={styles['main-image']}>
            <img src={sushiImage} alt ='Блюда японской кухни'/>
        </div>
    </>
}

export default Header;