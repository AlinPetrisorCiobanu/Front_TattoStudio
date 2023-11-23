import {useNavigate} from "react-router-dom"

export const Home = () =>{

    const navigate = useNavigate()

    const registerTo = () =>{
        navigate("/login")
    }

    const loginTo = () =>{
        navigate("/register")
    }

    return(
        <>
        <h1>Hola soy Home</h1>
        <h2>Que quieres hacer??</h2>
        <button onClick={loginTo}>Registrarse</button>
        <button onClick={registerTo}>Iniciar Sesion</button>
        
        </>
    )
}