import axios  from "axios";
const APP_API="http://localhost:8000/api";

export const UpdateRoute = async (formData,URL) => {
    
   return await axios.put(`${APP_API}/update/${URL}`,formData);
}

export const UpdateFee = async(formData,token)=>{
      return await axios.put(`${APP_API}/update-fee`,formData,{headers:{
            authorization: `Bearer ${token}`,
         } });
}
