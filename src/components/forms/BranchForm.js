import { useState } from "react";
import { Employee } from "../../Route/RegisterRoute";
import {toast} from "react-toastify";
import { useSelector } from "react-redux";

const BranchForm = ()=>{
   const auth = useSelector((state)=>({...state}));
    const [values,setValues]= useState({
        name: "",
        locaton: "",
    });

    const {name,location}=values;
    
    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        var formData= new FormData();
        formData.append("name",name);
        formData.append("location",location);

        try{const res= await Employee(formData,auth.token);
        if(res) toast.success("Course Added");
        }catch(err){
            console.log(err);
        }
    }

   
   return <form className="form-group" onSubmit={handleSubmit}>
    <label htmlFor="name" className="form-control m-1">Branch Name</label>
    <input type="text" name="name" className="form-control m-1" value={name} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
    <label className="form-control m-1">location</label>
    <input type='text' name="location" className="form-control m-1" value={location} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
    
    <button className="btn btn-primary form-control m-1" type="submit">+</button>


    </form>
}

export default BranchForm;