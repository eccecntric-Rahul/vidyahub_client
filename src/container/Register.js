import React from "react";
import RegisterForm from "../components/RegisterForm";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Register = () =>{
    const auth= useSelector((state)=>({...state}));
    return (<>
    <div className="d-flex bg-light p-2 align-items-center justify-content-between">
        <span className="text-danger h3">Student Enquiry</span>
        <Link to="/search">Search</Link>
        {!auth && !auth.token&&<Link to="/login">Login</Link>}
        {!auth&&!auth.token&&<Link to="/signup">Sign Up</Link>}
        {auth&&auth.token?<Link to="/dashboard">Dashboard</Link>: <Link to="/signup">Sign Up</Link>}
    </div>
    <div className="container-fluid text-center p-3 h1 bg-secondary">
    Register Form
    </div>
    <ToastContainer />
    <RegisterForm />
    </>);
  
}

export default Register;