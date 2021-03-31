import axios from "axios";
const APP_API="http://localhost:8000/api";

const LoginRoute=async (otp,phoneNo,password,position)=>{
    console.log(otp,phoneNo);
    return await axios.get(`${APP_API}/login`,{headers:{
        otp: otp,
        phoneNo: phoneNo,
        password: password,
        position: position, 
    }})
}

export const generateOtp = async (phoneNo,position)=>{
    return await axios.get(`${APP_API}/generate-otp`,{
        headers:{
            phoneNo,
            position,
        }
    });
}


// export const adminGenerateOtp = async (phoneNo)=>{
//     return await axios.get(`${APP_API}/admin-generate-otp`,{
//         headers:{
//             phoneNo
//         }
//     });
// }


export default LoginRoute;