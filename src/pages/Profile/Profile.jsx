import { useState ,useEffect } from "react";
import { getProfile } from "../../servicios/apiCalls";
import {useSelector} from "react-redux"
import { userDate } from "../userSlice";

export const Profile = () => {
  const [profile,setProfile]=useState({})

  const originalToken = useSelector(userDate).credentials
    const profileBBD = (date) =>{
        getProfile(date)
       .then((res)=>{
            const profiles = res
            setProfile(profiles)
        })
        .catch((err)=>console.log(err))
    }
    useEffect(()=>{
        profileBBD(originalToken)
    },[originalToken])

  return (
    <>
    <div>
      <h1>Hola sr/a {profile.name}</h1>
      <h1>apellido :{profile.lastName}</h1>
      <h3>con DNI:{profile.idUser}</h3>
      <h3>Y nr:{profile.tlf}</h3>
      <h3>nacido en : {profile.birthday}</h3>
      <h3>email : {profile.email}</h3>
    </div>
      
    </>
  );
};
