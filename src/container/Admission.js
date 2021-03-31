import AdmissionForm from "../components/forms/AdmissionForm";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admission=()=>{
    return <><div className="container-fluid p-5 bg-secondary h1 text-center">
        Admission Form
    </div>
    <ToastContainer></ToastContainer>
    <AdmissionForm></AdmissionForm>

    </>

}
export default Admission;