import styles from './MealItemForm.module.css'
import Input from '../../UI/Input';
import { useRef, useState } from 'react';

const MealItemForm = (props) => {
    const [isAmountValid, setIsAmountValid] = useState(true);

    const amountInputRef = useRef()

    const submitHandler = (event) => {
        event.preventDefault();

        const inputAmount = amountInputRef.current.value;
        //если введенные данные не верны будем менять состояние isAmountValid на false
        if(inputAmount.trim().length === 0 || +inputAmount < 1 || inputAmount > 10) {
            setIsAmountValid(false);//и когда у нас не валидное состояние выведем текст
            return;
        }

        props.onAddToCart(+inputAmount); //если данные валидны то передаем их в пропс функцию onAddToCart
    }

    return <form className={styles.form} onSubmit={submitHandler}>
        <Input
            ref={amountInputRef}//так просто ref не работает для кастомных компонентов, нужно обернуть Input в Input.js в React.forwardRef()
            label ='Количество' input={{
                id: props.id,
                type: 'number',
                min: '1',
                step: '1',
                defaultValue: '1'
        }}/>
        <button>Добавить</button>
        {!isAmountValid && <p>Пожалуйста введите количество от 1 до 10</p>}
    </form>
}

export default MealItemForm;