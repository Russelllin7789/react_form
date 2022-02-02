import { useState, useEffect } from 'react'

const SimpleInput = (props) => {
  const [name, setName] = useState('')
  const [nameIsValid, setNameIsValid] = useState(false)
  const [nameIsTouched, setNameIsTouched] = useState(false)

  useEffect(() => {
    if (nameIsValid) {
      console.log('name input is valid.')
    }
  }, [nameIsValid])

  const nameInputHandler = (event) => {
    setName(event.target.value)

    if (event.target.value.trim().length > 0) {
      setNameIsValid(true)
    }
  }

  const nameInputBlurHandler = (event) => {
    // because input could never be blured without focused first
    setNameIsTouched(true)

    if (name.trim().length < 1) {
      setNameIsValid(false)
    }
  }

  const formSubmitHandler = (event) => {
    event.preventDefault()
    setNameIsTouched(true)

    if (name.trim().length < 1) {
      setNameIsValid(false)
      return
    }

    setNameIsValid(true)
    console.log('user name:', name)
    setName('')
  }

  // name input was truly invalid when the input content was invalid and the input was touched
  const nameInputIsInvalid = !nameIsValid && nameIsTouched
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
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
