import { useEffect, useState } from "react";
import { Employee } from "../../Route/RegisterRoute";
import {toast} from "react-toastify";
import { useSelector } from "react-redux";
import { loadBranch } from "../../Route/SearchRoute";

const EmployeeForm = ()=>{
   const auth = useSelector((state)=>({...state}));
    const [values,setValues]= useState({
        name: "",
        position: "",
        subject: "",
        branch: "",
        emailAdd: "",
        phoneNo: "",
    });

    const {name,position,subject,branch,emailAdd,phoneNo}=values;
    const [branches,setBranches]=useState();
    useEffect(()=>{
        loadBranches();
    },[]);

    const loadBranches= async ()=>{
        const resp = await loadBranch();
        console.log(resp);
        setBranches(resp.data.map((i)=><option key={i._id} value={i.name}>{i.name}</option>) );
        
    }
    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        var formData= new FormData();
        formData.append("name",name);
        formData.append("branch",branch);
        formData.append("position",position);
        formData.append("emailAdd",emailAdd);
        formData.append("phoneNo",phoneNo);
        
        try{const res= await Employee(formData,auth.token);
        if(res) toast.success("Course Added");
        }catch(err){
            console.log(err);
        }
    }

   
   return <form className="form-group" onSubmit={handleSubmit}>
    <select name="branch" className="form-control m-1" value={branch} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} >
       {branches} 
    </select>

    <input placeholder='Position'  type='text' name="position" className="form-control m-1" value={position} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
    {position.toLocaleLowerCase()=="teacher"&& <select name="subject" className="form-control m-1" value={subject} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}>
        <option value="physics">Physics</option>
        <option value="chemistry">Chemistry</option>
        <option value="math">Math</option>
        <option value="bio">Biology</option>
    </select>}
    <input placeholder="Name of the employee" type="text" name="name" className="form-control m-1" value={name} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
    <input placeholder='email'  type='email' name="emailAdd" className="form-control m-1" value={emailAdd} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
    <input placeholder='phoneNo' type='text' name="phoneNo" className="form-control m-1" value={phoneNo} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
    
    <button className="btn btn-primary form-control m-1" type="submit">+</button>


    </form>
}

export default EmployeeForm;
