import { useState ,useEffect } from "react";
import {toast} from "react-toastify";
import { useSelector } from "react-redux";
import { Schedule} from "../../Route/RegisterRoute";
import { getCourse, loadBranch, loadTopic } from "../../Route/SearchRoute";

const ScheduleForm = ()=>{
   const auth = useSelector((state)=>({...state}));
    const [values,setValues]= useState({
        branch: "",
        courseName: "",
        subject: "",
        topic: "",
        from: "",
        to: "",
        classDate: "",
    });

    const {branch,courseName,subject,topic,from,to,classDate}=values;
    const [branches,setBranches]=useState();
    useEffect(()=>{
        loadBranches();
    },[]);

    const loadBranches= async ()=>{
        const resp = await loadBranch();
        console.log(resp);
        setBranches(resp.data.map((i)=><option key={i._id} value={i.name}>{i.name}</option>) );
        
    }
    const [course,setCourse]=useState();
useEffect( ()=>{
        async function getCourses(){
        const courseResponse= await getCourse();
        console.log(courseResponse);
        setCourse(courseResponse.data.map((i)=><option key={i._id} value={i.name}>{i.name}</option>) );
        } getCourses();
    },[]);
    
    const [topics,setTopics]= useState();
    useEffect(()=>{
        async function getTopic(){
            const topicResp = await loadTopic(subject);
            console.log(topicResp.data);
            setTopics(topicResp.data.map((i)=>i.topics.map((j,index)=><option key={index} value={j}>{j}</option>)));
        
        }getTopic();
    },[subject]);
    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        var formData= new FormData();
        formData.append("branch",branch);
        formData.append("courseName",courseName);
        formData.append("subject",subject);
        formData.append("topic",topic);
        formData.append("to",to);
        formData.append("from",from);
        formData.append("classDate",classDate);


        try{const res= await Schedule(formData,auth.token);
        if(res) toast.success(`schedule added ${res.data}`);
        console.log(res);
        }catch(err){
            console.log(err);
        }
    }
    
   
   return <form className="form-group" onSubmit={handleSubmit}>
    <label htmlFor="name" className="form-control m-1">Branch Name</label>
    <select name="branch" className="form-control m-1" value={branch} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}>
        {branches}   
        </select>
    
    <label  className="form-control m-1">Course Name</label>
    

    <select name="courseName" className="form-control m-1" value={courseName} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}>
        {course}
    </select>

    <label  className="form-control m-1">Subject</label>


    <select name="subject" className="form-control m-1" value={subject} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}>
        <option value="physics">Physics</option>
        <option value="chemistry">Chemistry</option>
        <option value="maths">Maths</option>
        <option value="bio">Biology</option>
        
    </select>

    <label  className="form-control m-1">Topic</label>
    {topic}

    <select name="topic" className="form-control m-1" value={topic} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}>
        {topics}    
    </select>

    
    <label className="form-control m-1">Class Starting Time</label>
    <input type='time' name="from" className="form-control m-1" value={from} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
    <label className="form-control m-1">Class Ending Time</label>
    <input type='time' name="to" className="form-control m-1" value={to} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
    <label className="form-control m-1">Class Date</label>
    <input type='Date' name="classDate" className="form-control m-1" value={classDate} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
    
    <button className="btn btn-primary form-control m-1" type="submit">+</button>


    </form>
}

export default ScheduleForm;