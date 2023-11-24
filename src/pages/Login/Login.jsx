import { Input } from "../../common/Input/Input";
import { useState , useEffect} from "react";
import { login } from "../../servicios/apiCalls";
import { jwtDecode } from "jwt-decode";
import {useNavigate} from "react-router-dom"

export const Login = () => {

    const autoLogReg = () => {
      const email = localStorage.getItem('emailReg')
      const password = localStorage.getItem('passReg')
      if(email&&password){
      const datos = {email,password}
      login(datos)
      .then((res)=>{
        const originalToken = res.token
        localStorage.setItem('token' ,originalToken)
        const decodedToken = jwtDecode(originalToken)
        localStorage.setItem('tokenName' , decodedToken.name)
        navigate("/")
      })
      .catch((err)=>console.log(err))
      
    }
    }
    useEffect(()=>{
      autoLogReg()
    },[])
    

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
          localStorage.setItem('tokenName' , decodedToken.name)
          navigate("/")
        })
        .catch((err)=>console.log(err))
    }
    
    
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Input text="Email" type="email" name="email" handler={inputHandler} />
      <Input text="Pass" type="password" name="password" handler={inputHandler} />
      <button onClick={()=>loginHand(loginDetails)}>Enviar</button>
    </>
  );
}
