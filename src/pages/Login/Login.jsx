import { Input } from "../../common/Input/Input";
import { useState, useEffect } from "react";
import { login } from "../../servicios/apiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userDate, userLogin } from "../userSlice";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "../../common/Form/Form";
import { validate } from "../../servicios/useFul";
import './Login.css'

export const Login = () => {
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

  const [userError, setUserError] = useState({
    emailError: "",
    passwordError: ""
  })

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setLoginDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkError = (e) => {

    let error = "";

    error = validate(e.target.name, e.target.value)

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error
    }));

  }

  const loginHand = (data) => {
    login(data)
      .then((res) => {
        const originalToken = res.token;
        dispatch(userLogin({ credentials: originalToken }))
        if(originalToken){
            navigate("/")
        }
      })
      .catch((err) => console.log(err));
     
    
  };

  return (
    <>
        <Container fluid>
        <Container className="containerFormRegister text-center">
          <Row className="anchoRowFormRegister">
            <Form
              type="text"
              name="email"
              nameLabel="email"
              nrCol="6"
              txt={`bg-color-Form-Reg ${userError.emailError !== '' ? 'inputDesignError' : ''}`}
              handlerInput={inputHandler}
              functionError={checkError}
            />
            
            <Form
              type="text"
              name="password"
              nameLabel="contraseña"
              nrCol="6"
              txt={`bg-color-Form-Reg ${userError.passwordError !== '' ? 'inputDesignError' : ''}`}
              handlerInput={inputHandler}
              functionError={checkError}
            />
            <div className="errorRedMsg">{userError.passwordError}</div>
            <div className="errorRedMsg">{userError.emailError}</div>
            <Col>
            <Button className="buttonFormReg" onClick={() => loginHand(loginDetails)}>
              Iniciar Session
            </Button>
            </Col>
            
          </Row>
        </Container>
      </Container>
    </>
  );
};
