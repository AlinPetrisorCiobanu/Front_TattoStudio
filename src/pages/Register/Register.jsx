import { useState } from "react";
import { login, register } from "../../servicios/apiCalls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDate } from "../userSlice";
import {useDispatch} from "react-redux"
import { userLogin } from "../userSlice";

export const Register = () => {
  const token = useSelector(userDate).credentials;

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

      const result = await register(dataToSend)
      console.log(`${name} los datos se han enviado corectamente`)
      const date = {email , password}
      loginHand(date)
    } catch (error) {
      console.error(error);
    }
  };
  const dispatch = useDispatch()
  const navigate = useNavigate();



  const enviar = () => {
    if (!name) console.log("faltan datos");
    if (!lastName) console.log("faltan datos");
    if (!idUser) console.log("faltan datos");
    if (!tlf) console.log("faltan datos");
    if (!birthday) console.log("faltan datos");
    if (!email) console.log("faltan datos");
    if (!password) console.log("faltan datos");

    // const date = {email , password}
    // loginHand(date)
    dateBBD();
    navigate("/");
  }

  const loginHand = (date) =>{
    console.log(date)
    login(date)
    .then((res)=>{
      const originalToken = res.token
      dispatch(userLogin({credentials : originalToken}))          
    })
    .catch((err)=>console.log(err))
    navigate("/")
}


  return (
    <>
      {!token ? (
        <form>
          <div>
            <h1>Registrate</h1>
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
            <button
              disabled={
                !name ||
                !lastName ||
                !idUser ||
                !tlf ||
                !birthday ||
                !email ||
                !password
              }
              onClick={(a) => enviar()}
            >
              Enviar
            </button>
          </div>
        </form>
      ) : (
        <h1>Ya estas Registrado y Logueado</h1>
      )}
    </>
  );
};

/*
const token = "ajshdj"

{!token 
?(no aparece register)
:(aparece register <a href="/register">Register</a>)}

*/
