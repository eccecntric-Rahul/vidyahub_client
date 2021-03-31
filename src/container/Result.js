import UpdateForm from "../components/forms/UpdateForm";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


const Result=(props)=>{
    
    
    return (<>
        <div className="d-flex bg-light p-2 align-items-center justify-content-between">
            <span className="text-danger h3">Student Enquiry</span>
            <Link to="/search">Search</Link>
            <Link to="/">Register Student</Link>
            <Link to="/login">Login</Link>
            <Link to ="/signup">Sign Up</Link>
        </div>
        <div className="container-fluid text-center p-3 h1 bg-secondary">
        Update Student
        </div>
        <ToastContainer />
        <UpdateForm />
        </>);
}

export default Result;