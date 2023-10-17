import react from "react"
import style from "./checkout.module.css"

import useInput from "../../../hooks/UseInput"
const Checkout = (props) =>{
    const {value: enteredName, 
        hasError: nameHasError, 
        inputChangeHandler: nameChangeHandler,
         blurHandler: nameBlurHandler, 
         IsValueValid: isNameValid, 
         reset: nameReset} =useInput((value) => value.trim() !== "")
    const {value: enteredStreet, 
        hasError: streetHasError, 
        inputChangeHandler: streetChangeHandler,
         blurHandler: streetBlurHandler, 
         IsValueValid: isStreetValid, 
         reset: streetReset} =useInput((value) => value.trim() !== "")
    const {value: enteredPostal, 
        hasError: postalHasError, 
        inputChangeHandler: postalChangeHandler,
         blurHandler: postalBlurHandler, 
         IsValueValid: isPostalValid, 
         reset: postalReset} =useInput((value) => value.trim().length >= 2)
    const {value: enteredCity, 
        hasError: cityHasError, 
        inputChangeHandler: cityChangeHandler,
         blurHandler: cityBlurHandler, 
         IsValueValid: isCityValid, 
         reset: cityReset} =useInput((value) => value.trim().length >= 2)
    const submitHandler = (e) =>{
        e.preventDefault()
        if(!formValidty){
            return
        }
        const userData = {
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal: enteredPostal
        }
        props.onSubmitOrder(userData)
        nameReset()
        streetReset()
        postalReset()
        cityReset()
    }
    let formValidty = false
    if(isCityValid && isPostalValid && isNameValid && isStreetValid){
        formValidty = true
    }
    return<form onSubmit={submitHandler} className={style.form}>
        <div className={style.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" value={enteredName} onChange={nameChangeHandler} onBlur={nameBlurHandler}/>
            {nameHasError && <p>Enter A valid name!</p>}
        </div>
        <div className={style.control}>
            <label htmlFor="street">Street Name</label>
            <input type="text" id="street" value={enteredStreet} onChange={streetChangeHandler} onBlur={streetBlurHandler}/>
            {streetHasError && <p>Enter a valid Street name!</p>}
        </div>
        <div className={style.control}>
            <label htmlFor="postal">Postal Code</label>
            <input type="text" id="postal" value={enteredPostal} onChange={postalChangeHandler} onBlur={postalBlurHandler}/>
            {postalHasError && <p className="">Enter a valid Postal Code!</p>}
        </div>
        <div className={style.control}>
            <label htmlFor="city">City</label>
            <input type="text" id="city" value={enteredCity} onChange={cityChangeHandler} onBlur={cityBlurHandler}/>
            {cityHasError && <p>Enter a valid Postal Code!</p>}
        </div>
        <div className={style.actions}>
            <button type="button" onClick={props.onCancel} className={style.buttons}>Cancel</button>
            <button disabled={!formValidty} className={!formValidty ? style.disabled  : style.submit}>Submit</button>
        </div>
    </form>

}
export default Checkout