import {useNavigate} from "react-router-dom"
import { useEffect} from "react";
export const LogOut = () => {
    const navigate = useNavigate()
    const LogOut = () =>{
        const originalToken = localStorage.setItem('token' , "")
        navigate("/")
        }
    useEffect(()=>{
        LogOut()
    },[])
}