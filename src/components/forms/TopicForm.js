import { useState } from "react";
import {toast} from "react-toastify";
import { useSelector } from "react-redux";
import { Topic} from "../../Route/RegisterRoute";

const TopicForm = ()=>{
   const auth = useSelector((state)=>({...state}));
    const [values,setValues]= useState({
        subject: "",
        topic: "",
        
    });
    const [topics,setTopics]=useState([]);
    const {subject,topic}=values;
    
    const handleClick= ()=>{
        setTopics([...topics,topic]);

    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        var formData= new FormData();
        formData.append("subject",subject);
    //    for(var i =0;i<topics.length;i++){
    //        formData.append('topics[]',topics[i])
    //    }
        const jsontopics = JSON.stringify(topics);
        formData.append("topics",jsontopics);
        try{const res= await Topic(formData,auth.token);
        if(res) toast.success("Topics Added");
        }catch(err){
            console.log(err);
        }
    }

   
    return <form className="form-group" onSubmit={handleSubmit}>
    
    <label  className="form-control m-1">Subject</label>


    <select name="subject" className="form-control m-1" value={subject} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}>
        <option value="physics">Physics</option>
        <option value="chemistry">Chemistry</option>
        <option value="math">Maths</option>
        <option value="bio">Biology</option>
        
    </select>

    <label  className="form-control m-1">Topic</label>
    <select className="form-control m-1">
    {topics.map((item)=><option>{item}</option>)}
    </select>

    
    <input type="text" name="topic" className="form-control m-1" value={topic} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
    <button type="button" onClick={handleClick} className='btn btn-dark '>Add Topic +</button>
    
    <button className="btn btn-primary form-control m-1" type="submit">+</button>


    </form>
}


export default TopicForm;