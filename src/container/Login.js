import { useState } from "react";
import { toast } from "react-toastify";
import LoginRoute from "../Route/LoginRoute";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import { Link } from "react-router-dom";
const Login=()=>{
    const auth=useSelector((state)=>({...state}));
    const history= useHistory();
    const dipatch = useDispatch();
    const [values,setValues] =useState({
        emailAdd:"",
        position:"",
        password: "",
    });

    const {emailAdd,position,password}= values;

   const  handleSubmit = async (e)=>{
    e.preventDefault();
    try{
        const response = await LoginRoute(values);
        if(!response)toast.error("Pls provide all the information");
        window.localStorage.setItem("auth",JSON.stringify(response.data));
        dipatch({
            type: "LOGGED_IN",
            payload: response.data,
        });
        history.push('/dashboard');
        toast.success("Logged In",response.err);
    }catch(err){
        console.log(err);
        toast.error(err);
    }
   }

    return (<>  <div className="d-flex bg-light p-2 align-items-center justify-content-between">
        <span className="text-danger h3">Student Enquiry</span>
        <Link to="/search">Search</Link>
        <Link to="/">Register Student</Link>
        {!auth&&!auth.token&&<Link to="/login">Login</Link>}
        {!auth&&!auth.token&&<Link to ="/signup">Sign Up</Link>}
    </div>
        <div className="container-fluid h1 p-3 text-center bg-secondary">
            Login Page
        </div>
        <div className="form-group container-fluid">
       <div className="row">
       <div className="col-md-6 col-sm-6 offset-3 mt-2">
       <form onSubmit={handleSubmit} >
           <input type="email" placeholder="emailAdd" className="form-control m-1" value={emailAdd} name="emailAdd" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
           <select className="form-control m-1" value={position} name="position" onChange={(e)=>(setValues({...values,[e.target.name]:e.target.value}))}>
                <option >teacher</option>
                <option >admin</option>
                <option >student</option>
            </select>
             <input type="password" placeholder="Password" className="form-control m-1" value={password} name="password" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
            <button type="submit" className="btn btn-primary form-control m-1">Login</button>
        </form>
       </div>
       </div>
    </div>     
    </>);
}


export default Login;