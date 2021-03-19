import { useState } from "react";
import { CourseRoute } from "../Route/CourseRoute";
import {toast} from "react-toastify";
import { useSelector } from "react-redux";

const CourseForm=()=>{
    
    const auth = useSelector((state)=>({...state}));

    const [values,setValues]= useState({
        name: "",
        to: "",
        from: "",
        classTo: "",
        classFrom: "",
    });
    const {name,to,from,classTo,classFrom}=values;
    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        var formData= new FormData();
        formData.append("name",name);
        formData.append("to",to);
        formData.append("from",from);
        formData.append("classTo",classTo);
        formData.append("classFrom",classFrom);
        try{const res= await CourseRoute(formData,auth.token);
        if(res) toast.success("Course Added");
        }catch(err){
            console.log(err);
        }
    }

    return <form className="form-group" onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-control m-1">Name</label>
        <input type="text" name="name" className="form-control m-1" value={name} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
        <label htmlFor="name" className="form-control m-1">From</label>
        
        <input type='date' name="from" className="form-control m-1" value={from} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
        <label htmlFor="name" className="form-control m-1">To</label>
        
        <input type="date"  name="to" className="form-control m-1" value={to} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
        <label htmlFor="name" className="form-control m-1">Class From</label>
        
        <input type="time" name="classFrom" className="form-control m-1" value={classFrom} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
        <label htmlFor="name" className="form-control m-1">Class To</label>
        
        <input type="time" name="classTo" className="form-control m-1" value={classTo} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
        
        <button className="btn btn-primary form-control m-1" type="submit">+</button>
    </form>
}

export default CourseForm;