import { useReducer } from "react";
import CartContex from "./cart-context";

const defaultCartState = {
   items: [],
   totalAmount: 0
}

const cartReducer = (state, action) => {
   if(action.type === 'ADD_ITEM') { // 
      // const updatedItems = state.items.concat(action.item);
      const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
      const existingCartItemIndex = state.items.findIndex(item => {
         return item.id === action.item.id;
      })//индекс существующего элемента корзины
      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItem;
      let updatedItems;

      if(existingCartItem) {
         updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount,
         }
         updatedItems = [...state.items];
         updatedItems[existingCartItemIndex] = updatedItem;
      } else {
         updatedItem = {
            ...action.item,
         }
         updatedItems = state.items.concat(updatedItem);
      }

      return {
         items: updatedItems,
         totalAmount: updatedTotalAmount
      }
   }

   if(action.type === 'REMOVE_ITEM') {
         const existingCartItemIndex = state.items.findIndex((item) => {
         return item.id === action.id;
      });//индекс существующего элемента корзины)

      const existingCartItem = state.items[existingCartItemIndex];//существующий элемент корзины)

      const updatedTotalAmount = state.totalAmount - existingCartItem.price;

      let updatedItems;
      if(existingCartItem.amount === 1) {//если в корзине последний элемент этого товара
         updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {//или уменьшаем кол-во блюд, если это не последний элемент
         const updatedItem = {
            ...existingCartItem, 
            amount: existingCartItem.amount - 1,
         }
         updatedItems = [...state.items];
         updatedItems[existingCartItemIndex] = updatedItem;
      }
      return {
         items: updatedItems,
         totalAmount: updatedTotalAmount,
      }
   }

   return defaultCartState;
}

const CartContexProvider = (props) => { //цель - управлять данными контекста корзины и предоставлять всем компонентам которые имеют к этому контексту доступ
   const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState) //первое элю массива это последнее состояние, второй эл. массива это функция которая будет предоставлять экшн для редюсер аdispatchCartAction

   const addItemHandler = (item) => {
      dispatchCartAction({
         type: 'ADD_ITEM',
         item: item,
      });
   }; //эта функция будет добавлять

   const removeItemHandler = (id) => {
      dispatchCartAction({
         type: 'REMOVE_ITEM',
         id: id,
      });
   }; //эта функция будет удалять

   const cartContex = {
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem:  addItemHandler,
      removeItem: removeItemHandler, 
   }
   return <CartContex.Provider value={cartContex}>{props.children}</CartContex.Provider> //теперь можно оборачивать в этот компонент то, что будет иметь доступ к его контексту
}

export default CartContexProvider;