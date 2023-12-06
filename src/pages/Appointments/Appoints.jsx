import { useState, useEffect } from "react";
import { userDate } from "../userSlice";
import { useSelector } from "react-redux";
import {
  createAppointment,
  deleteAppointment,
  getAllArtists,
  getAppointment,
} from "../../servicios/apiCalls";
import { Card } from "../../common/Card/Card";
import { jwtDecode } from "jwt-decode";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { ModalCommon } from "../../common/Modal/Modal";
import dayjs from "dayjs";
import "./Appoints.css";
import { validate } from "../../servicios/useFul";

export const Appoints = () => {
  const originalToken = useSelector(userDate).credentials;
  const [appointments, setAppointments] = useState([]);
  const [appointmentsError, setAppointmentsError] = useState("");
  const [rol, setRol] = useState("");
  const [ID, setID] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [artists, setArtists] = useState([]);
  const [newAppointments, setNewAppointments] = useState({
    startTime: "",
    intervention: "",
    idArtist: "",
  });
  const [newAppointmentsError, setNewAppointmentsError] = useState({
    startTimeError: "",
    interventionError: "",
    idArtistError: "",
  });
  const [date, setDate] = useState(new Date());

  //compruebo si tiene token , si no le mando a la pagina principal
  useEffect(() => {
    if (!originalToken) {
      navigate("./");
    }
    profileBBD(originalToken);
  }, [originalToken]);

  //extraigo el rol del token y el ID
  const getTokenRol = () => {
    if (originalToken) {
      const decodedToken = jwtDecode(String(originalToken));
      if (decodedToken.rol === "admin") {
        setID(decodedToken.id);
      }
      setRol(decodedToken.rol);
    }
  };
  useEffect(() => {
    getTokenRol();
  }, [originalToken]);

  //si tiene token le muestro sus citas,si es tatuador muestro todas las citas con el, y si es admin muestro todas
  const profileBBD = (date) => {
    getAppointment(date)
      .then((res) => {
        setAppointments(res);
      })
      .catch((err) => console.log(err));
  };

  //guardo los valores de los inputs
  const inputDataApp = (e) => {
    setNewAppointments((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //chequeo de errores para los inputs
  const checkError = (e) => {
    let error = "";
    error = validate(e.target.name, e.target.value);
    setNewAppointmentsError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  // console.log(newAppointmentsError.startTimeError)

  //creación de un use effect para el date picker
  useEffect(() => {
    if (dayjs(date).isBefore(dayjs())) {
      setAppointmentsError("No se pueden pedir citas en el pasado");
    } else if (dayjs(date).day() === 5) {
      setAppointmentsError("los fines de semana no se trabaja!!");
    } else if (dayjs(date).day() === 6) {
      setAppointmentsError("los fines de semana no se trabaja!!");
    } else {
      setAppointmentsError("");
    }
  }, [date]);

  //un boton principal para mostrar un modal con creación de las citas
  const create = () => {
    setModalShow(true);
  };

  //metodo para mandar datos a la base de datos para guardar una cita
  const send = () => {
    const dataToSend = {
      date: `${dayjs(date).format("YYYY MM DD")}`,
      startTime: `${newAppointments.startTime}`,
      intervention: `${newAppointments.intervention}`,
      idArtist: `${newAppointments.idArtist}`,
    };

    if (appointmentsError === "") {
      createAppointment(originalToken, dataToSend)
        .then((res) => {
          console.log(res);
          profileBBD(originalToken);
          setModalShow(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //modificación de citas , toma como referencía el id de la cita
  const modifyApp = (res) => {
    const idApp = res._id;
    console.log(idApp);
  };

  //borrado logico citas , toma como referencía el id de la cita
  const delApp = (res) => {
    const idApp = res._id;
    deleteAppointment(originalToken, idApp)
      .then((res) => {
        console.log(res);
        setModalShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const artistsForModal = () => {
    getAllArtists(originalToken)
      .then((res) => {
        setArtists(res);
      })
      .catch((res) => {
        console.log(res);
      });
  };
  useEffect(() => {
    artistsForModal();
  }, [appointments]);

  return (
    <>
      <ModalCommon
        show={modalShow}
        rol={rol === "customer" || rol === "artist" ? rol : "admin"}
        inputHandler={inputDataApp}
        inputHandlerDate={(date) => setDate(date)}
        handlerClick={send}
        // handlerDelete={deleteTo}
        reference={"appointment"}
        txt={`bg-color-Form-Reg ${
          newAppointmentsError.nameError !== "" ? "inputDesignError" : ""
        }`}
        selectorValue={inputDataApp}
        functionError={checkError}
        onHide={() => setModalShow(false)}
        date={date}
        artists={artists}
      />
      <Container fluid className="ContainerAppointments">
        <Container className="d-flex justify-content-center containerFormRegister containerCardProfile">
          <Row>
            <Col className="Card designCreateNewAppoints">
              <div onClick={() => create(ID)}>
                <h1 className="h1delCard">+</h1>
              </div>
            </Col>
          </Row>
          {rol === "" ? (
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
