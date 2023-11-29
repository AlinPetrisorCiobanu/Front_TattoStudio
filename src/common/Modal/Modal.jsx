import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const MyVerticallyCenteredModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter text-center">
          Hola
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className='text-center'>Bueno</h4>
        <p>
          este es un modal echo con bootstrap
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

// function App() {
//   const [modalShow, setModalShow] =useState(false);

//   return (
    // <>
    //   <Button variant="primary" onClick={() => setModalShow(true)}>
    //     Launch vertically centered modal
    //   </Button>

    //   <MyVerticallyCenteredModal
    //     show={modalShow}
    //     onHide={() => setModalShow(false)}
    //   />
    // </>
//   );
// }

// render(<App />);