import axios from "axios";

const URL_USER = "http://localhost:2000/users";
const URL_APP = "http://localhost:2000/appointsment";

//login de usuario
export const login = (data) => {
  return axios.post(`${URL_USER}/login`, data)
  .then((res)=>{
    return res.data;
  })
  .catch ((error)=>{
    return "algo ha fallado" + error;
  }) 
  
}

//register de usuario
export const register = (data) => {
 
    return axios.post(`${URL_USER}`, data)
    .then((res)=>{
      return res.data;
    })
   .catch ((error) => {
    return "algo ha fallado" + error;
  })
}

//extraer datos del usuario de la base de datos
export const getProfile = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
   return axios.get(`${URL_USER}` , config)
   .then((res)=>{
     return res.data;
   })
  .catch ((error) => {
    return "algo ha fallado" + error;
  })
}

//modificación datos del usuario registrado ,excepto si es admin
export const modifyProfile = (token , date , ID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
 return axios.put(`${URL_USER}/${ID}` ,date , config )
 .then((res)=>{
   return res.data;
 })
  .catch ((error) => {
    return "algo ha fallado" + error;
  })
}

//borrar usuario registrado ,excepto si es admin
export const deleteProfile = (token, ID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
return axios.delete(`${URL_USER}/${ID}`, config)
.then((res)=>{
  return res.data;
})
  .catch ((error) => {
    return "algo ha fallado" + error;
  })
}

//reactivar cuenta solo admin
export const reactiveProfile = (token, ID , date) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
 return axios.patch(`${URL_USER}/${ID}`,date, config)
 .then((res)=>{
   return res.data;

 })
  .catch ((error) => {
    return "algo ha fallado" + error;
  })
}

//extraer cita / citas
export const getAppointment = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${URL_APP}` , config)
 .then((res)=>{
   return res.data;

 })
  .catch ((error) => {
    return "algo ha fallado" + error;
  })
}

//borrar cita
export const createAppointment = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
return axios.get(`${URL_APP}` , config)
.then((res)=>{
  return res.data;
})
  .catch ((error) => {
    return "algo ha fallado" + error;
  })
}

//modificar cita
export const modifyAppointment = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
   return axios.get(`${URL_APP}` , config)
   .then((res)=>{
     return res.data;
   })
  .catch ((error) => {
    return "algo ha fallado" + error;
  })
}

//borrar cita
export const deleteAppointment = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${URL_APP}` , config)
  .then((res)=>{
    return res.data;

  })
  .catch ((error) => {
    return "algo ha fallado" + error;
  })
}
