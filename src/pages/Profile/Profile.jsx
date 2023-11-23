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
      <h1>Hola sr {profile.name}</h1>
    </div>
      
    </>
  );
};
