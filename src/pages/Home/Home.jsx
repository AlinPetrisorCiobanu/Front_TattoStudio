import { useEffect, useState } from "react";
import { userDate } from "../userSlice";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import principalHome from "../../img/Home/principal.png";
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
        <div className="principalHome">
          <img className="optionIMGHome" src={principalHome} />
        </div>
      ) : (
        <div className="principalHome">
          <div className="row d-flex text-center mt-4">
            <h3>
              <img className="optionIMGHome" src={principalHome} />
            </h3>
            <div>
              <hr />
              <h1>Jornada</h1>
              <h4>De Lunes a Viernes</h4>
              <h1>Horario</h1>
              <h3>DE 9:00 a 14:00</h3>
              <h4>Y</h4>
              <h3>DE 15:00 a 18:00</h3>
              <hr />
              <h4>
                Antes de elegir tu tatuaje, piensa cuidadosamente. Aunque los
                tatuajes pueden eliminarse, están destinados a acompañarnos a lo
                largo de nuestra vida, representando recuerdos, ya sean buenos o
                malos. Muchos tatuajes cuentan nuestra historia por nosotros...
              </h4>
              <h3>Pide tu cita y déjate tatuar</h3>
              <h3>
                Los tatuajes no son un crimen, aunque puedan ser discriminados
              </h3>
              <hr />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
