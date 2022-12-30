import React from 'react'
import styles from './Modal.module.css'
import ReactDOM from 'react-dom' //для работы с DOM - portalElement

const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onHideCart}></div> //на клик по фону функция закрытия корзины
}

const ModalWindow = (props) => {
    return <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>
}

const portalElement = document.getElementById('overlays');//получили DOM элемент из DOM и указываем его ReactDOM.createPortal вторым элементом, в него будет порталится <Backdrop> <ModalWindow>

const Modal = (props) => {
    return <>
        {ReactDOM.createPortal(<Backdrop onHideCart={props.onHideCart}/>, portalElement)} {/*передаем props закрытия корзины в Backdrop*/}
        {ReactDOM.createPortal(<ModalWindow>{props.children}</ModalWindow>, portalElement)}
    </>
}

export default Modal;