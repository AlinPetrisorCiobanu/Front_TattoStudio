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
    id: "",
    name: "",
    lastName: "",
    idUser: "",
    tlf: "",
    years: "",
    email: "",
    password: "",
    rol: "",
    borradoLogico: "",
  })

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
  }

  useEffect(() => {
    if (!originalToken) {
      navigate("/");
    }
    else if(originalToken != ""){
      profileBBD(originalToken);
    }
  }, [originalToken])

  const modifyUser = (user) => {
    if (user._id !== "") {
      const reference = "modify";
      setUserToModifyDelete(user);
      setReferenceModifyOrDelete(reference);
      setModalShow(true);
    }
  };

  const dateBBD = (id) => {
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
    // console.log(dataToSend.borradoLogico)
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

  const send = (id) => {
    dateBBD(id);
  };

  const deleteTo = (id) => {
    const dataToSend = {
      borradoLogico: `${
        modifyDetails.borradoLogico.toUpperCase() === "SI" ? true : false
      }`,
    };

    //implementar que si es admin no lo saque fuera al borrar

    if (dataToSend.borradoLogico) {
      console.log(profile.rol)
      deleteProfile(originalToken, id)
        .then(() => {
          setModalShow(false);
          dispatch(userLogout({ credentials: "" }));
          console.log("cuenta borrada");
        })

        .catch((error) => {
          console.error(error);
        });
    }
  };

  const activeTo = (id) => {
    const dataToSend = {
      borradoLogico: `${
        modifyDetails.borradoLogico.toUpperCase() === "SI" ? true : false
      }`,
    };
    if (dataToSend.borradoLogico) {
      reactiveProfile(originalToken, id)
        .then(() => {
          console.log("cuenta reactivada");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const inputDateModify = (e) => {
    setModifyDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const deleteUser = (user) => {
    if (user._id !== "") {
      const reference = "delete";
      setUserToModifyDelete(user);
      setReferenceModifyOrDelete(reference);
      setModalShow(true);
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
      <Container fluid className="">
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
                  handlerClickDel={deleteUser}
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
                      handlerClickDel={deleteUser}
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
