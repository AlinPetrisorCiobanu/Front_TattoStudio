import { Input } from "../../common/Input/Input";
import { useState , useEffect} from "react";
import { login } from "../../servicios/apiCalls";
import { jwtDecode } from "jwt-decode";
import {useNavigate} from "react-router-dom"

export const Login = () => {
    const [loginDetails,setLoginDetails] = useState({
        email:"",
        password:""
    })

    const navigate = useNavigate()

    const inputHandler = (e) =>{
        setLoginDetails((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
        
    }

    const loginHand = () =>{
        login(loginDetails)
        .then((res)=>{
          const originalToken = res.token
          localStorage.setItem('token' ,originalToken)
          const decodedToken = jwtDecode(originalToken)
          navigate("/profile")
        })
        .catch((err)=>console.log(err))
      
    }
  
  return (
    <>
      <Input text="Email" type="email" name="email" handler={inputHandler} />
      <Input text="Pass" type="password" name="password" handler={inputHandler} />
      <button onClick={loginHand}>Enviar</button>
    </>
  );
}
