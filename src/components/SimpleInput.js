import { useState } from 'react'

const SimpleInput = (props) => {
  const [name, setName] = useState('')
  const [nameIsValid, setNameIsValid] = useState(true)

  const nameInputHandler = (event) => {
    setName(event.target.value)
  }

  const formSubmitHandler = (event) => {
    event.preventDefault()
    if (name.trim().length < 1) {
      setNameIsValid(false)
      return
    }

    setNameIsValid(true)
    console.log('user name:', name)
    setName('')
  }

  const nameInputClasses = nameIsValid ? 'form-control' : 'form-control invalid'

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={nameInputHandler} value={name} />
        {!nameIsValid && <p className='error-text'>Name must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
