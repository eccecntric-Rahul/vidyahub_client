import CourseForm from "../components/CourseForm"
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCourse=()=>{
    return <>
        <h1 className='container-fluid p-5 text-center'>Add Course</h1>
        <ToastContainer></ToastContainer>
        <div className='container-fluid'>
            <CourseForm />
        </div>
    </>
}

export default AddCourse;