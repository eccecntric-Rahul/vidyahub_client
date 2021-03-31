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

const loadBranch = async ()=>{
    return await axios.get(`${APP_API}/load-branch`);
}

const loadTopic = async (subject)=>{
    return await axios.get(`${APP_API}/load-topic`,{headers: {subject:subject}});
}

const getQueries= async(search)=>{
    return await axios.get(`${APP_API}/dsearch`,{
        headers: {
            search,
        },
    }); 
}

const getEnroll = async (eValues)=>{
    console.log(eValues)
    return await axios.get(`${APP_API}/enrollment`,{
        headers: {
            eName: eValues.eName,
            eEmail: eValues.eEmail,
            eDate: eValues.eDate,

        },
    }); 
}
const getEnrollmentDetails= async(url)=>{
    return await axios.get(`${APP_API}/get-enrollment`,{
        headers: {
            url,
        },
    }); 
}
const getFeeDetails= async(phoneNo)=>{
    return await axios.get(`${APP_API}/get-fee-details`,{
        headers: {
            phoneNo,
        },
    }); 
}


export default SearchRoute;
export {getFeeDetails,getEnrollmentDetails,getStudent,getCourse,loadCourses,loadBranch,loadTopic,getQueries,getEnroll};
