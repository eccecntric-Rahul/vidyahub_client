import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {getFeeDetails, loadCourses} from "../Route/SearchRoute";
import SmallCard from "../components/SmallCard";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Dashboard=()=>{
    const auth= useSelector((state)=>({...state}));
    const history=useHistory();
    var dispatch=useDispatch();
    var [Courses,setCourses]=useState();
    const [list,setList]= useState(
        [{installment :"",
        date: "",
        status: "",    
    }]);

    const handleClick=()=>{
        dispatch({
            type:"LOGGED_OUT",
            payload: null,
        });
        window.localStorage.clear();
        window.location.reload();
        history.push("/");
    }

    useEffect(()=>{
        async function load(){
            const res= await loadCourses(auth.user.courseName);
            console.log(res.data);
            setCourses(res.data.map((course)=><SmallCard key={course._id} course={course} />));
        }load();
        loadFees(auth.user.phoneNo);

    },[])
    
    const loadFees= async (phone)=>{
        var feesResp= await getFeeDetails(phone);
        if(feesResp.status==200){
            feesResp= feesResp.data;
            
            
             const smallList= [...feesResp[0].list]
            setList(smallList);
        }
    }

    const handlePaymentClick=(item)=>{
        function loadScript(src) {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = src;
                script.onload = () => {
                    resolve(true);
                };
                script.onerror = () => {
                    resolve(false);
                };
                document.body.appendChild(script);
            });
        }
    }

    return (<>
        <div className="d-flex justify-content-end container-fluid p-2 bg-light">
            {auth&&auth.token&& <button className="btn btn-outline btn-dark" onClick={handleClick}>Logout</button>}
        </div>
        <ToastContainer />
        <div className="bg-secondary container-fluid p-3">
            <p className="h1">{auth.user.position} Dashboard</p>
            <p className="h-3">{auth.user.name}</p>
        </div>
        <div className="container-fluid p-1">
         {auth.user.position=="admin"&& <><p className="">To add Course Press Button</p> <btn onClick={()=>history.push("/add-course")} className="btn btn-primary mr-2">+</btn>
         <p className="">To add branch Press Button</p> <btn onClick={()=>history.push("/add-branch")} className="btn btn-primary mr-2">+</btn>
         <p className="">To add Employee Press Button</p> <btn onClick={()=>history.push("/add-employee")} className="btn btn-primary mr-2">+</btn>
         <p className="">To add Course Press Button</p> <btn onClick={()=>history.push("/add-course")} className="btn btn-primary mr-2">+</btn>
         <p className="">To add schedule Press Button</p> <btn onClick={()=>history.push("/add-schedule")} className="btn btn-primary mr-2">+</btn>
         </>}

        {auth.user.position=="teacher"&&<><h3>class Schedule</h3>
        </>}
        {auth.user.position=="student"&&<><h3>class schedule</h3>
        <h3>Fee details</h3>
        {list.map((item)=><>
        <div key={item._id} className='d-flex justify-content-between m-1'>
        <li>{item.installment}</li>
        <li>{item.date}</li>
        <li>{item.status}</li>
        <li><button className='btn btn-primary' onClick={()=>handlePaymentClick(item)}>Pay Now</button></li>
        </div>
        </>)}
        </>}
        </div>
    </>);
}

export default Dashboard; 