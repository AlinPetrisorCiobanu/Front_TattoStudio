import { useState, useEffect } from "react";
import { userDate } from "../userSlice";
import { useSelector } from "react-redux";
import { createAppointment, getAppointment } from "../../servicios/apiCalls";
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
  const [rol, setRol] = useState("")
  const [ID, setID] = useState("")
  const [modalShow, setModalShow] = useState(false)
  const [newAppointments, setNewAppointments] = useState({
    date: "",
    startTime: "",
    intervention: "",
    idArtist: "",
  })
 
  //compruebo si tiene token , si no le mando a la pagina principal
  useEffect(() => {
    if (!originalToken) {
      navigate("./")
    }
    profileBBD(originalToken)
  }, [originalToken])

  //extraigo el rol del token y el ID
  const getTokenRol = () => {
    if (originalToken) {
      const decodedToken = jwtDecode(String(originalToken));
      if(decodedToken.rol==="admin"){
        setID(decodedToken.id)
      }
      setRol(decodedToken.rol)
    }
  }
  useEffect(() => {
    getTokenRol()
  }, [originalToken])

  //si tiene token le muestro sus citas, si es admin muestro todas
  const profileBBD = (date) => {
    getAppointment(date)
      .then((res) => {
          setAppointments(res)
      })
      .catch((err) => console.log(err))
  };

//guardo los valores de los inputs
  const inputDataApp = (e) => {
    setNewAppointments((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  //un boton principal para mostrar un modal con creación de las citas
  const create = () =>{
    setModalShow(true)
  }

  //metodo para mandar datos a la base de datos para guardar una cita
  const send = () => {
    const dataToSend = {
      date: `${newAppointments.date}`,
      startTime: `${newAppointments.startTime}`,
      intervention: `${newAppointments.intervention}`,
      idArtist: `${newAppointments.idArtist}`,
    }
    createAppointment(originalToken , dataToSend)
      .then((res)=>{
        console.log("se ha creado una cita"+ res)
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  //modificación de citas , toma como referencía el id de la cita
  const modifyApp = (res) =>{
    const idApp=res._id
    console.log(idApp)
  }

  //borrado logico citas , toma como referencía el id de la cita
  const delApp = (res) =>{
    const idApp=res._id
    console.log(idApp)
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
        inputHandler={inputDataApp}
        handlerClick={send}
        // handlerDelete={deleteTo}
        reference={"appointment"}
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
