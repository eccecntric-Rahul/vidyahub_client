import {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import UpdateAction from '../../action/UpdateAction';
import { getCourse, getStudent } from '../../Route/SearchRoute';

const UpdateForm=()=>{
    var url= window.location.pathname;
    var courseResponse;
    
    const [items,setItems]=useState();
    const [loading,setLoading]=useState(true);
    useEffect( ()=>{
        async function getCourses(){
         courseResponse= await getCourse();
        console.log(courseResponse);
        setItems(courseResponse.data.map((i)=><option key={i._id} value={i.name}>{i.name}</option>) );
          setLoading(false);  
        } getCourses();
    },[]);
    
    
    const [values,setValues]=useState({
        name: "",
        classNum: "",
        age: "",
        fatherName: "",
        courseName: "",
        phoneNo: "",
        emailAdd: "",
        school: "",
        modeOfEnquiry: "",
        branch: "",
        refferedBy: "",
        leadGeneratedBy: "",
        leadFollowedUpBy: "",
        enquiryType: "",
        status: "",
        description: "",
        interest: "",
    });

    
    const {name,age,fatherName,classNum,courseName,phoneNo,emailAdd,school,modeOfEnquiry,branch,refferedBy,leadGeneratedBy,leadFollowedUpBy,enquiryType,status,description,interest} = values;
 
    useEffect(()=>{
        loadData();
    },[])

    
    const loadData=async(req,res)=>{
        
       try{ var response= await getStudent(url);
         response=response.data;
         const {name,age,fatherName,classNum,courseName,phoneNo,emailAdd,school,modeOfEnquiry,branch,refferedBy,leadGeneratedBy,leadFollowedUpBy,enquiryType,status,description,interest} = response;
   
         setValues({
            name,
        classNum,
        age,
        fatherName,
        courseName,
        phoneNo,
        emailAdd,
        school,
        modeOfEnquiry,
        branch,
        refferedBy,
        leadGeneratedBy,
        leadFollowedUpBy,
        enquiryType,
        status,
        description,
        interest,    
    })
        console.log(response);
       }catch(err){
           console.log(err);
       }
     }

     const handleSubmit=async (e)=>{
        e.preventDefault();
        try{    
                const URL = url.slice(8);
            const res=await UpdateAction(values,URL);
            console.log(res);
            toast.success("user Updated");
            setTimeout(()=>{
                window.location.reload();
            },2000);
        }catch(err){
            console.log(err);
        }
     }
    
    
    return (<div className="form-group container-fluid">
    <div className="row">
    <div className="col-md-6 col-sm-6 offset-3 mt-2">
    <form onSubmit={handleSubmit} >
        <input type="text" name="name" className="form-control m-1" placeholder="Name" value={name} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
        <input type="text" placeholder="Father's Name" className="form-control m-1" name="fatherName" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={fatherName}></input>
         <select name="classNum" className="form-control m-1" value={classNum} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} >
             <option value="11th">11th</option>
             <option value="12th">12th</option>
             <option value="passout">Pass out</option>
             
         </select>
         
         <input type="number" name="age" className="form-control m-1" placeholder="Age" value={age} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
        <select className="form-control m-1" disabled={loading} name="courseName" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={courseName} >
         {/* <option >english</option> */}
        {items}
        </select>
         <input type="text" placeholder="Phone No" className="form-control m-1" value={phoneNo} name="phoneNo" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
        <input type="email" placeholder="email" className="form-control m-1" value={emailAdd} name="emailAdd" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
        <input type="text" placeholder="School" className="form-control m-1" name="school" value={school} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
        <select className="form-control m-1"  name="modeOfEnquiry" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={modeOfEnquiry} >
         <option value="online" >Online</option>
         <option value="branch visit" >Branch Visit</option>
         <option value="inbound call" >Inbound Call</option>
         <option value="other" >Other</option>
        </select>
        <input type="text" placeholder="Reffered By" className="form-control m-1" name="refferedBy" value={refferedBy} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
        <input type="text" placeholder="Branch" className="form-control m-1" name="branch" value={branch} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
        <input type="text" placeholder="Lead Generated By" className="form-control m-1" name="leadGeneratedBy" value={leadGeneratedBy} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
        <input type="text" placeholder="Lead Followed Up By" className="form-control m-1" name="leadFollowedUpBy" value={leadFollowedUpBy} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
        <select className="form-control m-1"  name="enquiryType" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={enquiryType} >
             <option value="active">active</option>
             <option value="dead">dead</option> 
         </select>
         <select className="form-control m-1"  name="status" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={status} >
             <option value="call">call</option>
             <option value="demo">demo</option>
             <option value="enrollment">enrollment</option>
             <option value="admission">admission</option>
              
         </select>
         <textarea name="description" placeholder="description" className="form-control m-1" cols="30" rows="2" value={description} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></textarea>
         
         <select  className="form-control m-1" name="interest" value={interest} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}>
             <option value="high">High</option>
             <option  value="medium">Medium</option>
             <option value="low">Low</option>
         </select>
         
         <button type="submit" className="btn btn-success form-control m-1">Register</button>             
    </form>
    </div>
    </div>
</div>);
        
}

export default UpdateForm;