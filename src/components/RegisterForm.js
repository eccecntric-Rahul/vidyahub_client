import {useState} from "react";
import {useHistory} from "react-router-dom";
import { toast } from "react-toastify";
import newRegister from "../action/Register"
// import { NewRegister } from "../Route/RegisterRoute";
// import axios  from "axios";
// const APP_API="http://localhost:8000/api";

const RegisterForm =() =>{
    
    const history = useHistory();

    const [values,setValues]=useState({
        name: "",
        classNum: "",
        age: "",
        fatherName: "",
        fee: "",
        description: "",
        day: "",
        registerTime: "",
        courseName: "",
        phoneNo: "",
        emailAdd: "",
        address: "",        

    });

    
    const {name,age,fatherName,classNum,fee,courseName,description,day,registerTime,phoneNo,emailAdd,address} = values;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(e);
        try{
            const res = await newRegister(values);
            console.log(res.data);
            toast.success("Student Registered");
            setTimeout(()=>{
             window.location.reload(false);

            },2000)
        }catch(err)
        {
            console.log(err);
        }
            // const res = NewRegister(formData);
        // const res= await axios.post(`${APP_API}/new-register`,formData);
        // console.log(res);
       
    } 


   return (<div className="form-group container-fluid">
       <div className="row">
       <div className="col-md-6 col-sm-6 offset-3 mt-2">
       <form onSubmit={handleSubmit} >
           <input type="text" name="name" className="form-control m-1" placeholder="Name" value={name} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
           <input type="text" placeholder="Father's Name" className="form-control m-1" name="fatherName" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={fatherName}></input>
           <input type="text" name="classNum" className="form-control m-1" placeholder="Class" value={classNum} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
            <input type="number" name="age" className="form-control m-1" placeholder="Age" value={age} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
           <input type="text" placeholder="Course Name" className="form-control m-1" name="courseName" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={courseName}></input>
            <textarea className="form-control m-1" placeholder="Description" cols="5" row="2" value={description} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} name="description" ></textarea> 
            <select className="form-control m-1" name="fee" value={fee} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}>
                <option className="form-control" value='unpaid' >Unpaid</option>
                <option className="form-control" value='paid'>Paid</option>
            </select>
           <input type="text" placeholder="Phone No" className="form-control m-1" value={phoneNo} name="phoneNo" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
           <input type="email" placeholder="email" className="form-control m-1" value={emailAdd} name="emailAdd" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
           <input type="text" placeholder="address" className="form-control m-1" value={address} name="address" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />           
           <input type="date" placeholder="Date" className="form-control m-1" name="day" value={day} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
           <input type="time" placeholder="time" className="form-control m-1" name="registerTime" value={registerTime} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
            <button type="submit" className="btn btn-success form-control m-1">Register</button>             
       </form>
       </div>
       </div>
   </div>);
}

export default RegisterForm;