import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FeeForm from "../components/FeeForm";

const Fee=()=>{
    return <><div className="container-fluid p-5 bg-secondary h1 text-center">
        Fee Update
    </div>
    <ToastContainer></ToastContainer>
    <FeeForm />
    </>

}
export default Fee;