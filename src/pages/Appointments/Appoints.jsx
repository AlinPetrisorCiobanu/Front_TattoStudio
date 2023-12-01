import { useState, useEffect } from "react";
import { userDate } from "../userSlice";
import { useSelector } from "react-redux";
import { getAppointment } from "../../servicios/apiCalls";
import { Card } from "../../common/Card/Card";
import { jwtDecode } from "jwt-decode";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./Appoints.css";
import { ModalCommon } from "../../common/Modal/Modal";

export const Appoints = () => {
  const originalToken = useSelector(userDate).credentials;
  const [appointments, setAppointments] = useState([]);
  const [newAppointments, setNewAppointments] = useState({});
  const [rol, setRol] = useState("");
  const [ID, setID] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const profileBBD = (date) => {
    getAppointment(date)
      .then((res) => {
          setAppointments(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (!originalToken) {
      navigate("./");
    }
    profileBBD(originalToken);
  }, [originalToken]);

  const getToken = () => {
    if (originalToken) {
      const decodedToken = jwtDecode(String(originalToken));
      if(decodedToken.rol==="admin"){
        setID(decodedToken.id)
      }
      setRol(decodedToken.rol);
    }
  };

  useEffect(() => {
    getToken();
  }, [originalToken]);

  const create = (res) =>{
    setModalShow(true)
  }
  const modifyApp = (res) =>{
    console.log(res._id)
  }
  const delApp = (res) =>{
    console.log(res._id)
  }
  return (
    <>
      <ModalCommon
        show={modalShow}
        rol={
          rol === "customer" ||rol === "artist"
            ? rol
            : "admin"
        }
        // inputHandler={inputDateModify}
        // handlerClick={send}
        // handlerDelete={deleteTo}
        // handlerReactive={activeTo}
        onHide={() => setModalShow(false)}
      />
      <Container fluid className="">
        <Container className="d-flex justify-content-center containerFormRegister containerCardProfile">
          <Row>
            <Col className="Card designCreateNewAppoints">
              <div onClick={() => create(ID)}><h1 className="h1delCard">+</h1></div>
            </Col>
          </Row>
          {rol === "customer" || rol === "artist" ? (
            <div></div>
          ) : (
            appointments.map((appoint) => {
              return (
                <Row>
                  <Col>
                    <Card 
                    data={appoint} 
                    reference={"appoints"}
                    rol={rol}
                    handlerClickMod={modifyApp}
                    handlerClickDel={delApp}
                    />
                  </Col>
                </Row>
              );
            })
          )}
        </Container>
      </Container>
    </>
  );
};
