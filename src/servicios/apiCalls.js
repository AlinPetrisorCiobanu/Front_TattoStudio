import axios from "axios";

const URL_USER = "http://localhost:2000/users";
const URL_APP = "http://localhost:2000/appointsment";

//login de usuario
export const login = async (data) => {
  try {
    const res = await axios.post(`${URL_USER}/login`, data);
    return res.data;
  } catch (error) {
    return "algo ha fallado" + error;
  }
}

//register de usuario
export const register = async (data) => {
  try {
    const res = await axios.post(`${URL_USER}`, data);
    return res.data;
  } catch (error) {
    return "algo ha fallado" + error;
  }
}

//extraer datos del usuario de la base de datos
export const getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`${URL_USER}` , config);
    return res.data;
  } catch (error) {
    return "algo ha fallado" + error;
  }
}

//modificación datos del usuario registrado ,excepto si es admin
export const modifyProfile = async (token , date , ID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.put(`${URL_USER}/${ID}` ,date , config );
    return res.data;
  } catch (error) {
    return "algo ha fallado" + error;
  }
}

//borrar usuario registrado ,excepto si es admin
export const deleteProfile = async (token, ID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.delete(`${URL_USER}/${ID}`, config);
    return res.data;
  } catch (error) {
    return "algo ha fallado" + error;
  }
}

//reactivar cuenta solo admin
export const reactiveProfile = async (token, ID , date) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  try {
    const res = await axios.patch(`${URL_USER}/${ID}`,date, config);
    return res.data;
  } catch (error) {
    return "algo ha fallado" + error;
  }
}

//borrar cita
export const createAppointment = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`${URL_APP}` , config);
    return res.data;
  } catch (error) {
    return "algo ha fallado" + error;
  }
}

//modificar cita
export const modifyAppointment = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`${URL_APP}` , config);
    return res.data;
  } catch (error) {
    return "algo ha fallado" + error;
  }
}

//borrar cita
export const deleteAppointment = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`${URL_APP}` , config);
    return res.data;
  } catch (error) {
    return "algo ha fallado" + error;
  }
}
