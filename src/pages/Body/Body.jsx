import {Navigate , Route ,Routes} from "react-router-dom"
import { Home } from "../Home/Home"
import { Login } from "../Login/Login"
import { Register } from "../Register/Register"
import { Profile } from "../Profile/Profile"
import { ModifyUser } from "../ModifyUser/Modify"
import { DeleteUser } from "../ModifyUser/DeleteUser/Delete"
import { ActivationUser } from "../Activation/Activation"
import { Galery } from "../Galery/Galeria"
import { Appoints } from "../Appointments/Appoints"
import { ModifyAppoints } from "../Appointments/ModifyAppoints/ModifyAppoints"
import { DeleteAppoints } from "../Appointments/DeleteAppoints/DeleteAppoints"
import "./Body.css"

export const Body = () =>{
    return(
    <Routes>
        <Route path="*" element={<Navigate to = "/"/> }/>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/modify/user" element={<ModifyUser/>}/>
        <Route path="/delete/user" element={<DeleteUser/>}/>
        <Route path="/activation" element={<ActivationUser/>}/>
        <Route path="/galery" element={<Galery/>}/>
        <Route path="/appointment" element={<Appoints/>}/>
        <Route path="/modify/appoints" element={<ModifyAppoints/>}/>
        <Route path="/delete/appoints" element={<DeleteAppoints/>}/>
    </Routes>
    )
}