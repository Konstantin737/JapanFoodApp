import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartContexProvider from './store/CartContexProvider';

function App() {

  const [cartIsVisible, setCartIsVisible] = useState(false);//видимость корзины Сart отслеживание
  const showCartHandler = () => { //функция для того что бы корзина стала видимой
    setCartIsVisible(true);
  }
  const hideCartHandler = () => { //функция для того что бы корзина стала не видимой
    setCartIsVisible(false);
  }

  return (
    <CartContexProvider> {/*теперь мы можем пердоставлять информацию, весь контекст всем компонентам внутри*/}
      {cartIsVisible && <Cart onHideCart={hideCartHandler}/>} {/*пока cartIsVisible = false корзина не будет отображатся, так же передаем ф-цию закрытия корзины в нее*/}
      <Header onShowCart = {showCartHandler}/> {/*передаем в Header функцию открытия корзины*/}
      <main>
        <Meals/>
      </main>
    </CartContexProvider>
  );
}

export default App;
