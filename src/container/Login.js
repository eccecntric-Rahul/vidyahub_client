import { useState } from "react";
import { toast } from "react-toastify";
import LoginRoute, { generateOtp,adminGenerateOtp } from "../Route/LoginRoute";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import { Link } from "react-router-dom";
const Login=()=>{
    const auth=useSelector((state)=>({...state}));
    const history= useHistory();
    const dipatch = useDispatch();
    const [values,setValues] =useState({
        phoneNo:"",
        position:"",
        password: false,
        emailAdd: "",
    });
    const [otp,setOtp]= useState();
    const {emailAdd,phoneNo,position,password}= values;
    const [visible,setVisible]=useState(false);
    const [adminVisible,setAdminVisible]= useState(false);
    const handleClick=async (e)=>{
        e.preventDefault();
        const response= await generateOtp(phoneNo,position);
        if(response.status==200){
            setVisible(true);
        }
        else{
            toast.error("No user found with this Number");
        }
    }

    const handleAdminClick= async (e)=>{
        e.preventDefault();
        const resp= await generateOtp(phoneNo,position);
        if(resp.status==200){
            console.log(resp);
            toast.success(resp);
            setAdminVisible(true);
        }else{
            toast.error("login error");
        }
    }

   const  handleSubmit = async (e)=>{
    e.preventDefault();
    try{
        const response = await LoginRoute(otp,phoneNo,password,position);
        console.log(response);
        if(!response)toast.error("Pls provide all the information");
        
        else if(response.status==200)
        {
        window.localStorage.setItem("auth",JSON.stringify(response.data));
        dipatch({
            type: "LOGGED_IN",
            payload: response.data,
        });
        history.push('/dashboard');
        toast.success("Logged In",response.data);
        }
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
       <select className="form-control m-1" value={position} name="position" onChange={(e)=>(setValues({...values,[e.target.name]:e.target.value}))}>
                <option value="staff" >staff</option>
                <option value="admin">admin</option>
                <option value="student" >student</option>
                <option value="other">other</option>
            </select>
           
         {(position=="staff"||position=="student")&& <> <input type="Number" placeholder="Number" className="form-control m-1" value={phoneNo} name="phoneNo" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />   
           <button onClick={handleClick} className="btn btn-dark btn-sm m-1">send OTP</button>
         </>}

        {position=="admin"&&<>
        <input type="Number" placeholder="Number" className="form-control m-1" value={phoneNo} name="phoneNo" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />   
           <button onClick={handleAdminClick} className="btn btn-dark btn-sm m-1">send OTP</button>
        </>}


         { visible&&
           <input type="Number" placeholder="Enter OTP" className="form-control m-1" value={otp} name="otp" onChange={(e)=>setOtp(e.target.value)} />
        
         }
            
         {adminVisible&& <> <input type="Number" placeholder="Enter OTP" className="form-control m-1" value={otp} name="otp" onChange={(e)=>setOtp(e.target.value)} />
            <input type="password" placeholder="Password" className="form-control m-1" value={password} name="password" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
           </>}
            <button type="submit" className="btn btn-primary form-control m-1">Login</button>
        </form>
       </div>
       </div>
    </div>     
    </>);
}


export default Login;