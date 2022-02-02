import { useState } from 'react'
import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  // object destructuring for pull out the variables and functions within useInput(custom hooks)
  const {
    value: name,
    hasError: nameInputIsInvalid,
    isValueValid: nameIsValid,
    inputValueHandler: nameInputHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetName
  } = useInput(value => value.trim().length !== 0)

  // const [name, setName] = useState('')
  // const [nameIsTouched, setNameIsTouched] = useState(false)
  const [email, setEmail] = useState('')
  const [emailIsTouched, setEmailIsTouched] = useState(false)

  // const nameIsValid = name.trim().length !== 0
  const emailIsValid = email.trim().length !== 0 && email.includes('@')
  // name input was truly invalid when the input content was invalid and the input was touched
  // const nameInputIsInvalid = !nameIsValid && nameIsTouched
  const emailInputIsInvalid = !emailIsValid && emailIsTouched

  let formIsValid = false

  if (nameIsValid && emailIsValid) {
    formIsValid = true
  }

  // const nameInputHandler = (event) => {
  //   setName(event.target.value)
  // }

  const emailInputHandler = (event) => {
    setEmail(event.target.value)
  }

  // const nameInputBlurHandler = (event) => {
  //   // because input could never be blured without focused first
  //   setNameIsTouched(true)
  // }

  const emailInputBlurHandler = (event) => {
    // because input could never be blured without focused first
    setEmailIsTouched(true)
  }

  const formSubmitHandler = (event) => {
    event.preventDefault()
    // setNameIsTouched(true)

    if (!nameIsValid || !emailIsValid) {
      return
    }

    console.log('user name:', name, 'user email:', email)
    resetName()
    setEmail('')
    setEmailIsTouched(false)
  }

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control'
  const emailInputClasses = emailInputIsInvalid ? 'form-control invalid' : 'form-control'

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameInputHandler}
          onBlur={nameInputBlurHandler}
          value={name}
        />
        {nameInputIsInvalid && <p className='error-text'>Name must not be empty.</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input
          type='text'
          id='email'
          onChange={emailInputHandler}
          onBlur={emailInputBlurHandler}
          value={email}
        />
        {emailInputIsInvalid && <p className='error-text'>Email must not be empty and should include '@'.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
