import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { userDate } from "../../pages/userSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

export const MyVerticallyCenteredModal = ({
  show,
  onHide,
  user,
  reference,
}) => {
  const props = { show, onHide };

  const [rol, setRol] = useState("");
  const token = useSelector(userDate).credentials;

  const getTokenName = () => {
    if (token) {
      const decodedToken = jwtDecode(String(token));
      setRol(decodedToken.rol);
    }
  };

  useEffect(() => {
    getTokenName();
  }, [token]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter text-center">
          {reference === "modify" ? "Modificar!" : "Borrar!!!"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {reference === "modify" ? (
          <div>
            {rol === "admin" ? (
              <div>
                <h4 className="text-center">
                  {user.name} {user.lastName}
                </h4>
                <h6>{user.name}</h6>
                <h6>{user.lastName}</h6>
                <h6>{user.idUser}</h6>
                <h6>{user.birthday}</h6>
                <h6>{user.tlf}</h6>
                <h6>{user.email}</h6>
                <h6>{user.password}</h6>
                <h6>{user.rol}</h6>
                <h6>{user.borradoLogico === true ? "SI" : "NO"}</h6>
              </div>
            ) : (
              <div>
                <h4 className="text-center">
                  {user.name} {user.lastName}
                </h4>
                <h6>Nombre:</h6>
                <h6>Apellidos :</h6>
                <h6>Contraseña :</h6>
                <h5 className="text-center">
                  Para modificar el resto de datos pongase en contacto con
                  nosotros{" "}
                </h5>
              </div>
            )}
          </div>
        ) : (
          <div>
            {rol === "admin" ? (
              <div>
                <h6>Seguro que quieres borrar su cuenta</h6>
              </div>
            ) : (
              <div>
                <h6>Seguro que quieres borrar tu cuenta</h6>
              </div>
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
