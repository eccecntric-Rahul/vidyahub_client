import axios from "axios"
const APP_API="http://localhost:8000/api";


const SignUpRoute= async (formData)=>{
    return await axios.post(`${APP_API}/signup`,formData);
}

export default SignUpRoute;