import axios  from "axios";
import env from "react-dotenv";
const APP_API="http://localhost:8000/api";

export const NewRegister = async (formData,req,res) => {
    console.log(formData);
   return await axios.post(`${APP_API}/new-register`,formData);
}


export const Admission = async (formData,token)=>{
    return await axios.post(`${APP_API}/admission`,formData,{headers:{
        authorization: `Bearer ${token}`,
     } });
}


export const Branch = async (formData,token)=>{
    return await axios.post(`${APP_API}/add-branch`,formData,{
        headers:{
            authorization: `Bearer ${token}`,
        }
    });

}

export const Employee = async (formData,token)=>{
    return await axios.post(`${APP_API}/add-employee`,formData,{
        headers:{
            authorization: `Bearer ${token}`,
        }
    });

}
export const Schedule = async (formData,token)=>{
    return await axios.post(`${APP_API}/add-schedule`,formData,{
        headers:{
            authorization: `Bearer ${token}`,
        }
    });

}

export const Enrollment = async (formData,token)=>{
    return await axios.post(`${APP_API}/enrollment`,formData,{
        headers:{
            authorization: `Bearer ${token}`,
        }
    });

}

export const Fee = async (formData,token)=>{
    return await axios.post(`${APP_API}/fee-schedule`,formData,{
        headers:{
            authorization: `Bearer ${token}`,
        }
    });

}


export const Topic  = async (formData,token)=>{
    return await axios.post(`${APP_API}/add-topic`,formData,{
        headers:{
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
        }
    });

}
export const uploadFile = async (formData,token)=>{
    return await axios.post(`${APP_API}/upload-file`,formData,{
        headers:{
            authorization: `Bearer ${token}`,
        }
    });
}