import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Card.css";

export const Card = ({
  data,
  handlerClickMod,
  handlerClickDel,
  rol,
  borradoLogico,
  reference,
}) => {
  return (
    <>
      {reference === "profile" ? (
        <div className="display-flex Card mt-3 mb-3">
          <Row className=" justify-content-center pt-1">
            <Col className="text-center pt-3" md="12">
              <h5>
                {data.name} {data.lastName}
              </h5>
            </Col>
          </Row>
          <hr className="hrCardProfile" />
          <Row className=" justify-content-center pt-1">
            <Col className="text-center" md="12">
              <p>ID</p>
              <h6>{data._id}</h6>
            </Col>
          </Row>
          <hr className="hrCardProfile" />
          <Row className="">
            <Col className="text-center" md="7">
              <p>Dni</p>
              <p>{data.idUser}</p>
            </Col>
            <Col className="text-center" md="4">
              <p>Año de Nacimiento</p>
              <p>{data.birthday}</p>
            </Col>
          </Row>
          <hr className="hrCardProfile" />
          <Row className="">
            <Col className="text-center" md="7">
              <p>Email</p>
              <p>{data.email}</p>
            </Col>
            <Col className="text-center" md="4">
              <p>Nr. Telefono</p>
              <p>{data.tlf}</p>
            </Col>
          </Row>
          <hr className="hrCardProfile" />
          {rol === "admin" ? (
            <Row className="">
              <Col className="text-center" md="6">
                <p>Rol :</p>
                <p>{data.rol}</p>
              </Col>
              <Col className="text-center" md="6">
                <p>Borrado</p>
                <p>{data.borradoLogico === true ? "Si" : "NO"}</p>
              </Col>
            </Row>
          ) : (
            ""
          )}
          <Row className="pb-3">
            <Col className="text-end" md="6">
              <Button onClick={() => handlerClickMod(data)}>
                Modificar
              </Button>
            </Col>
            <Col className="text-start" md="6">
              <Button onClick={() => handlerClickDel(data)}>
                {borradoLogico}
              </Button>
            </Col>
          </Row>
        </div>
      ) : (
        <div className="display-flex Card mt-3 mb-3">
          {rol === "admin" ? (
            <div>
              <div>{data._id}</div>
              <div>borrado : {data.logicDelete === true ? "Si" : "NO"}</div>
              <hr className="hrCardProfile" />
              <div>
                {data.customer.name} {data.customer.lastName}
              </div>
              <div>{data.customer._id}</div>
              <div>{data.customer.email}</div>
              <div>{data.customer.tlf}</div>
              <div>{data.customer.idUser}</div>
              <hr className="hrCardProfile" />
              <div>{data.intervention}</div>
              <div>{data.date}</div>
              <div>{data.startTime}</div>
              <div>{data.endTime}</div>
              <hr className="hrCardProfile" />
              <div>
                {data.artist.name} {data.artist.lastName}
              </div>
              <div>{data.artist._id}</div>
              <div>{data.artist.email}</div>
              <div>{data.artist.tlf}</div>
              <div>{data.artist.idUser}</div>
              <hr className="hrCardProfile" />
              <Row className="pb-3">
                <Col className="text-end" md="6">
                  <Button onClick={() => handlerClickMod(data)}>
                    Modificar
                  </Button>
                  
                </Col>
                <Col className="text-start" md="6">
                  <Button onClick={() => handlerClickDel(data)}>Borrar</Button>
                </Col>
              </Row>
            </div>
          ) : (
            <div>
              <div>
                {data.customer.name} {data.customer.lastName}
              </div>
              <div>{data.customer.email}</div>
              <div>{data.customer.tlf}</div>
              <hr className="hrCardProfile" />
              <div>{data.intervention}</div>
              <div>{data.date}</div>
              <div>{data.startTime}</div>
              <hr className="hrCardProfile" />
              <div>
                {data.artist.name} {data.artist.lastName}
              </div>
              <div>{data.artist.email}</div>
              <div>{data.artist.tlf}</div>
              <hr className="hrCardProfile" />
              <Row className="pb-3">
                <Col className="text-end" md="6">
                  <Button onClick={() => handlerClickMod(data)}>
                    Modificar
                  </Button>
                </Col>
                <Col className="text-start" md="6">
                  <Button onClick={() => handlerClickDel(data)}>Borrar</Button>
                </Col>
              </Row>
            </div>
          )}
        </div>
      )}
    </>
  );
};
