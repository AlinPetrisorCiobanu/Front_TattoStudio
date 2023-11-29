import { useState, useEffect } from "react"
import { deleteProfile, getProfile, modifyProfile, reactiveProfile } from "../../servicios/apiCalls"
import { useSelector } from "react-redux"
import { userDate } from "../userSlice"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import { Card } from "../../common/Card/Card"
import { useNavigate } from "react-router-dom"
import { MyVerticallyCenteredModal } from "../../common/Modal/Modal"
import "./Profile.css"

export const Profile = () => {
  const navigate = useNavigate()
  const originalToken = useSelector(userDate).credentials

  const [profile, setProfile] = useState({})
  const [profiles, setProfilesAdmin] = useState([{}])

  const profileBBD = (date) => {
    getProfile(date)
      .then((res) => {
        if (res.rol === "customer" || res.rol === "artist") {
          setProfile(res)
        } else {
          setProfilesAdmin(res)
        }
      })
      .catch((err) => console.log(err))
  };
  useEffect(() => {
    if (!originalToken) {
      navigate("./")
    }
    profileBBD(originalToken)
  }, [originalToken])

  const [modalShow, setModalShow] = useState(false)
  const [userToModifyDelete, setUserToModifyDelete] = useState({})
  const [referenceModifyOrDelete, setReferenceModifyOrDelete] = useState({})

  const modifyUser = (user) => {
    if (user._id !== "") {
      const reference = "modify"
      setUserToModifyDelete(user)
      setReferenceModifyOrDelete(reference)
      setModalShow(true)
    }
  }

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

  const dateBBD = async (id) => {
    try {
      const dataToSend = {
        name: `${modifyDetails.name}`,
        lastName: `${modifyDetails.lastName}`,
        password: `${modifyDetails.password}`,
        idUser: `${modifyDetails.idUser}`,
        tlf: `${modifyDetails.tlf}`,
        birthday: `${modifyDetails.years}`,
        email: `${modifyDetails.email}`,
        rol: `${modifyDetails.rol === "admin" ? "admin" : modifyDetails.rol === "artist" ? "artist" : "customer" }`,
      }
      // console.log(dataToSend.borradoLogico)
      await modifyProfile(originalToken , dataToSend , id);
      console.log(`${dataToSend.name} los datos se han actualizado corectamente`)
    } catch (error) {
      // setBaseError(error.response.data.message)
      console.error(error);
    }
  };

  const send = (id) => {
    dateBBD(id);
  };
  const deleteTo = async (id) => {
    try {
      const dataToSend = {
        borradoLogico: `${modifyDetails.borradoLogico.toUpperCase()==="SI"?true:false}`,
      }
      if(dataToSend.borradoLogico){
        await deleteProfile(originalToken , id)
      console.log("cuenta borrada")
      }
    } catch (error) {
      console.error(error)
    }
  }
  const activeTo = async (id) => {
    try {
      const dataToSend = {
        borradoLogico: `${modifyDetails.borradoLogico.toUpperCase()==="SI"?true:false}`,
      }
      if(dataToSend.borradoLogico){
        await reactiveProfile(originalToken , id)
        console.log("cuenta reactivada")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const inputDateModify = (e) => {
    setModifyDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const deleteUser = (user) => {
    if (user._id !== "") {
      const reference = "delete"
      setUserToModifyDelete(user)
      setReferenceModifyOrDelete(reference)
      setModalShow(true)
    }
  }
  // console.log(modifyDetails)
  return (
    <>
      <MyVerticallyCenteredModal
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
                  user={profile}
                  rol={
                    profile.rol === "customer" || profile.rol === "artist"
                      ? profile.rol
                      : "admin"
                  }
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
                      key={users.idUser}
                      user={users}
                      rol={
                        profile.rol === "customer" || profile.rol === "artist"
                          ? profile.rol
                          : "admin"
                      }
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
