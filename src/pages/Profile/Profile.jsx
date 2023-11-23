import { useState ,useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
import { getProfile } from "../../servicios/apiCalls";

export const Profile = () => {
  const [profile,setProfile]=useState({})

    const profileBBD = () =>{
        const originalToken = localStorage.getItem('token')
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
    <div>
      <h1>Hola sr {profile.name} {profile.lastName}</h1>
      <h3>con DNI:{profile.idUser}</h3>
      <h3>Y nr:{profile.tlf}</h3>
      <h3>nacido en : {profile.birthday}</h3>
      <h3>email : {profile.email}</h3>
      <h3>y su contraseña : {profile.password}</h3>
    </div>
      
    </>
  );
};
