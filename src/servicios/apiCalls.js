import axios from "axios";

const URL_USER = "http://localhost:2000/users";
const URL_APP = "http://localhost:2000/appointsment";

//login de usuario
export const login = (data) => {
  return axios
    .post(`${URL_USER}/login`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

//register de usuario
export const register = (data) => {
  return axios
    .post(`${URL_USER}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

//extraer datos del usuario de la base de datos
export const getProfile = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`${URL_USER}`, config)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
export const getAllArtists = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`${URL_USER}/artistsUser`, config)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

//modificación datos del usuario registrado ,excepto si es admin
export const modifyProfile = (token, data, ID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (ID === undefined) {
    return axios
      .put(`${URL_USER}`, data, config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  } 
  else {
    return axios
      .put(`${URL_USER}/${ID}`, data, config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  }
};

//borrar usuario registrado ,excepto si es admin
export const deleteProfile = (token, ID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .delete(`${URL_USER}/${ID}`, config)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

//reactivar cuenta solo admin
export const reactiveProfile = (token, ID, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .patch(`${URL_USER}/${ID}`, data, config)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

//extraer cita / citas
export const getAppointment = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`${URL_APP}`, config)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

//borrar cita
export const createAppointment = (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .post(`${URL_APP}/${data.idArtist}`, data, config)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

//modificar cita
export const modifyAppointment = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .post(`${URL_APP}`, config)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

//borrar cita
export const deleteAppointment = (token, idAppoint) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .delete(`${URL_APP}/${idAppoint}`, config)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
