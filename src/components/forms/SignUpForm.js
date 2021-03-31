import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SignUpAction from "../../action/SignUpAction";
import { getCourse } from "../../Route/SearchRoute";

const SignUpForm=()=>{
    
    

    const [values,setValues] =useState({
        name: "",
        phoneNo:"",
        position:"",
        password: "",
        
    });
    

    const {name,phoneNo,position,password}= values;

   const  handleSubmit = async (e)=>{
    e.preventDefault();
    try{
        const response = await SignUpAction(values);
        console.log(response);
        toast.success("User Created");
    }catch(err){
        console.log(err);
    }
   }

    return (<>
        <div className="form-group(( container-fluid">
       <div className="row">
       <div className="col-md-6 col-sm-6 offset-3 mt-2">
       <form onSubmit={handleSubmit} >
           <input type="text" name="name" className="form-control m-1" placeholder="Name" value={name} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
           <input type="text" placeholder="Phone No" className="form-control m-1" value={phoneNo} name="phoneNo" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
            <select className="form-control m-1" value={position} name="position" onChange={(e)=>(setValues({...values,[e.target.name]:e.target.value}))}>
                <option >teacher</option>
                <option >admin</option>
                <option >student</option>
            </select>
            
            <input type="password" placeholder="Password" className="form-control m-1" value={password} name="password" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
            <button type="submit" className="btn btn-primary form-control m-1">Sign Up</button>
        </form>
       </div>
       </div>
    </div>     
    </>);
}


export default SignUpForm;