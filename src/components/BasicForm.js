import useValidation from "../hooks/use-validation";

const BasicForm = (props) => {
  const {
    value: firstName,
    isValueValid: firstNameIsValid,
    hasError: firstNameHasError,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameInputBlurHandler,
    reset: resetFirstName
  } = useValidation(value => value.trim().length !== 0)

  const {
    value: lastName,
    isValueValid: lastNameIsValid,
    hasError: lastNameHasError,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    reset: resetlastName
  } = useValidation(value => value.trim().length !== 0)

  const {
    value: email,
    isValueValid: emailIsValid,
    hasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmail
  } = useValidation(value => value.trim().length !== 0 && value.includes('@'))


  let formIsValid = false
  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true
  }

  const formSubmitHandler = (event) => {
    event.preventDefault()

    if (!firstNameIsValid || !lastNameIsValid || !emailIsValid) {
      return
    }

    console.log('first:', firstName, 'last:', lastName, 'email:', email)
    resetFirstName()
    resetlastName()
    resetEmail()
  }

  const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control'
  const lastNameClasses = lastNameHasError ? 'form-control invalid' : 'form-control'
  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control'

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={firstNameClasses}>
          <label htmlFor='first_name'>First Name</label>
          <input
            type='text'
            id='first_name'
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameInputBlurHandler}
          />
          {firstNameHasError && <p className='error-text'>First Name must not be empty.</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='last_name'>Last Name</label>
          <input
            type='text'
            id='last_name'
            value={lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameInputBlurHandler}
          />
          {lastNameHasError && <p className='error-text'>Last Name must not be empty.</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
          type='text'
          id='email'
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailHasError && <p className='error-text'>Email must not be empty and should include '@'.</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
