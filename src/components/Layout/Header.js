import React from 'react';
import meals from '../../assets/meals.jpeg';
import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
  return (
      <>
          <header className={styles.header}>
              <h1>HipeeFoods</h1>
              <HeaderCartButton 
                  onclick={props.onShowCart}
              />
          </header>
          <div className={styles['main-image']}>
              <img src={meals} alt='A table full of nice meals' />
          </div>
      </>
  )
}

export default Header;