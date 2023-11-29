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
  const [userToModifyDelete, setUserToModifyDelete] = useState({});
  const [referenceModifyOrDelete, setReferenceModifyOrDelete] = useState({});

  const modifyUser = (user) => {
    if(user._id!==""){
      const reference = "modify"
      setUserToModifyDelete(user)
      setReferenceModifyOrDelete(reference)
    setModalShow(true)
    }
    
  };
  const deleteUser = (user) => {
    if(user._id!==""){
      const reference = "delete"
      setUserToModifyDelete(user)
      setReferenceModifyOrDelete(reference)
      setModalShow(true)
    }
  };
  return (
    <>
    <MyVerticallyCenteredModal 
      show={modalShow}
      user={userToModifyDelete}
      reference={referenceModifyOrDelete}
      onHide={()=>setModalShow(false)}
    />
      <Container fluid className="">
        <Container className="d-flex justify-content-center containerFormRegister containerCardProfile">
          {profile.rol === "customer" || profile.rol === "artist" ? (
            <Row>
              <Col>
                <Card
                  key={profile._id}
                  user={profile}
                  
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
