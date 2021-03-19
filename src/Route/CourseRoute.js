import axios  from "axios";
import env from "react-dotenv";
const APP_API="http://localhost:8000/api";

export const CourseRoute = async (formData,token) => {
    console.log(formData);
   return await axios.post(`${APP_API}/add-course`,formData,{
       headers:{
           authorization: `Bearer ${token}`,
       }
   });
}
