import Col from "react-bootstrap/Col";
import { Input } from "../Input/Input";

export const Form = ({ type, name, txt, nameLabel, nrCol, handlerInput , functionError}) => {
  return (
    <>
        <Col className="display-flex" md={nrCol}>
          <label className="mb-2 mt-4">{nameLabel}</label>
          <Input
            type={type}
            name={name}
            txt={txt}
            handler={(e) => handlerInput(e)}
            handlerError={(e) => functionError(e)}
          />
        </Col>
    </>
  );
};
