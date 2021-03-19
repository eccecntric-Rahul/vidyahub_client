import axios from "axios"
const APP_API="http://localhost:8000/api";

const SearchRoute=async (formData,req,res)=>
{   
    return await axios.post(`${APP_API}/search`,formData);
}

const getStudent=async (url)=>{
    return await axios.get(`${APP_API}/${url}`);
}

const getCourse = async (req,res)=>{
        return await axios.get(`${APP_API}/get-course`);
}

const loadCourses = async (courseName)=>{
    return await axios.get(`${APP_API}/load-course`,{
        headers: {
            courseName,
        },
    });
}

export default SearchRoute;
export {getStudent,getCourse,loadCourses};
