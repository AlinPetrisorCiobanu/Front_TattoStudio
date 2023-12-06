import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";


export const Input = ({ txt, name, type, pat, handler ,handlerError , defaultValue}) => {
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
          value={defaultValue}
          className={txt}
          maxLength={50}
        />
      </InputGroup>
    </>
  );
};
