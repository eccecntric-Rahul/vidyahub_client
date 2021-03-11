import React from "react";
import RegisterForm from "../components/RegisterForm";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () =>{
    return (<>
    <div className="container-fluid text-center p-3 h1 bg-secondary">
    Register Form
    </div>
    <ToastContainer />
    <RegisterForm />
    </>);
  
}

export default Register;