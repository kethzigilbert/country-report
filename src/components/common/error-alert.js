import { Alert } from "@mui/material"


const ErrorAlert = (props) =>{
    return(<Alert {...props}> {props.children}</Alert>)
}

export default ErrorAlert