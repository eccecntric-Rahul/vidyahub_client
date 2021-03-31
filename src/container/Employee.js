import EmployeeForm from "../components/forms/EmployeeForm";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Employee=()=>{
    return <>
        <h1 className='container-fluid p-5 text-center'>Add Employee</h1>
        <ToastContainer></ToastContainer>
        <div className='container-fluid'>
            <EmployeeForm />
        </div>
    </>
}

export default Employee;