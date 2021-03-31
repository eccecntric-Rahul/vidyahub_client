import BranchForm from "../components/forms/BranchForm";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCourse=()=>{
    return <>
        <h1 className='container-fluid p-5 text-center'>Add Branch</h1>
        <ToastContainer></ToastContainer>
        <div className='container-fluid'>
            <BranchForm />
        </div>
    </>
}

export default AddCourse;