import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDate } from "../userSlice";
import { useDispatch } from "react-redux";
import { FormReg } from "../../common/Form/Form";
// import Button from "react-bootstrap/Button";
// import { Form } from "../../common/Form/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { login, register } from "../../servicios/apiCalls";
import { userLogin } from "../../pages/userSlice";
import "./Register.css";

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

  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    lastName: "",
    idUser: "",
    tlf: "",
    years: "",
    email: "",
    password: "",
  });

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
      console.error(error);
    }
  };

  const send = () => {
    dateBBD();
    navigate("/");
  };
  
  const inputDate = (e) => {
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
            <Col className="anchoMaxColFormReg">
              <FormReg miaumiau={inputDate} handlerClick={send}/>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};
