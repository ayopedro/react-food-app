import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import styles from './Cart.module.css'
import CartItem from './CartItem';
import Checkout from './Checkout';

export default function Cart(props) {
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);


    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const cartFilled = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.deleteItem(id);
    };
    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1})
    };
    const orderHandler = (e) => {
        setIsCheckingOut(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        const url = 'https://food-app-cf53b-default-rtdb.firebaseio.com/orders.json';

        await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems:cartCtx.items
            })
        });
        setIsSubmitting(false);
        setSubmitted(true);
        cartCtx.clearCart();
    };

    const cartItems = (
    <ul className={styles['cart-items']}>
        {cartCtx.items.map(item => 
        <CartItem 
            key={item.id} 
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
        />)}
    </ul>)

    const modalActions = <div className={styles.actions}>
    <button className={styles['button--alt']} onClick={props.onClose}>
        Close
    </button>
    {cartFilled && <button className={styles.button} onClick={orderHandler}>
        Order
    </button>}
    </div>  
  const cartModalContent = <>
      {cartItems}
  <div className={styles.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
  </div>
  {isCheckingOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
  {!isCheckingOut && modalActions}
  </>

    const isSubmittingModalContent = <p>Sending order data...</p>;
    const submittedModalContent = <>
        <p>Successfully submitted order!</p>
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onClose}>
                Close
            </button>
        </div>
    </>;

  return (
    <Modal onClose={props.onClose}>
        {!isSubmitting && !submitted && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && submitted && submittedModalContent}
    </Modal>
  )
}
