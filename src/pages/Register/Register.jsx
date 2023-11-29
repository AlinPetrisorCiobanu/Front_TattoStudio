import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDate } from "../userSlice";
import { useDispatch } from "react-redux";
import { Form } from "../../common/Form/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { login, register } from "../../servicios/apiCalls";
import { userLogin } from "../../pages/userSlice";
import Button from "react-bootstrap/Button";
import "./Register.css";
import { validate } from "../../servicios/useFul";
// import { Input } from "../../common/Input/Input";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //si tienes token te manda a la pagina de inicio
  const token = useSelector(userDate).credentials;
  const tokenExist = (tokenEx) => {
    if (tokenEx) {
      navigate("/");
    }
  };
  useEffect(() => {
    tokenExist(token);
  }, [token]);

  const loginHand = (date) => {
    login(date)
      .then((res) => {
        const originalToken = res.token;
        dispatch(userLogin({ credentials: originalToken }));
      })
      .catch((err) => console.log(err));
    navigate("/");
  };

  const [baseError, setBaseError] = useState("")
  const [userError, setUserError] = useState({
    nameError: "",
    lastNameError: "",
    idUserError: "",
    tlfError: "",
    yearsError: "",
    emailError: "",
    passwordError: "",
  });

  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    lastName: "",
    idUser: "",
    tlf: "",
    years: "",
    email: "",
    password: "",
  });

  const checkError = (e) => {
    let error = "";

    error = validate(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const dateBBD = async () => {
    try {
      const dataToSend = {
        name: `${registerDetails.name}`,
        lastName: `${registerDetails.lastName}`,
        idUser: `${registerDetails.idUser}`,
        tlf: `${registerDetails.tlf}`,
        birthday: `${registerDetails.years}`,
        email: `${registerDetails.email}`,
        password: `${registerDetails.password}`,
      };
      await register(dataToSend);
      console.log(`${dataToSend.name} los datos se han enviado corectamente`);
      const email = dataToSend.email;
      const password = dataToSend.password;
      const date = { email, password };
      loginHand(date);
    } catch (error) {
      setBaseError(error.response.data.message)
      // console.error(error);
    }
  };

  const send = () => {
    dateBBD();
    navigate("/");
  };

  const inputDate = (e) => {
    console.log(e.target.value);
    setRegisterDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Container fluid>
        <Container className="containerFormRegister text-center">
          <Row className="anchoRowFormRegister">
            <Form
              type="text"
              name="name"
              txt={`bg-color-Form-Reg ${
                userError.nameError !== "" ? "inputDesignError" : ""
              }`}
              nameLabel="Nombre"
              nrCol="6"
              handlerInput={inputDate}
              functionError={checkError}
            />
            <Form
              type="text"
              name="lastName"
              txt={`bg-color-Form-Reg ${
                userError.lastNameError !== "" ? "inputDesignError" : ""
              }`}
              nameLabel="Appelidos"
              nrCol="6"
              handlerInput={inputDate}
              functionError={checkError}
            />
            <Form
              type="text"
              name="idUser"
              txt={`bg-color-Form-Reg ${
                userError.idUserError !== "" ? "inputDesignError" : ""
              }`}
              nameLabel="DNI"
              nrCol="6"
              handlerInput={inputDate}
              functionError={checkError}
            />
            <Form
              type="text"
              name="tlf"
              txt={`bg-color-Form-Reg ${
                userError.tlfError !== "" ? "inputDesignError" : ""
              }`}
              nameLabel="nr. Telefono"
              nrCol="6"
              handlerInput={inputDate}
              functionError={checkError}
            />
            <Row className="justify-content-center">
              <Form
                type="text"
                name="years"
                txt={`bg-color-Form-Reg ${
                  userError.yearsError !== "" ? "inputDesignError" : ""
                }`}
                nameLabel="Tu fecha de nacimiento (solo el año)"
                nrCol="6"
                handlerInput={inputDate}
                functionError={checkError}
              />
            </Row>

            <Form
              type="text"
              name="email"
              txt={`bg-color-Form-Reg ${
                userError.emailError !== "" ? "inputDesignError" : ""
              }`}
              nameLabel="Correo Electronico"
              nrCol="6"
              handlerInput={inputDate}
              functionError={checkError}
            />
            <Form
              type="text"
              name="password"
              txt={`bg-color-Form-Reg ${
                userError.passwordError !== "" ? "inputDesignError" : ""
              }`}
              nameLabel="Contraseña"
              nrCol="6"
              handlerInput={inputDate}
              functionError={checkError}
            />
            <div className="errorRedMsg">{userError.nameError}</div>
            <div className="errorRedMsg">{userError.lastNameError}</div>
            <div className="errorRedMsg">{userError.idUserError}</div>
            <div className="errorRedMsg">{userError.tlfError}</div>
            <div className="errorRedMsg">{userError.yearsError}</div>
            <div className="errorRedMsg">{userError.passwordError}</div>
            <div className="errorRedMsg">{userError.emailError}</div>
            <div className="errorRedMsg">{baseError}</div>
            <Col>
              <Button className="buttonFormReg" onClick={(e) => send(e)}>
                Register
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};
