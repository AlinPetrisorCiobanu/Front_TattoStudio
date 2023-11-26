import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export const Input = ({ txt, name, type, pat, handler }) => {
  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          type={type}
          placeholder={txt}
          name={name}
          pattern={pat}
          onChange={(e) => handler(e)}
        />
      </InputGroup>
    </>
  );
};
