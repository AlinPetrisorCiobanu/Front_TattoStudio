import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Input } from "../Input/Input";
import DatePicker from "react-datepicker";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "react-datepicker/dist/react-datepicker.css";
import "./Modal.css";

export const ModalCommon = ({
  show,
  onHide,
  user,
  reference,
  rol,
  inputHandler,
  inputHandlerDate,
  handlerClick,
  handlerDelete,
  handlerReactive,
  functionError,
  selectorValue,
  txt,
  date,
  artists,
}) => {
  const props = { show, onHide };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter text-center">
          {reference === "modify"
            ? "Modificar!"
            : reference === "delete"
            ? "Borrar!!!"
            : "Citas"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {reference === "modify" ? (
          <div>
            {rol === "admin" ? (
              <Container>
                <Col>
                  <Row className="text-center">
                    <h4>
                      {user.name} {user.lastName}
                    </h4>
                    <h6>ID : {user._id}</h6>
                  </Row>
                  <h6>Nombre : {user.name}</h6>
                  <Input
                    type={"text"}
                    name={"name"}
                    handler={(e) => inputHandler(e)}
                    handlerError={functionError}
                  />
                  <h6>Apellidos : {user.lastName}</h6>
                  <Input
                    type={"text"}
                    name={"lastName"}
                    handler={(e) => inputHandler(e)}
                    handlerError={functionError}
                  />
                  <h6>Dni/Nie : {user.idUser}</h6>
                  <Input
                    type={"text"}
                    name={"idUser"}
                    handler={(e) => inputHandler(e)}
                    handlerError={functionError}
                  />
                  <h6>Año de Nacimiento : {user.birthday}</h6>
                  <Input
                    type={"text"}
                    name={"years"}
                    handler={(e) => inputHandler(e)}
                    handlerError={functionError}
                  />
                  <h6>Telefono : {user.tlf}</h6>
                  <Input
                    type={"text"}
                    name={"tlf"}
                    handler={(e) => inputHandler(e)}
                    handlerError={functionError}
                  />
                  <h6>Email : {user.email}</h6>
                  <Input
                    type={"text"}
                    name={"email"}
                    handler={(e) => inputHandler(e)}
                    handlerError={functionError}
                  />
                  <h6>Contraseña :</h6>
                  <Input
                    type={"text"}
                    name={"password"}
                    handler={(e) => inputHandler(e)}
                    handlerError={functionError}
                  />
                  <h6>Rol : {user.rol} :</h6>
                  <Input
                    type={"text"}
                    name={"rol"}
                    handler={(e) => inputHandler(e)}
                    handlerError={functionError}
                  />
                  <Row className="text-center">
                    <Button onClick={() => handlerClick(user._id)}>
                      modificar
                    </Button>
                    <h5>
                      Eres Admin , asi que porfavor introduce datos validos
                    </h5>
                  </Row>
                </Col>
              </Container>
            ) : (
              <Container>
                <Col>
                  <h4 className="text-center">
                    {user.name} {user.lastName}
                  </h4>
                  <h6>Nombre : {user.name}</h6>{" "}
                  <Input
                    type={"text"}
                    name={"name"}
                    handler={(e) => inputHandler(e)}
                    handlerError={functionError}
                  />
                  <h6>Apellidos : {user.lastName}</h6>{" "}
                  <Input
                    type={"text"}
                    name={"lastName"}
                    handler={(e) => inputHandler(e)}
                    handlerError={functionError}
                  />
                  <h6>Contraseña : </h6>{" "}
                  <Input
                    type={"text"}
                    name={"password"}
                    handler={(e) => inputHandler(e)}
                    handlerError={functionError}
                  />
                  <Row>
                    <Button onClick={() => handlerClick()}>modificar</Button>
                  </Row>
                  <h6 className="text-center">
                    Para modificar el resto de datos pongase en contacto con
                    nosotros{" "}
                  </h6>
                </Col>
              </Container>
            )}
          </div>
        ) : reference === "delete" ? (
          <div>
            {rol === "admin" ? (
              <div>
                <h6>Seguro que quieres borrar su cuenta :</h6>
                <Input
                  type={"text"}
                  name={"borradoLogico"}
                  handler={(e) => inputHandler(e)}
                />
                {user.borradoLogico === true ? (
                  <Button onClick={() => handlerReactive(user._id)}>
                    Reactivar
                  </Button>
                ) : (
                  <Button onClick={() => handlerDelete(user._id)}>
                    Borrar
                  </Button>
                )}
              </div>
            ) : (
              <div>
                <h6>Seguro que quieres borrar tu cuenta :</h6>
                <Input
                  type={"text"}
                  name={"borradoLogico"}
                  handler={(e) => inputHandler(e)}
                />
                <Button onClick={() => handlerDelete()}>borrar</Button>
              </div>
            )}
          </div>
        ) : reference === "appointment" ? (
          <Container>
            <Row>
              <Col>
                <h6>fecha</h6>
                <DatePicker
                  selected={date}
                  name={"date"}
                  onChange={inputHandlerDate}
                />
              </Col>
            </Row>
            <Row md={6}>
              <Col className="text-center ">
                <h6>Hora</h6>
                <Input
                  type={"text"}
                  name={"startTime"}
                  handler={(e) => inputHandler(e)}
                  handlerError={functionError}
                  txt={"inputAppDateTime"}
                />
              </Col>
            </Row>
            <Row className="text-center">
              <h6>Tatuaje o Piercing</h6>
              <Col>
                <input
                  id="tatuaje"
                  type={"radio"}
                  name={"intervention"}
                  defaultValue={"tatuaje"}
                  onClick={(e) => selectorValue(e)}
                />
                <label htmlFor="tatuaje">Tatuaje</label>
              </Col>
              <Col>
                <input
                  id="piercing"
                  type={"radio"}
                  name={"intervention"}
                  defaultValue={"piercing"}
                  onClick={(e) => selectorValue(e)}
                />
                <label htmlFor="piercing">Piercing</label>
              </Col>
            </Row>

            <Row className="text-center">
              <h6>Tatuadores</h6>
              {artists.length < 1
                ? "algo ha fallado"
                : artists.map((res) => {
                    return (
                      <Col key={res._id}>
                        <input
                          id="tattoo"
                          type={"radio"}
                          name={"idArtist"}
                          defaultValue={res._id}
                          onClick={(e) => selectorValue(e)}
                        />
                        <label htmlFor="piercing">{res.name}</label>
                      </Col>
                    );
                  })}
            </Row>
            <Row className="justify-content-center" md={6}>
              <Button onClick={() => handlerClick()}>pedir cita</Button>
            </Row>
          </Container>
        ) : (
          <h6>Hola</h6>
        )}
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
