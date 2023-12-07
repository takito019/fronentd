import axios from "axios";

const instance = axios.create( {
    //baseURL:'http://localhost:4000/api',
    baseURL:'https://apiproductos-9bzd.onrender.com/api',
    withCredentials:true,
    headers:{
        Accept:'application/json'
    }
});

export default instance;