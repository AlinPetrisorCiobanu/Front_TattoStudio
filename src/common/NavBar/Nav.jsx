import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { userDate, userLogout } from "../../pages/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import "./Nav.css";
import { data_search } from "../../pages/searchUserSlice";


export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // dispatch(userLogout({ credentials: "" }));
  //con la ayuda de Redux traigo el token de la pagina de login
  const token = useSelector(userDate).credentials;
  const [name, setName] = useState("user");
  const [rol, setRol] = useState("user");
  const [dataSearchTo, setDataSearchTo] = useState({
    rolSearch: "all",
    emailSearch: "",
    deletedSearch: "all",
  });

  //saco el nombre que tengo guardado en el token.
  const getTokenName = () => {
    if (token) {
      const decodedToken = jwtDecode(String(token));
      setName(decodedToken.name);
      setRol(decodedToken.rol);
    }
  };
  useEffect(() => {
    getTokenName();
  }, [token]);

  //la función de logout
  const LogOut = () => {
    dispatch(userLogout({ credentials: "" }));
    navigate("/");
  };

  //he añadido la escucha de evento del scroll para que el navbar no se sobreponga al body.
  window.addEventListener("scroll", () => {
    let navbar = document.querySelector(".navBarBootsTrap");
    if (window.scrollY > 10) {
      navbar.style.position = "fixed";
    } else {
      navbar.style.position = "static";
      navbar.style.width = "100%";
    }
  });

  //guardo los valores para search
  const dataSearch = (e) => {
    setDataSearchTo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  useEffect(()=>{
    dispatch(data_search({ data : dataSearchTo }))
  },[dataSearchTo])

  return (
    <Navbar collapseOnSelect expand="lg" className="navBarBootsTrap">
      <Container className="propiedadesNav">
        <Navbar.Brand className="configTextNav" href="/home">
          Home
        </Navbar.Brand>
        {location.pathname === "/profile" && rol === "admin" ? (
          <div>
            <Navbar.Brand className="configTextNav">
              <label htmlFor="#">rol :</label>
              <select name="rolSearch" onChange={((e)=>dataSearch(e))} className="selectSearchBar">
                <option value={"all"}>todos</option>
                <option value={"customer"}>clientes</option>
                <option value={"artist"}>tatuadores</option>
                <option value={"admin"}>admin</option>
              </select>
            </Navbar.Brand>
            <Navbar.Brand className="configTextNav">
              <label htmlFor="inputSearchBar">email :</label>
              <input type="text" maxLength={50} className="inputSearchBar"  name="emailSearch" onChange={((e)=>dataSearch(e))}/>
            </Navbar.Brand>
            <Navbar.Brand className="configTextNav">
              <label htmlFor="#">borrado :</label>
              <select name="deletedSearch" onChange={((e)=>dataSearch(e))} className="selectSearchBar">
                <option value={"all"}>todos</option>
                <option value={"NO"}>no</option>
                <option value={"SI"}>si</option>
              </select>
            </Navbar.Brand>
          </div>
        ) : (
          ""
        )}

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          {!token ? (
            <Nav>
              <Nav.Link className="configTextNav" href="/register">
                Registrate
              </Nav.Link>
              <Nav.Link className="configTextNav" href="/login">
                Iniciar Sesion
              </Nav.Link>
              <Nav.Link className="configTextNav" href="/">
                Contacto
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link className="configTextNav" href="#features">
                Tatuadores
              </Nav.Link>
              <Nav.Link className="configTextNav" href="#pricing">
                Galeria
              </Nav.Link>
              <NavDropdown
                className="configTextNav"
                title={rol === "admin" ? "admin" : name}
                id="collapsible-nav-dropdown"
              >
                {rol === "admin" ? (
                  <NavDropdown.Item className="configTextNav" href="/profile">
                    Perfiles
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item className="configTextNav" href="/profile">
                    Mi Perfil
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item className="configTextNav" href="/appointment">
                  Sessiones
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="configTextNav" href="/modify/user">
                  Contacto
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  className="configTextNav"
                  onClick={() => {
                    LogOut();
                  }}
                >
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
