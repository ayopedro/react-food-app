import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css'

export default function HeaderCartButton(props) {
  const [btnHighlight, setBtnHighlight] = useState(false)
  const cartCtx = useContext(CartContext);
  
  
  const { items } = cartCtx;

  const numOfCartItems = items.reduce((curNum, item)=>{
    return curNum + item.amount;
  }, 0)

  

  const btnClasses = `${styles.button} ${btnHighlight ? styles.bump : ''}`;

  useEffect(()=>{
    if(items.length === 0){
      return;
    }
    setBtnHighlight(true);

    const timer = setTimeout(()=>{
      setBtnHighlight(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [items])

  return (
    <button className={btnClasses} onClick={props.onclick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>
        {numOfCartItems}
      </span>
    </button>
  )
}
