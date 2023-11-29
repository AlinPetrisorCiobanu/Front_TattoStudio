import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Card.css";

export const Card = ({
  user,
  handlerClickMod,
  handlerClickDel,
  rol,
  borradoLogico,
}) => {
  return (
    <>
      <div className="display-flex Card mt-3 mb-3">
        <Row className=" justify-content-center pt-1">
          <Col className="text-center pt-3" md="12">
            <h5>
              {user.name} {user.lastName}
            </h5>
          </Col>
        </Row>
        <hr className="hrCardProfile" />
        <Row className=" justify-content-center pt-1">
          <Col className="text-center" md="12">
            <p>ID :</p>
            <h6>{user._id}</h6>
          </Col>
        </Row>
        <hr className="hrCardProfile" />
        <Row className="">
          <Col className="text-center" md="7">
            <p>Dni :</p>
            <p>{user.idUser}</p>
          </Col>
          <Col className="text-center" md="4">
            <p>Año de Nacimiento :</p>
            <p>{user.birthday}</p>
          </Col>
        </Row>
        <hr className="hrCardProfile" />
        <Row className="">
          <Col className="text-center" md="7">
            <p>Email :</p>
            <p>{user.email}</p>
          </Col>
          <Col className="text-center" md="4">
            <p>Nr. Telefono :</p>
            <p>{user.tlf}</p>
          </Col>
        </Row>
        <hr className="hrCardProfile" />
        {rol === "admin"?(
        <Row className="">
          <Col className="text-center" md="6">
            <p>Rol :</p>
            <p>{user.rol}</p>
          </Col>
          <Col className="text-center" md="6">
            <p>Borrado :</p>
            <p>{user.borradoLogico===true?("Si"):("NO")}</p>
          </Col>
        </Row>
        ):("")}
        <Row className="pb-3">
          <Col className="text-end" md="6">
            <Button onClick={() => handlerClickMod(user)}>Modificar Usuario</Button>
          </Col>
          <Col className="text-start" md="6">
            <Button onClick={() => handlerClickDel(user)}> {borradoLogico===true ? "Reactivar Cuenta" : "Borrar Usuario"} </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};
