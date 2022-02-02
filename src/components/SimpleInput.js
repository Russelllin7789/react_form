import { useState } from 'react'

const SimpleInput = (props) => {
  const [name, setName] = useState('')
  const [nameIsTouched, setNameIsTouched] = useState(false)

  const nameIsValid = name.trim().length !== 0
  // name input was truly invalid when the input content was invalid and the input was touched
  const nameInputIsInvalid = !nameIsValid && nameIsTouched

  let formIsValid = false

  if (nameIsValid) {
    formIsValid = true
  }

  const nameInputHandler = (event) => {
    setName(event.target.value)
  }

  const nameInputBlurHandler = (event) => {
    // because input could never be blured without focused first
    setNameIsTouched(true)
  }

  const formSubmitHandler = (event) => {
    event.preventDefault()
    setNameIsTouched(true)

    if (!nameIsValid) {
      return
    }

    console.log('user name:', name)
    setName('')
    setNameIsTouched(false)
  }

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control'

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
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
