import React, { useEffect, useState } from "react";
import SearchAction from "../action/SearchAction";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getEnroll, getQueries } from "../Route/SearchRoute";
import Pagination from "../components/Pagination";
import ResultCard from "../components/ResultCard";
const Search=()=>{
    const auth= useSelector((state)=>({...state}));
    const a=100;
    const[result,setResult]=useState([]);
    const [values,setValues]=useState({
        name: "",
        day: "",
        search: "",
        searchE:"",
        searchType: '',
    });

    const [eValues,setEValues]= useState({
        eName: "",
        eDate: "",
        eEmail: "",

    });
    const [state,setState] = useState(false);
    const {name,day,search,searchE,searchType}=values;
    const [dsearch,setDsearch]=useState();
     const {eName,eDate,eEmail}= eValues;
     const [posts,setPosts]= useState([]);
     const [currentPage,setCurrentPage]= useState(1);
     const [postsPerPage,setPostsPerPage]= useState(2);

    const paginate=(number)=>{
        setCurrentPage(number);
    }
    // useEffect(()=>{
    // })
    const [currentResults,setCurrentResults]=useState([]);
    const indexOfLastPost = currentPage* postsPerPage;
    const indexOfFirstPost= indexOfLastPost- postsPerPage;
    useEffect(()=>{
      loadSearch();  
     },[search]);
    
     const loadSearch=async ()=>{
        const resp= await getQueries(search);
        
        setDsearch(resp.data.map((item)=><li key={item._id} onClick={()=>setValues({...values,search:item.name})}>{ item.name}</li>)); 
     
    }

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
                setState(true);
                console.log(JSON.stringify(currentResults));
        
            }
        }catch(err){
            console.log("error searching",err);
        }
    }
        const handleEnrollSubmit= async(e)=>{
            e.preventDefault();
            const resp = await getEnroll(eValues);
            if(resp) toast.success("success");
            setResult(resp.data);
            setState(true);
            

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
       <label className="form-control m-1">Search Type</label>
        <select className="form-control m-1" name="searchType" value={searchType} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}>
            <option value="enquirySearch">Enquiry Search</option>
            <option value="enrollSearch">Enrollment Search</option>

        </select>

       {searchType=="enquirySearch"&&
       <>      
       <form onSubmit={handleSubmit} >              
       <input type="text" name="name" className="form-control m-1" placeholder="Name" value={name} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
       <input type="date" placeholder="Date" className="form-control m-1" name="day" value={day} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
       <input type="text" name="search" className="form-control m-1" placeholder="Name" value={search} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
       <ul>
           {search!=[]&&dsearch}
       </ul> 
        <button type="submit" className="btn btn-primary form-control m-1 ">Search</button>    
       </form>
       </>}

       {searchType=="enrollSearch"&&
       <>
       <form onSubmit={handleEnrollSubmit} >              
       
       <input type="text" name="eName" className="form-control m-1" placeholder="Search By Name" value={eName} onChange={(e)=>setEValues({...eValues,[e.target.name]:e.target.value})}></input>
       <input type="date" name="eDate" className="form-control m-1" placeholder="Search By Date" value={eDate} onChange={(e)=>setEValues({...eValues,[e.target.name]:e.target.value})}></input>
       <input type="email" name="eEmail" className="form-control m-1" placeholder="Search By email" value={eEmail} onChange={(e)=>setEValues({...eValues,[e.target.name]:e.target.value})}></input>
        
       <button type="submit" className="btn btn-primary form-control m-1 ">Search</button>    
       </form>
       
       </>}
     

       </div>        
       </div>
       
       </div>
<div className="container-fluid text-center">
{searchType=="enquirySearch" && <> <div className="row">
       <div className="col-md-6 col-sm-6 offset-3 mt-2 ">
       <table className="table">
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
       {state==true ? result.map((item)=><Card key={item._id} item={item} />).slice(indexOfFirstPost,indexOfLastPost) : <span>No Result found</span> }
       </tbody>
       </table>
       </div>
       

       </div>
       <div className="d-flex justify-content-center">
       {state==true&&<Pagination postsPerPage={postsPerPage} totalPosts={result.length} paginate={paginate}></Pagination>}
       </div>
    </>}
    {searchType=="enrollSearch"&&<>
    <div className="col-md-6 col-sm-6 offset-3 mt-2 ">
       <table className="table">
        <thead>
            <tr>
               <th>name</th>
               <th>enrollment No</th>
               <th>Date</th>
               <th>Time</th>
            <th>Press Button for update</th>
            </tr>
        </thead>
        <tbody>
        {state==true ? result.map((item)=><ResultCard key={item._id} item={item} />).slice(indexOfFirstPost,indexOfLastPost) : <span>No Result found</span> }

       </tbody>
       </table>
       
       </div>
       <div className="d-flex justify-content-center">
       {state==true&&<Pagination postsPerPage={postsPerPage} totalPosts={result.length} paginate={paginate}></Pagination>}
       </div>  
    </>}   
</div>
        </>
    );
}

export default Search;