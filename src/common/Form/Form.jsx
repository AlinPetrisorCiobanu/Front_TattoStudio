import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Input } from "../Input/Input";


export const FormReg = ({ handlerClick , miaumiau}) => {

  return (
    <>
      <Form className="display-flex">
        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Nombre</Form.Label>
            <Input type="text" name="name" txt="nombre" handler={(e)=>miaumiau(e)}/>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Apellidos</Form.Label>
            <Input type="text" name="lastName" txt="apellidos" handler={(e)=>miaumiau(e)} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label>DNI</Form.Label>
            <Input type="text" name="idUser" txt="DNI" handler={(e)=>miaumiau(e)} />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Input type="text" name="years" txt="años" handler={(e)=>miaumiau(e)} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Telefono</Form.Label>
            <Input type="text" name="tlf" txt="Nr. telefono" handler={(e)=>miaumiau(e)} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label>email</Form.Label>
            <Input type="text" name="email" txt="correo electronico" handler={(e)=>miaumiau(e)} />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Contraseña</Form.Label>
            <Input  type="text" name="password" txt="Contraseña" handler={(e)=>miaumiau(e)} />
          </Form.Group>
        </Row>
        <Button className="buttonFormReg" onClick={(e) => handlerClick(e)}>Registrar</Button>
      </Form>
    </>
  );
};

