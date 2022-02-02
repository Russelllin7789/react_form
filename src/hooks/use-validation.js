import { useState } from 'react'

const useValidation = (validationFunc) => {
  const [value, setValue] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  const isValueValid = validationFunc(value)
  const hasError = !isValueValid && isTouched

  const inputChangeHandler = (event) => {
    setValue(event.target.value)
  }

  const inputBlurHandler = () => {
    setIsTouched(true)
  }

  const reset = () => {
    setValue('')
    setIsTouched(false)
  }

  return {
    value,
    isValueValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset
  }
}

export default useValidation