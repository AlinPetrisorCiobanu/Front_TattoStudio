import { useState, useEffect } from "react";
import { getProfile } from "../../servicios/apiCalls";
import { useSelector } from "react-redux";
import { userDate } from "../userSlice";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Card } from "../../common/Card/Card";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { MyVerticallyCenteredModal } from "../../common/Modal/Modal";

export const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [profiles, setProfilesAdmin] = useState([{}]);

  const originalToken = useSelector(userDate).credentials;
  const profileBBD = (date) => {
    getProfile(date)
      .then((res) => {
        if (res.rol === "customer" || res.rol === "artist") {
          setProfile(res);
        } else {
          setProfilesAdmin(res);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    profileBBD(originalToken);
  }, [originalToken]);

  const [modalShow, setModalShow] = useState(false);

  const modifyUser = () => {
    setModalShow(true)
  };
  const deleteUser = () => {
    console.log("borr");
  };
  return (
    <>
    <MyVerticallyCenteredModal 
      show={modalShow}
      onHide={()=>setModalShow(false)}
    />
      <Container fluid className="">
        <Container className="d-flex justify-content-center containerFormRegister containerCardProfile">
          {profile.rol === "customer" || profile.rol === "artist" ? (
            <Row>
              <Col>
                <Card
                  key={profile._id}
                  id={profile._id}
                  name={profile.name}
                  last_Name={profile.lastName}
                  idUser={profile.idUser}
                  tlf={profile.tlf}
                  email={profile.email}
                  years={profile.birthday}
                  rol={profile.rol}
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
                      id={users._id}
                      name={users.name}
                      last_Name={users.lastName}
                      idUser={users.idUser}
                      tlf={users.tlf}
                      email={users.email}
                      years={users.birthday}
                      rol={users.rol}
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
