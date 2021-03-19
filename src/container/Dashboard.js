import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {loadCourses} from "../Route/SearchRoute";
import SmallCard from "../components/SmallCard";

const Dashboard=()=>{
    const auth= useSelector((state)=>({...state}));
    const history=useHistory();
    var dispatch=useDispatch();
    var [Courses,setCourses]=useState();
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
        }load()
    },[])

    return (<>
        <div className="d-flex justify-content-end container-fluid p-2 bg-light">
            {auth&&auth.token&& <button className="btn btn-outline btn-dark" onClick={handleClick}>Logout</button>}
        </div>
        <div className="bg-secondary container-fluid p-3">
            <p className="h1">{auth.user.position} Dashboard</p>
            <p className="h-3">{auth.user.name}</p>
        </div>

        <div className="container-fluid d-flex justify-content-between p-1">
         {auth.user.position=="admin"&& <><p className="">To add Course Press Button</p> <btn onClick={()=>history.push("/add-course")} className="btn btn-primary mr-2">+</btn></>}
        {auth.user.position=="teacher"&&<><h3>class Schedule</h3>
        {Courses}</>}
        {auth.user.position=="student"&&<><h3>class Schedule</h3>{Courses}</>}
        </div>
    </>);
}

export default Dashboard; 