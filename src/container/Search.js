import React, { useEffect, useState } from "react";
import SearchAction from "../action/SearchAction";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Search=({props})=>{
    const auth= useSelector((state)=>({...state}));
    
    const[result,setResult]=useState([]);
    const [values,setValues]=useState({
        name: "",
        day: "",
    });
    const [state,setState] = useState(false);
    const {name,day}=values;

    const handleSubmit =async (e)=>{
        e.preventDefault();
        try{
            const res = await SearchAction(values);
            if(res.status==204)
            {
                toast.error("No Results Found!");
                setState(false);
            }else{
                setResult(res.data);
            setState(true)
        
            }
        }catch(err){
            console.log("error searching",err);
        }
    }
        
    return (
        <><div className="d-flex bg-light p-2 align-items-center justify-content-between">
        <span className="text-danger h3">Student Enquiry</span>
        <Link to="/">add Student</Link>
        {auth&&auth.token?<Link to="/dashboard">Dashboard</Link>: <Link to="/signup">Sign Up</Link>}

        </div>
        <div className="container-fluid p-5 h1 bg-secondary text-center">
            Search
        </div>
        <ToastContainer />
        <div className="form-group container-fluid">
       <div className="row">
       <div className="col-md-6 col-sm-6 offset-3 mt-2">
       <form onSubmit={handleSubmit} >
       <input type="text" name="name" className="form-control m-1" placeholder="Name" value={name} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
       <input type="date" placeholder="Date" className="form-control m-1" name="day" value={day} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
        <button type="submit" className="btn btn-primary form-control m-1 ">Search</button>    
       </form>
       </div>        
       </div>
       <div className="row">
       <div className="col-md-8 col-sm-8 offset-2 mt-2 ">
       <table className="table table-hover">
        <thead>
            <tr>
               <th>Branch</th>
               <th>Date</th>
               <th>Time</th>
               <th>Name</th>
               <th>Class</th>
               <th>Follow-up Type</th>
               <th>Assignee</th>
                <th>Press Button for update</th>
            </tr>
        </thead>
        <tbody>
       {state==true ? result.map((item)=><Card key={item._id} item={item} />) : <span>No Result found</span> }
       </tbody>
       </table>
       </div>
       
       </div>
       </div>

        </>
    );
}

export default Search;