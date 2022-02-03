import { useReducer } from 'react'

const initialState = {
  value: '',
  isTouched: false
}

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched }
  }
  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true }
  }
  if (action.type === 'RESET') {
    return { value: '', isTouched: false }
  }
  return initialState
}

const useValidation = (validateFunc) => {
  const [inputState, dispatchAction] = useReducer(inputStateReducer, initialState)

  const isValueValid = validateFunc(inputState.value)
  const hasError = !isValueValid && inputState.isTouched

  const inputChangeHandler = (event) => {
    dispatchAction({ type: 'INPUT', value: event.target.value })
  }

  const inputBlurHandler = () => {
    dispatchAction({ type: 'BLUR' })
  }

  const reset = () => {
    dispatchAction({ type: 'RESET' })
  }

  return {
    value: inputState.value,
    isValueValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset
  }
}

export default useValidation