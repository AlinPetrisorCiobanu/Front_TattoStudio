import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { Input } from "../Input/Input";
import "./Form.css";
import { login, register } from "../../servicios/apiCalls";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../pages/userSlice";

export const FormReg = () => {

     const [registerDetails, setRegisterDetails] = useState({
    name: "",
    lastName: "",
    idUser: "",
    tlf: "",
    birthday: "",
    email: "",
    password: "",
  });
  console.log(registerDetails)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dateBBD = async () => {
        try {
          const dataToSend = {
            name: `${registerDetails.name}`,
            lastName: `${registerDetails.lastName}`,
            idUser: `${registerDetails.idUser}`,
            tlf: `${registerDetails.tlf}`,
            birthday: `${registerDetails.birthday}`,
            email: `${registerDetails.email}`,
            password: `${registerDetails.password}`,
          };
    
          const result = await register(dataToSend);
          console.log(`${dataToSend.name} los datos se han enviado corectamente`);
          const email = dataToSend.email
          const password = dataToSend.password
          const date = { email , password };
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

  const loginHand = (date) => {
    console.log(date);
    login(date)
      .then((res) => {
        const originalToken = res.token;
        dispatch(userLogin({ credentials: originalToken }));
      })
      .catch((err) => console.log(err));
    navigate("/");
  }

  return (
    <>
      <Form className="display-flex">
        <Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Nombre</Form.Label>
            <Input type="text" name="name" txt="nombre" handler={inputDate} />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Apellidos</Form.Label>
            <Input type="text" name="lastName" txt="apellidos" handler={inputDate} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="3">
            <Form.Label>DNI</Form.Label>
            <Input type="text" name="idUser" txt="DNI" handler={inputDate} />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Fecha de Nacimiento (año)</Form.Label>
            <Input type="text" name="birthday" txt="fecha de nacimiento" handler={inputDate} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="3">
            <Form.Label>Telefono</Form.Label>
            <Input type="text" name="tlf" txt="Nr. telefono" handler={inputDate} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="3">
            <Form.Label>email</Form.Label>
            <Input type="text" name="email" txt="correo electronico" handler={inputDate} />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Contraseña</Form.Label>
            <Input type="text" name="password" txt="Contraseña" handler={inputDate} />
          </Form.Group>
        </Row>
        <Button onClick={() => send()}>Registrar</Button>
      </Form>
    </>
  );
};
