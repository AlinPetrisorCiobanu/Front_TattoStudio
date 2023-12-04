import { useState, useEffect } from "react";
import {
  deleteProfile,
  getProfile,
  modifyProfile,
  reactiveProfile,
} from "../../servicios/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { userDate, userLogout } from "../userSlice";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Card } from "../../common/Card/Card";
import { useNavigate } from "react-router-dom";
import { ModalCommon } from "../../common/Modal/Modal";
import { jwtDecode } from "jwt-decode";
import "./Profile.css";

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const originalToken = useSelector(userDate).credentials;
  const [profile, setProfile] = useState({});
  const [profiles, setProfilesAdmin] = useState([{}]);
  const [modalShow, setModalShow] = useState(false);
  const [userToModifyDelete, setUserToModifyDelete] = useState({});
  const [referenceModifyOrDelete, setReferenceModifyOrDelete] = useState({});
  const [modifyDetails, setModifyDetails] = useState({
    name: "",
    lastName: "",
    idUser: "",
    tlf: "",
    years: "",
    email: "",
    password: "",
    rol: "",
    borradoLogico: "",
  });
  const [rol, setRol] = useState("");

  //si no tienes token te manda a la pagina principal
  //si tienes te muestra tu perfil
  useEffect(() => {
    if (!originalToken) {
      navigate("/");
    } else if (originalToken != "") {
      profileBBD(originalToken);
    }
  }, [originalToken]);

  //extraigo el rol del token
  const getTokenRol = () => {
    if (originalToken) {
      const decodedToken = jwtDecode(String(originalToken));
      setRol(decodedToken.rol);
    }
  };
  useEffect(() => {
    getTokenRol();
  }, [originalToken]);

  //trae los datos de la base de datos, si es admin los trae todos
  const profileBBD = (data) => {
    getProfile(data)
      .then((res) => {
        if (res.rol === "customer" || res.rol === "artist") {
          setProfile(res);
        } else {
          setProfilesAdmin(res);
        }
      })
      .catch((err) => console.log(err));
  };

  //modificar datos de usuario con modal
  const modifyUser = (user) => {
    if (user._id !== "") {
      const reference = "modify";
      setUserToModifyDelete(user);
      setReferenceModifyOrDelete(reference);
      setModalShow(true);
    }
  };
  //guardo los valores de los inputs
  const inputDateModify = (e) => {
    setModifyDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //boton incorporado en el modal para modificar datos del profile
  const send = (id) => {
    const dataToSend = {
      name: `${modifyDetails.name}`,
      lastName: `${modifyDetails.lastName}`,
      password: `${modifyDetails.password}`,
      idUser: `${modifyDetails.idUser}`,
      tlf: `${modifyDetails.tlf}`,
      birthday: `${modifyDetails.years}`,
      email: `${modifyDetails.email}`,
      rol: `${
        modifyDetails.rol === "admin"
          ? "admin"
          : modifyDetails.rol === "artist"
          ? "artist"
          : "customer"
      }`,
    };
    //se manda a la base de datos (token , datos a modificar y el id de quien se van a modificar)
    modifyProfile(originalToken, dataToSend, id)
      .then((res) => {
        console.log(
          `${dataToSend.name} ${res} los datos se han actualizado corectamente`
        );
      })
      .catch((error) => {
        // setBaseError(error.response.data.message)
        console.error(error);
      });
  };

  //borrado logico con modal
  const borradoLogico = (user) => {
    if (user._id !== "") {
      const reference = "delete";
      setUserToModifyDelete(user);
      setReferenceModifyOrDelete(reference);
      setModalShow(true);
    }
  };
  //tiene un input de confirmación
  const deleteTo = (id) => {
    const dataToSend = {
      borradoLogico: `${
        modifyDetails.borradoLogico.toUpperCase() === "SI" ? true : false
      }`,
    };
    if (dataToSend.borradoLogico === "true") {
      deleteProfile(originalToken, id)
        .then(() => {
          if (rol === "admin") {
            setModalShow(false);
          } else {
            setModalShow(false);
            dispatch(userLogout({ credentials: "" }));
          }
          console.log("cuenta borrada");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("cuenta no borrada");
      setModalShow(false);
    }
  };

  //reactivación de la cuenta con borrado logico
  const activeTo = (id) => {
    const dataToSend = {
      borradoLogico: `${
        modifyDetails.borradoLogico.toUpperCase() === "SI" ? false : true
      }`,
    };
    console.log(dataToSend.borradoLogico);
    if (dataToSend.borradoLogico === "false") {
      reactiveProfile(originalToken, id)
        .then(() => {
          setModalShow(false);
          console.log("cuenta reactivada");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("cuenta no reactivada");
      setModalShow(false);
    }
  };

  return (
    <>
      <ModalCommon
        show={modalShow}
        user={userToModifyDelete}
        reference={referenceModifyOrDelete}
        rol={
          profile.rol === "customer" || profile.rol === "artist"
            ? profile.rol
            : "admin"
        }
        inputHandler={inputDateModify}
        handlerClick={send}
        handlerDelete={deleteTo}
        handlerReactive={activeTo}
        onHide={() => setModalShow(false)}
      />
      <Container fluid className="ContainerProfile">
        <p className="text-center">hola</p>
        <Container className="d-flex justify-content-center containerFormRegister containerCardProfile">
          {profile.rol === "customer" || profile.rol === "artist" ? (
            <Row>
              <Col>
                <Card
                  key={profile._id}
                  data={profile}
                  rol={
                    profile.rol === "customer" || profile.rol === "artist"
                      ? profile.rol
                      : "admin"
                  }
                  reference={"profile"}
                  handlerClickMod={modifyUser}
                  handlerClickDel={borradoLogico}
                />
              </Col>
            </Row>
          ) : (
            profiles.map((users) => {
              return (
                <Row>
                  <Col>
                    <Card
                      key={users._id}
                      data={users}
                      rol={
                        profile.rol === "customer" || profile.rol === "artist"
                          ? profile.rol
                          : "admin"
                      }
                      reference={"profile"}
                      borradoLogico={users.borradoLogico}
                      handlerClickMod={modifyUser}
                      handlerClickDel={borradoLogico}
                    />
                  </Col>
                </Row>
              )
            })
          )}
        </Container>
      </Container>
    </>
  );
};