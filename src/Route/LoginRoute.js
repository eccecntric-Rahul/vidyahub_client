import axios from "axios";
const APP_API="http://localhost:8000/api";

const LoginRoute=async (values)=>{
     const   {emailAdd,password,position}=values;
    return await axios.get(`${APP_API}/login`,{headers:{
        emailAdd,password,position
    }})
}


export default LoginRoute;