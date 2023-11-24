import { Input } from "../../common/Input/Input";
import { useState , useEffect} from "react";
import { login } from "../../servicios/apiCalls";
// import { jwtDecode } from "jwt-decode";
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import { userLogin } from "../userSlice";


export const Login = () => {

    const [loginDetails,setLoginDetails] = useState({
        email:"",
        password:""
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const inputHandler = (e) =>{
        setLoginDetails((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
        
    }

    const loginHand = (date) =>{
        login(date)
        .then((res)=>{
          const originalToken = res.token
          dispatch(userLogin({credentials : originalToken}))          
        })
        .catch((err)=>console.log(err))
        navigate("/")
    }
    
  return (
    <>
      <Input text="Email" type="email" name="email" handler={inputHandler} />
      <Input text="Pass" type="password" name="password" handler={inputHandler} />
      <button onClick={()=>loginHand(loginDetails)}>Enviar</button>
    </>
  );
}
