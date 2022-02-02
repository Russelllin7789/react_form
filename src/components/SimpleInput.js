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

  const {
    value: email,
    hasError: emailInputIsInvalid,
    isValueValid: emailIsValid,
    inputValueHandler: emailInputHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmail
  } = useInput(value => value.trim().length !== 0 && value.includes('@'))

  let formIsValid = false

  if (nameIsValid && emailIsValid) {
    formIsValid = true
  }

  const formSubmitHandler = (event) => {
    event.preventDefault()

    if (!nameIsValid || !emailIsValid) {
      return
    }

    console.log('user name:', name, 'user email:', email)
    resetName()
    resetEmail()
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
