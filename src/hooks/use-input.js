import { useState } from "react"

const useInput = (validateFunc) => {
  const [value, setValue] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  const isValueValid = validateFunc(value)
  const hasError = !isValueValid && isTouched

  const inputValueHandler = (event) => {
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
    value, hasError, isValueValid, inputValueHandler, inputBlurHandler, reset
  }
}

export default useInput