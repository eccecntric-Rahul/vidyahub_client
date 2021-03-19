import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import { toast } from "react-toastify";
import { getCourse } from "../Route/SearchRoute";
import AdmissionAction from "../action/Admission";
const AdmissionForm=()=>{

    var courseResponse;
    // var options;
    const [items,setItems]=useState();
    const [loading,setLoading]=useState(true);
    const history = useHistory();
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
        fee: "",
        description: "",
        day: "",
        registerTime: "",
        courseName: "",
        phoneNo: "",
        emailAdd: "",
        address: "",
        feeValue: '',
        religion: "",
        aadharCard: "",
        dob: "",
        income: "",        

    });

    const [image,setImage]= useState({image: ""});
    const [signature,setSignature] = useState();
    const {name,age,fatherName,classNum,fee,courseName,description,day,registerTime,phoneNo,emailAdd,address,feeValue,aadharCard,dob,income,religion} = values;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(e);
        try{
            const res = await AdmissionAction(values,image,signature);
            console.log(res.data);
            toast.success("Student Registered");
            setTimeout(()=>{
             window.location.reload();
            
            },2000)
        }catch(err)
        {   toast.error("Pls fill all the required fields");
            console.log(err);
        }

    }
    
    return (<div className="form-group container-fluid">
    <div className="row">
    <div className="col-md-6 col-sm-6 offset-3 mt-2">
    <form onSubmit={handleSubmit} >
        <input type="text" name="name" className="form-control m-1" placeholder="Name" value={name} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
        <input type="text" placeholder="Father's Name" className="form-control m-1" name="fatherName" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={fatherName}></input>
        <input type="text" name="classNum" className="form-control m-1" placeholder="Class" value={classNum} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
        <input type="date" placeholder="Date Of Birth" className="form-control m-1" name="dob" value={dob} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
         <input type="number" name="age" className="form-control m-1" placeholder="Age" value={age} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
        <select className="form-control m-1" disabled={loading} name="courseName" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={courseName} >
         {/* <option >english</option> */}
        {items}
        </select>
         <textarea className="form-control m-1" placeholder="Description" cols="5" row="2" value={description} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} name="description" ></textarea> 
         <select className="form-control m-1" name="fee" value={fee} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}>
             <option className="form-control" value='unpaid' >Unpaid</option>
             <option className="form-control" value='paid'>Paid</option>
         </select>
         {fee=="paid"&&<input placeholder="fee Value" name="feeValue" value={feeValue} className="form-control m-1" onChange={(e)=>{setValues({...values,[e.target.name]:e.target.value})}} ></input>}
        <input type="text" placeholder="Phone No" className="form-control m-1" value={phoneNo} name="phoneNo" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
        <input type="email" placeholder="email" className="form-control m-1" value={emailAdd} name="emailAdd" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
        <input type="text" placeholder="address" className="form-control m-1" value={address} name="address" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />           
        <input type="text" placeholder="dob" className="form-control m-1" name="day" value={day} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
        <input type="number" placeholder="Annual Income" className="form-control m-1" name="income" value={income} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
        <input type="text" placeholder="Religion" className="form-control m-1" value={religion} name="religion" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
        <input type="number" placeholder="aadhar Card Number" className="form-control m-1" value={aadharCard} name="aadharCard" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
        <input type="file" accept="image/*"  className='form-control m-1'  name="image"  onChange={(e)=>{setImage({[e.target.name] :e.target.files[0]})}}></input>
        <input type="file" accept="image/*"  className="form-control m-1"  name="signature" onChange={(e)=>setSignature({[e.target.name]:e.target.files[0]})} />
         
         <button type="submit" className="btn btn-success form-control m-1">Register</button>             
    </form>
    </div>
    </div>
</div>);


}
export default AdmissionForm;