import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";


export const Input = ({ txt, name, type, pat, handler ,handlerError }) => {
  return (
    <>
      <InputGroup className="mb-3 ">
        <Form.Control
          type={type}
          placeholder={""}
          name={name}
          pattern={pat}
          onChange={handler}
          onBlur={handlerError}
          className={txt}
          maxLength={50}
        />
      </InputGroup>
    </>
  );
};
