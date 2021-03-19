import axios  from "axios";
import env from "react-dotenv";
const APP_API="http://localhost:8000/api";

export const DeleteRoute = async (id)=>{
 console.log(id);
   return await axios.delete(`${APP_API}/delete`,{params:{
       id:id
   }});
}


