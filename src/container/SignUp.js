import React from "react";
import SignUpForm from "../components/forms/SignUpForm";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const SignUp=()=>{
    return (<><div className="d-flex bg-light p-2 align-items-center justify-content-between">
    <span className="text-danger h3">Student Enquiry</span>
    <Link to="/">add Student</Link>
    <Link to="/login">Login</Link>
    </div>
        <div className="bg-secondary p-2 h1 text-center">
        SignUp
        </div>
        <ToastContainer />
        <SignUpForm />
    </>)
}

export default SignUp;