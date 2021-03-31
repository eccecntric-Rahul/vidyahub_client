import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopicForm from "../components/forms/TopicForm";

const Topic=()=>{
    return <>
        <h1 className='container-fluid p-5 text-center'>Add Schedule</h1>
        <ToastContainer></ToastContainer>
        <div className='container-fluid'>
            <TopicForm />
        </div>
    </>
}

export default Topic;