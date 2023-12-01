import {Navigate , Route ,Routes} from "react-router-dom"
import { Home } from "../Home/Home"
import { Login } from "../Login/Login"
import { Register } from "../Register/Register"
import { Profile } from "../Profile/Profile"
import { Galery } from "../Galery/Galeria"
import { Appoints } from "../Appointments/Appoints"
import "./Body.css"

export const Body = () =>{
    return(
    <Routes>
        <Route path="*" element={<Navigate to = "/"/> }/>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/galery" element={<Galery/>}/>
        <Route path="/appointment" element={<Appoints/>}/>
    </Routes>
    )
}