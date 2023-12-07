import {createContext, useState, useContext, useEffect } from "react";
import { registerRequest, 
        loginRequest, 
        verifyTokenRequest,
        logoutRequest } from "../api/auth";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe estar definido en un contexto');
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] =useState(true);
    //Funcion para registar usuarios
    const signup = async (user) => {
        try {
            //Enviamos el post de register al backend
            const res = await registerRequest(user);
            //console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response.data.message);
            //Guardamos el error en la variable error
            setErrors(error.response.data.message);
        }
    } //Fin del signup
    //Función para iniciar sesion
    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            //console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            //console.log(error);
            setErrors(error.response.data.message);
        }
    }//Fin de signin
    const logout= () => {
        logoutRequest();
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null)
    }//Fin de logout
    //Borrar errores después de 5 seg
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);//Fin del useEffect

    useEffect ( () => {
        async function checkLogin () {
            const cookies = Cookies.get();
            //console.log(cookies.token);
            if(!cookies.token){
                //Si no hay una cookie que contenga ek token
                setIsAuthenticated(false); //El usuario no esta autenticado
                setLoading(false);//No hay cookie y ya no se cargan los datos
                //Establecemos los datos del usuario en null
                return setUser(null);
            }//Fin de !cookies.token

            try {//En caso de que si exista un token lo verificamos
                 const res= await verifyTokenRequest(cookies.token);
                 console.log(res);
                 if(!res.data) { //Si el servidor no responde con un token
                    setIsAuthenticated(false);//El usuario no est aautenticado
                    setLoading(false);
                    return;
                 }
                 //En caso de que si exista un token y se obtengan datos de respuesta
                 setIsAuthenticated(true);//El usuario ya esta autenticado
                 setUser(res.data);//Establecemos los datos del usuario
                 setLoading(false);//Terminó de cargar los datos del usuario
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false),
                setLoading(false);
                setUser(null);
            }//Fin del Cath
        }//Fin de checkLogin
        checkLogin();
    }, [] ); //Fin del useEffect

    return (
        <AuthContext.Provider value={ {
            signup,
            signin,
            user,
            isAuthenticated,
            errors,
            loading,
            logout
        }} >
            {children}
        </AuthContext.Provider>
    )
}