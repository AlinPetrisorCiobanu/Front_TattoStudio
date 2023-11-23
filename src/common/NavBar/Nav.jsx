import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Nav.css";

export const Navigation = () => {
    const name = localStorage.getItem('nombre')
  const [token, setToken] = useState({});
  const getToken = () => {
    const originalToken = localStorage.getItem("token");
    setToken(originalToken);
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="navBarBootsTrap , bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="/home">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          {!token ? (
            <Nav>
              <Nav.Link href="#features">Registrate</Nav.Link>
              <Nav.Link href="#pricing">Iniciar Sesion</Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="#features">Tatuadores</Nav.Link>
              <Nav.Link href="#pricing">Galeria</Nav.Link>
              <NavDropdown title={name} id="collapsible-nav-dropdown">
                <NavDropdown.Item href="/profile">Mi Perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/modify/user">Datos</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/appointment">
                  Sessiones
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout">Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
/*
const token = "ajshdj"

{!token 
?(no aparece register)
:(aparece register <a href="/register">Register</a>)}

*/
