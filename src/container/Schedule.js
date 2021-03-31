import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScheduleForm from "../components/forms/ScheduleForm";

const Schedule=()=>{
    return <>
        <h1 className='container-fluid p-5 text-center'>Add Schedule</h1>
        <ToastContainer></ToastContainer>
        <div className='container-fluid'>
            <ScheduleForm />
        </div>
    </>
}

export default Schedule;