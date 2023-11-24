import {useNavigate} from "react-router-dom"
import { useEffect} from "react";
export const LogOut = () => {
    const navigate = useNavigate()
    const LogOut = () =>{
        localStorage.setItem('token' , "")
        localStorage.setItem('emailReg' ,"")
        localStorage.setItem('passReg' ,"")
        localStorage.setItem('tokenName',"")
        navigate("/")
        }
    useEffect(()=>{
        LogOut()
    },[])
}