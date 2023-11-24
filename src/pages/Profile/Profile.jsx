import { useState ,useEffect } from "react";
import { getProfile } from "../../servicios/apiCalls";
import {useSelector} from "react-redux"
import { userDate } from "../userSlice";

export const Profile = () => {
  const [profile,setProfile]=useState({})

    const profileBBD = () =>{
        const originalToken = useSelector(userDate)
        getProfile(originalToken)
       .then((res)=>{
            const profiles = res
            setProfile(profiles)
        })
        .catch((err)=>console.log(err))
    }
    useEffect(()=>{
        profileBBD()
    },[])

  return (
    <>
    <br />
    <br />
    <br />
    <div>
      <h1>Hola sr {profile.name}</h1>
      <h1>{profile.lastName}</h1>
      <h3>con DNI:{profile.idUser}</h3>
      <h3>Y nr:{profile.tlf}</h3>
      <h3>nacido en : {profile.birthday}</h3>
      <h3>email : {profile.email}</h3>
      <h3>y su contraseña : {profile.password}</h3>
    </div>
      
    </>
  );
};
