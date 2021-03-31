import axios from "axios"
import { useState } from "react"
import { uploadFile } from "../Route/RegisterRoute";

const UploadFile=()=>{
    const [loading,setLoading]= useState(false);
    const [csvFile,setCsvFile]= useState([]);
    const [values,setValues]=useState({
        name: "",
        highNo: '',
        lowNo: '',
        mediumNo: '',    
    });
    const {name,highNo,lowNo,mediumNo}=values;
    const [resp,setResp]= useState();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        
        const formData= new FormData();
        formData.append('csv',csvFile);
        formData.append('name',name);
        formData.append('highNo',highNo);
        formData.append('lowNo',lowNo);
        formData.append('mediumNo',mediumNo);
        
        const fileResp = await uploadFile(formData);
        if(fileResp){
            console.log(fileResp.data);
            setCsvFile(fileResp.data.map((item,index)=>{
                return <div key={index}>
                <h2>{item.question}</h2>
                 <p>{item.option1}</p>
                 <p>{item.option2}</p>
                 <p>{item.option3}</p>
                 <p>{item.option4} &nbsp; {item.level}</p></div>}));
            setLoading(true);
        }
        }

return (<div className="container-fluid m-5 form-group">
        <form className="col-sm-6 col-md-6 offset-3" onSubmit={handleSubmit}>
        <input className="form-control m-1" type="file" onChange={(e)=>{setCsvFile(e.target.files[0])}}/>
        <input type="text" name="name" className="form-control m-1" placeholder="Name of the test" value={name} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
        <input type="Number" name="highNo" className="form-control m-1" placeholder="No of high difficulty questions" value={highNo} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
        <input type="Number" name="mediumNo" className="form-control m-1" placeholder="No of medium difficulty questions" value={mediumNo} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
        <input type="Number" name="lowNo" className="form-control m-1" placeholder="No of low difficulty questions" value={lowNo} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
        
        <button type="submit" className="m-1 btn btn-primary">upload</button>
        </form>
        
        {loading&&csvFile}
    </div>);
}

export default UploadFile;