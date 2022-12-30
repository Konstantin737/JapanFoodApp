import { useContext, useEffect, useState } from 'react';
import CartContex from '../../store/cart-context';
import styles from './HeaderCardButton.module.css'
import CartIcon from '../Cart/CardIcon';

const HeaderCardButton = ({onClick}) => {
const [isButtonAnimated, setIsButtonAnimated] = useState(false)//для отслеживания и перерисовки компонента
const cartContex = useContext(CartContex);

const cartItemsNumber = cartContex.items.reduce((currentValue, item) => { //теперь у нас в корзине отображается 0
    return currentValue + item.amount;
}, 0);// 0-начальное значение

const buttonClasses = `${styles.button} ${isButtonAnimated ? styles.bump : ''}`// если isButtonAnimated = true то добавляем класс bump

useEffect(()=>{
    if(cartContex.items.length === 0) {
        return;
    }
    setIsButtonAnimated(true);

    const timer = setTimeout(()=>{
        setIsButtonAnimated(false)
    }, 300)

    return () => {
        clearTimeout(timer);//считается хорошей практикой очищать таймаут, если мы будем добавлять сразу много элементов в корзину у нас будет создаватся новый таймер, и надо обнулять предыдущий
    }
},[cartContex.items]); //мы хотим в переменную buttonClasses добавлять класс bump и потом ставить таймер, чтоб через какое то время удалять этот класс

return (
<button className={buttonClasses} onClick={onClick}> {/*по клику запускаем функцию открытия корзины*/}
    <span className={styles.icon}>
        <CartIcon/>
    </span>
    <span>Корзина</span>
    <span className={styles.badge}>{cartItemsNumber}</span>
</button>
)}

export default HeaderCardButton;