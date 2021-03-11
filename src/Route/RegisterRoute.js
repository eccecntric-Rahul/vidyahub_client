import axios  from "axios";
import env from "react-dotenv";
const APP_API="http://localhost:8000/api";

export const NewRegister = async (formData,req,res) => {
    console.log(formData);
   return await axios.post(`${APP_API}/new-register`,formData);
}
