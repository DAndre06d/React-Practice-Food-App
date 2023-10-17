import { useReducer } from "react"
const initialValue ={
    value:"",
    istouched: false
}
const useInput = (valueFunc) =>{
    const inputReducer = (state, action)=>{
        if(action.type === "INPUT"){
            return{
                value: action.value,
                istouched: state.istouched
            }
        } 
        if(action.type === "BLUR"){
            return{
                istouched: true,
                value:state.value
            }
        }
        if(action.type === "RESET"){
           return {
            istouched: false,
            value:""
        }
        }
        return initialValue
    }
    const [initalState, dispatch] = useReducer(inputReducer, initialValue)
    const inputChangeHandler = (e)=>{
        dispatch({type: "INPUT", value:e.target.value})
    }
    const blurHandler = ()=>{
        dispatch({type:"BLUR"})
    }
    const reset = () =>{
        dispatch({type: "RESET"})
    }
    const IsValueValid = valueFunc(initalState.value)
    const hasError = !IsValueValid && initalState.istouched
    return{
        value: initalState.value,
        hasError,
        inputChangeHandler,
        reset,
        blurHandler,
        IsValueValid
    }
}
export default useInput