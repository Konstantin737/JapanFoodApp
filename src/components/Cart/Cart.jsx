import styles from './Cart.module.css'
import Modal from '../UI/Modal'
import { useContext } from 'react'
import CartContex from '../../store/cart-context'
import CartItem from './CartItem'

const Cart = ({onHideCart}) => {
    const cartContex = useContext(CartContex);

    const totalAmount = `$${Math.abs(cartContex.totalAmount).toFixed(2)}`;
    const hasItems = cartContex.items.length > 0; //если будет больше 0 тут будет true, в обратном false

    const removeCartItemHandler = (id) => { //удаление элемента в корзине на кнопку onRemove
        cartContex.removeItem(id);
    }

    const addCartItemHandler = (item) => { //добавление элемена в корзине на кнопку onAdd
        cartContex.addItem({...item, amount: 1});
    }

    const cartItems = 
        <ul className={styles['cart-items']}>
            {cartContex.items.map((item) => (
                <CartItem 
                    key ={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={addCartItemHandler.bind(null, item)}
                    onRemove={removeCartItemHandler.bind(null, item.id)}
                />
            ))}
        </ul>

    return <Modal onHideCart={onHideCart}> {/*onHideCart так же передал в модальное окно, чтоб закрывать Cart по клику на backdrop*/}
        {cartItems}
        <div className={styles.total}>
            <span>Итого</span>
            <span>{totalAmount}</span>
        </div>
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={onHideCart}>Закрыть</button> {/*на клик функция закрытия из App*/}
            {hasItems && <button className={styles.button}>Заказать</button>} {/*теперь кнопка отобразится только при hasItems, если есть элементы в cartContex.items*/}
        </div>
    </Modal>
}

export default Cart;