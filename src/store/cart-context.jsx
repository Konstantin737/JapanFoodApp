import React from "react";

const CartContex = React.createContext({
   items: [],//пустой массив элементов
   totalAmount: 0,//полная сумма
   addItem: (item) => {},//функция которая будет добавлятся в корзину эл-т
   removeItem: (id) => {},//функция которая будет удалять из корзины эл-т
});

export default CartContex;