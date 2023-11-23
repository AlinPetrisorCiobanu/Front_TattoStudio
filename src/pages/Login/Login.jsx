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



    const loginHand = (date) =>{
        login(date)
        .then((res)=>{
          const originalToken = res.token
          localStorage.setItem('token' ,originalToken)
          const decodedToken = jwtDecode(originalToken)
          navigate("/profile")
        })
        .catch((err)=>console.log(err))
    }
    const email = localStorage.getItem('emailReg')
      const password = localStorage.getItem('passReg')
      if(email&&password){
      const datos = {email,password}
        loginHand(datos)
    }
  return (
    <>
      <Input text="Email" type="email" name="email" handler={inputHandler} />
      <Input text="Pass" type="password" name="password" handler={inputHandler} />
      <button onClick={()=>loginHand(loginDetails)}>Enviar</button>
    </>
  );
}
