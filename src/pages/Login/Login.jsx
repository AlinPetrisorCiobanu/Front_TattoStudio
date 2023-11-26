import { Input } from "../../common/Input/Input";
import { useState, useEffect } from "react";
import { login } from "../../servicios/apiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userDate, userLogin } from "../userSlice";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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

  const loginHand = (date) => {
    login(date)
      .then((res) => {
        const originalToken = res.token;
        dispatch(userLogin({ credentials: originalToken }));
      })
      .catch((err) => console.log(err));
    navigate("/");
  };

  return (
    <>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Correo Electronico</Form.Label>
        <Input text="Email" type="email" name="email" handler={inputHandler} />
        <Form.Text className="text-muted">
          No enseñes tu email o contraseña a nadie!.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Input text="Pass" type="password" name="password" handler={inputHandler} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Accepto Politica de Privacidad" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={() => loginHand(loginDetails)}>
        Submit
      </Button>
    </Form>
    </>
  );
};
