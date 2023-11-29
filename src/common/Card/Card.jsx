import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Card.css";

export const Card = ({
  name,
  last_Name,
  idUser,
  tlf,
  years,
  email,
  id,
  rol,
  handlerClickMod,
  handlerClickDel,
}) => {
  return (
    <>
      <div className="display-flex Card mt-3 mb-3">
        <Row className=" justify-content-center pt-1">
          <Col className="text-center pt-3" md="12">
            <h2>
              {name} {last_Name}
            </h2>
          </Col>
        </Row>
        <hr className="hrCardProfile" />
        <Row className=" justify-content-center pt-1">
          <Col className="text-center" md="12">
            <p>ID :</p>
            <h2>{id}</h2>
          </Col>
        </Row>
        <hr className="hrCardProfile" />
        <Row className="">
          <Col className="text-center" md="7">
            <p>Dni :</p>
            <h3>{idUser}</h3>
          </Col>
          <Col className="text-center" md="4">
            <p>Año de Nacimiento :</p>
            <h3>{years}</h3>
          </Col>
        </Row>
        <hr className="hrCardProfile" />
        <Row className="">
          <Col className="text-center" md="7">
            <p>Email :</p>
            <h3>{email}</h3>
          </Col>
          <Col className="text-center" md="4">
            <p>Nr. Telefono :</p>
            <h3>{tlf}</h3>
          </Col>
        </Row>
        <hr className="hrCardProfile" />
        <Row className="">
          <Col className="text-center" md="12">
            <p>Rol :</p>
            <h3>{rol}</h3>
          </Col>
        </Row>
        <Row className="pb-3">
          <Col className="text-end" md="6">
            <Button onClick={() => handlerClickMod()}>Modificar Usuario</Button>
          </Col>
          <Col className="text-start" md="6">
            <Button onClick={() => handlerClickDel()}>Borrar Usuario</Button>
          </Col>
        </Row>
      </div>
    </>
  );
};
