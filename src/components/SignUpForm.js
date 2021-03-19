import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SignUpAction from "../action/SignUpAction";
import { getCourse } from "../Route/SearchRoute";

const SignUpForm=()=>{
    var courseResponse;
    // var options;
    const [items,setItems]=useState();
    const [loading,setLoading]=useState(true);
    
    useEffect( ()=>{
        async function getCourses(){
         courseResponse= await getCourse();
        console.log(courseResponse);
        setItems(courseResponse.data.map((i)=><option key={i._id} value={i.name} >{i.name}</option>) );
          setLoading(false);  
        } getCourses();
    },[]);

    const [values,setValues] =useState({
        name: "",
        phoneNo:"",
        emailAdd:"",
        position:"",
        password: "",
        courseName: "",
    });
    

    const {name,phoneNo,emailAdd,position,password,courseName}= values;

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
           <input type="email" placeholder="emailAdd" className="form-control m-1" value={emailAdd} name="emailAdd" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
            <select className="form-control m-1" value={position} name="position" onChange={(e)=>(setValues({...values,[e.target.name]:e.target.value}))}>
                <option >teacher</option>
                <option >admin</option>
                <option >student</option>
            </select>
            <select className="form-control m-1" disabled={loading} name="courseName" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={courseName} >
            {/* <option >english</option> */}
           {items}
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