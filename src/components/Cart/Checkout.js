import { useRef, useState } from 'react';
import styles from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChar = value => value.trim().length >= 5;

function Checkout(props) {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        address: true,
        postal: true,
        city:  true
    });
    
    const nameInputRef = useRef();
    const addressInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();
    const checkoutHandler = event => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredAddressIsValid = !isEmpty(enteredAddress);
        const enteredPostalIsValid = isFiveChar(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputValidity({
            name: enteredNameIsValid,
            address: enteredAddressIsValid,
            postal: enteredPostalIsValid,
            city:  enteredCityIsValid
        })

        const formIsValid = 
        enteredNameIsValid && 
        enteredAddressIsValid && 
        enteredPostalIsValid && 
        enteredCityIsValid;

        if(!formIsValid){
            return;
        }

        //submit cart data
        props.onConfirm({
            name: enteredName,
            address: enteredAddress,
            postal: enteredPostal,
            city: enteredCity
        })
    }

    const nameContolClass = `${styles.control} ${formInputValidity.name ? '' : styles.invalid}`;
    const addressControlClass = `${styles.control} ${formInputValidity.address ? '' : styles.invalid}`;
    const postalControlClass = `${styles.control} ${formInputValidity.postal ? '' : styles.invalid}`;
    const cityControlClass = `${styles.control} ${formInputValidity.city ? '' : styles.invalid}`;

  return (
    <form onSubmit={checkoutHandler}>
        <div className={nameContolClass}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameInputRef} />
            {!formInputValidity.name && <p>Please enter a valid name</p>}
        </div>
        <div className={addressControlClass}>
            <label htmlFor='address'>Address</label>
            <input type='text' id='address' ref={addressInputRef}  />
            {!formInputValidity.address && <p>Please enter a valid address</p>}
        </div>
        <div className={postalControlClass}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' ref={postalInputRef}  />
            {!formInputValidity.postal && <p>Please enter a valid postal code</p>}
        </div>
        <div className={cityControlClass}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef}  />
            {!formInputValidity.city && <p>Please enter a valid city</p>}
        </div>
        <div className={styles.actions}>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button>Confirm</button>
        </div>
    </form>
  )
}

export default Checkout;