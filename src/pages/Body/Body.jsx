import {Navigate , Route ,Routes} from "react-router-dom"
import { Home } from "../Home/Home"
import { Login } from "../Login/Login"
import { Register } from "../Register/Register"
import { Profile } from "../Profile/Profile"
import { ModifyUser } from "../ModifyUser/Modify"
import { DeleteUser } from "../DeleteUser/Delete"
import { ActivationUser } from "../Activation/Activation"
import { Galery } from "../Galery/Galeria"
import { Appoints } from "../CreateAppoints/Appoints"
import { ModifyAppoints } from "../ModifyAppoints/ModifyAppoints"
import { DeleteAppoints } from "../DeleteAppoints/DeleteAppoints"
import { LogOut } from "../Login/Logout"


export const Body = () =>{
    return(
    <Routes>
        <Route path="*" element={<Navigate to = "/"/> }/>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<LogOut/>}/>
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