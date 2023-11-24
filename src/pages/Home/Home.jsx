import { useEffect, useState } from "react";
import { userDate } from "../userSlice";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import "./Home.css";

export const Home = () => {
const [name, setName] = useState("user");

//con la ayuda de Redux traigo el token de la pagina de login
const token = useSelector(userDate).credentials;

//saco el nombre que tengo guardado en el token.
const getTokenName = () => {
  if (token) {
    const decodedToken = jwtDecode(String(token));
    setName(decodedToken.name);
  }
};
useEffect(() => {
  getTokenName();
}, [token]);


  return (
    <>
      {!token ? (
        <h1 className="h1Home">Registrate o Inicia Sesion</h1>
      ) : (
        <h1 className="h1Home">Bien Venid@ {name}</h1>
      )}
    </>
  );
};
