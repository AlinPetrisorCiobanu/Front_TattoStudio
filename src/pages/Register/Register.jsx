import { useEffect, useState } from "react";
import { register } from "../../servicios/apiCalls";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [name, setInputValue] = useState("");
  const [lastName, setInputValue1] = useState("");
  const [idUser, setInputValue2] = useState("");
  const [tlf, setInputValue3] = useState("");
  const [birthday, setInputValue4] = useState("");
  const [email, setInputValue5] = useState("");
  const [password, setInputValue6] = useState("");

  const inputDate = (valueInput, nr) => {
    if (nr === 0) setInputValue(valueInput.target.value);
    else if (nr === 1) setInputValue1(valueInput.target.value);
    else if (nr === 2) setInputValue2(valueInput.target.value);
    else if (nr === 3) setInputValue3(valueInput.target.value);
    else if (nr === 4) setInputValue4(valueInput.target.value);
    else if (nr === 5) setInputValue5(valueInput.target.value);
    else if (nr === 6) setInputValue6(valueInput.target.value);
  };

  const dateBBD = async () => {
    try {
      const dataToSend = {
        name: `${name}`,
        lastName: `${lastName}`,
        idUser: `${idUser}`,
        tlf: `${tlf}`,
        birthday: `${birthday}`,
        email: `${email}`,
        password: `${password}`,
      };

      const result = await register(dataToSend);
      console.log(`${name} los datos se han enviado corectamente`);
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  const enviar = () => {
    if(!name ||!lastName ||!idUser ||!tlf ||!birthday ||!email ||!password) console.log("faltan datos");
    localStorage.setItem('emailReg' ,email)
    localStorage.setItem('passReg' ,password)
    navigate("/login");
    dateBBD();
  };

  return (
    <>
      <div>
        <h1>Registrate Puto</h1>
        <input
          type="text"
          name="user"
          placeholder="nombre"
          onChange={(element) => {
            inputDate(element, 0);
          }}
        />
        <input
          type="text"
          name="lastName"
          placeholder="apellidos"
          onChange={(element) => {
            inputDate(element, 1);
          }}
        />
        <input
          type="text"
          name="idUser"
          placeholder="DNI"
          onChange={(element) => {
            inputDate(element, 2);
          }}
        />
      </div>
      <hr />
      <div>
        <input
          type="text"
          name="tlf"
          placeholder="telefono"
          onChange={(element) => {
            inputDate(element, 3);
          }}
        />
        <input
          type="text"
          name="birthday"
          placeholder="año de nacimiento"
          onChange={(element) => {
            inputDate(element, 4);
          }}
        />
      </div>
      <hr />
      <div>
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={(element) => {
            inputDate(element, 5);
          }}
        />
        <input
          type="text"
          name="password"
          placeholder="contraseña"
          onChange={(element) => {
            inputDate(element, 6);
          }}
        />
      </div>
      <hr />
      <div>
        <button onClick={(a) => enviar()}>Enviar</button>
      </div>
    </>
  );
};

/*
const token = "ajshdj"

{!token 
?(no aparece register)
:(aparece register <a href="/register">Register</a>)}

*/
