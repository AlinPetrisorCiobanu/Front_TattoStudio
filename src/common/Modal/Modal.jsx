import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Input } from "../Input/Input";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export const ModalCommon = ({
  show,
  onHide,
  user,
  reference,
  rol,
  inputHandler,
  inputHandlerDate,
  handlerClick,
  handlerDelete,
  handlerReactive,
  date,
}) => {
  const props = { show, onHide };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter text-center">
          {reference === "modify"
            ? "Modificar!"
            : reference === "delete"
            ? "Borrar!!!"
            : "Citas"}
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
                <h6>ID : {user._id}</h6>
                <h6>Nombre : {user.name} :</h6>
                <Input
                  type={"text"}
                  name={"name"}
                  handler={(e) => inputHandler(e)}
                />
                <h6>Apellidos : {user.lastName} :</h6>
                <Input
                  type={"text"}
                  name={"lastName"}
                  handler={(e) => inputHandler(e)}
                />
                <h6>Dni/Nie : {user.idUser} :</h6>
                <Input
                  type={"text"}
                  name={"idUser"}
                  handler={(e) => inputHandler(e)}
                />
                <h6>Fecha de Nacimiento : {user.birthday} :</h6>
                <Input
                  type={"text"}
                  name={"years"}
                  handler={(e) => inputHandler(e)}
                />
                <h6>Telefono : {user.tlf} :</h6>
                <Input
                  type={"text"}
                  name={"tlf"}
                  handler={(e) => inputHandler(e)}
                />
                <h6>Email : {user.email} :</h6>
                <Input
                  type={"text"}
                  name={"email"}
                  handler={(e) => inputHandler(e)}
                />
                <h6>Contraseña :</h6>
                <Input
                  type={"text"}
                  name={"password"}
                  handler={(e) => inputHandler(e)}
                />
                <h6>Rol : {user.rol} :</h6>
                <Input
                  type={"text"}
                  name={"rol"}
                  handler={(e) => inputHandler(e)}
                />
                <h6>Borrado : {user.borradoLogico === true ? "SI" : "NO"} :</h6>
                <Input
                  type={"text"}
                  name={"borradoLogico"}
                  handler={(e) => inputHandler(e)}
                />
                <Button onClick={() => handlerClick(user._id)}>
                  modificar
                </Button>
                <h5>Eres Admin , asi que porfavor introduce datos validos</h5>
              </div>
            ) : (
              <div>
                <h4 className="text-center">
                  {user.name} {user.lastName}
                </h4>
                <h6>Nombre : {user.name}</h6>{" "}
                <Input
                  type={"text"}
                  name={"name"}
                  handler={(e) => inputHandler(e)}
                />
                <h6>Apellidos : {user.lastName}</h6>{" "}
                <Input
                  type={"text"}
                  name={"lastName"}
                  handler={(e) => inputHandler(e)}
                />
                <h6>Contraseña : </h6>{" "}
                <Input
                  type={"text"}
                  name={"password"}
                  handler={(e) => inputHandler(e)}
                />
                <Button onClick={() => handlerClick()}>modificar</Button>
                <h6 className="text-center">
                  Para modificar el resto de datos pongase en contacto con
                  nosotros{" "}
                </h6>
              </div>
            )}
          </div>
        ) : reference === "delete" ? (
          <div>
            {rol === "admin" ? (
              <div>
                <h6>Seguro que quieres borrar su cuenta :</h6>
                <Input
                  type={"text"}
                  name={"borradoLogico"}
                  handler={(e) => inputHandler(e)}
                />
                {user.borradoLogico === true ? (
                  <Button onClick={() => handlerReactive(user._id)}>
                    Reactivar
                  </Button>
                ) : (
                  <Button onClick={() => handlerDelete(user._id)}>
                    Borrar
                  </Button>
                )}
              </div>
            ) : (
              <div>
                <h6>Seguro que quieres borrar tu cuenta :</h6>
                <Input
                  type={"text"}
                  name={"borradoLogico"}
                  handler={(e) => inputHandler(e)}
                />
                <Button onClick={() => handlerDelete()}>borrar</Button>
              </div>
            )}
          </div>
        ) : reference === "appointment" ? (
          <div>
            <h6>fecha</h6>
            <DatePicker 
            selected={date}
            name={"date"}
            onChange={inputHandlerDate}
            />
          <h6>Hora</h6>
            <Input
            type={"text"}
            name={"startTime"}
            handler={(e) => inputHandler(e)}
          />
          <h6>Tatuaje o Piercing</h6>
            <Input
            type={"text"}
            name={"intervention"}
            handler={(e) => inputHandler(e)}
          />
          <h6>Tatuador</h6>
            <Input
            type={"text"}
            name={"idArtist"}
            handler={(e) => inputHandler(e)}
          />
          <Button onClick={()=>handlerClick()}>pedir cita</Button>
          </div>
        ) : (
          <h6>Hola</h6>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
