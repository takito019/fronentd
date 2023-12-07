import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute() {
    const { loading, isAuthenticated } = useAuth();
    console.log("Loading" + loading);
    console.log("isAuthenticated" + isAuthenticated);

    //Si esta cargando la app los datos retorna cargando en un h1
    if(loading)
    {
        return <h1>Cargando...</h1>
    }

    //Si la aplicacion no esta cargando
    //y ademas no esta autenticado, entonces redirige a /login
    if (!loading && !isAuthenticated)
        return <Navigate to='/login' replace />

    return ( <Outlet/> )
}

export default ProtectedRoute
