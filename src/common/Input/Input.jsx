import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"

export const Input = ({text ,name, type , handler}) => {
  return (
    <>
      <InputGroup className="mb-3">
          <Form.Control 
          type={type} 
          placeholder={text} 
          name={name}
          onChange={(e)=>handler(e)}/>
      </InputGroup>
    </>
  );
};
