import {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {useHistory} from "react-router-dom";
import { toast } from "react-toastify";
import { getCourse } from "../../Route/SearchRoute";
import { loadBranch } from "../../Route/SearchRoute";
import {Enrollment, Fee} from '../../Route/RegisterRoute';
const EnrolmentForm=()=>{

    var courseResponse;
    const [branches,setBranches]=useState();

    // var options;
    const [items,setItems]=useState();
    const [loading,setLoading]=useState(true);
    const history = useHistory();
    const auth =useSelector((state)=>({...state}));
    useEffect( ()=>{
        async function getCourses(){
         courseResponse= await getCourse();
        console.log(courseResponse);
        setItems(courseResponse.data.map((i)=><option key={i._id} value={i.name}>{i.name}</option>) );
          setLoading(false);  
        } getCourses();
    },[]);
    
    useEffect(()=>{
        loadBranches();
    },[]);
    
    const loadBranches= async ()=>{
        const resp = await loadBranch();
        console.log(resp);
        setBranches(resp.data.map((i)=><option key={i._id} value={i.name}>{i.name}</option>) );
        
    }

    const [values,setValues]=useState({
        enrolmentNo: "",
        name: "",
        classNum: "",
        address: "",
        school: "",
        phoneNo: "",
        gender: "",
        dob: "",
        emailAdd: "",
        fatherName: "",
        motherName: "",
        fatherPhoneNo: "",
        motherPhoneNo: "",
        fatherProfession: "",
        motherProfession: "",
        fatherDesignation: "",
        motherDesignation: "",
        courseName: "",
        branch: "",
        enrolmentFee: "",
        totalCourseFee: "",
        scholarship: "",
        feePayable : "",
        feeInstallments: '',
        notes: "",
        status: "",
        
    });
   const { enrolmentNo,
    name,
    classNum,
    address,
    school,
    phoneNo,
    gender,
    dob,
    emailAdd,
    fatherName,
    motherName,
    fatherPhoneNo,
    motherPhoneNo,
    fatherProfession,
    motherProfession,
    fatherDesignation,
    motherDesignation,
    courseName,
    branch,
    enrolmentFee,
    totalCourseFee,
    scholarship,
    feePayable ,
    feeInstallments,
    notes,
    status,
   }= values;
    
   const [list,setList]= useState(
        [{installment :"",
        date: "",

        }]);
        const handleChange=(e,index)=>{
        const {name,value}=e.target;
        const subList = [...list];
        subList[index][name] =value;
        setList(subList);
        }

        const handleRemove=(index)=>{

            const subList=[...list];
            subList.splice(index,1);
            setList(subList);
        }

        const handleAdd=()=>{
            setList([...list,{installment:"",date:""}]);
        }

        const handleSubmit=async (e)=>{
            e.preventDefault();
            const formData = new FormData();
            const feeFormData = new FormData();
            formData.append("name",name);
            formData.append('classNum',classNum)
            formData.append("address",address);
            formData.append('school',school);
            formData.append('phoneNo',phoneNo);
            formData.append('gender',gender);
            formData.append('dob',dob);
            formData.append('emailAdd',emailAdd);
            formData.append('fatherName',fatherName);
            formData.append('motherName',motherName);
            formData.append('fatherProfession',fatherProfession);
            formData.append('motherProfession',motherProfession);
            formData.append('fatherDesignation',fatherDesignation);
            formData.append('motherDesignation',motherDesignation);
            formData.append("courseName",courseName);
            formData.append('branch',branch);
            formData.append("fatherPhoneNo",fatherPhoneNo);
            formData.append("motherPhoneNo",motherPhoneNo);
            formData.append('notes',notes);
            formData.append('status',status);
            // fee form
            feeFormData.append('name',name);
            feeFormData.append('emailAdd',emailAdd);
            feeFormData.append('enrolmentFee',enrolmentFee);
            feeFormData.append('totalCourseFee',totalCourseFee);
            feeFormData.append('scholarship',scholarship);
            feeFormData.append('status',status);
            feeFormData.append('feePayable',feePayable);
            feeFormData.append('feeInstallments',feeInstallments);
            const data= JSON.stringify(list);
            feeFormData.append('list',data);
            feeFormData.append("phoneNo",phoneNo);
            const resp = await Enrollment(formData,auth.token);
            const feeResp = await Fee(feeFormData,auth.token);
            if(resp.status==200||feeResp.status==200)toast.success("successfully registered");
            else toast.error("error occurred");
        }

    return (<div className="form-group container-fluid">
    <div className="row">
    <div className="col-md-6 col-sm-6 offset-3 mt-2">
    <form onSubmit={handleSubmit} >
        <input type="text" name="name" className="form-control m-1" placeholder="Name" value={name} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
         <select name="classNum" className="form-control m-1" value={classNum} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} >
             <option value="11th">11th</option>
             <option value="12th">12th</option>
             <option value="passout">Pass out</option>
         </select>
         <input type="text" placeholder="Phone No" className="form-control m-1" value={phoneNo} name="phoneNo" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
        <input type="text" placeholder="School" className="form-control m-1" name="school" value={school} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
         <input type="date" name="dob" className="form-control m-1" placeholder="Date of birth" value={dob} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>
         <select name="gender" className="form-control m-1" value={gender} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} >
             <option value="male">male</option>
             <option value="female">female</option>
             <option value="NonDisclosable">Non disclosable</option>
         </select>
        <input type="email" placeholder="email" className="form-control m-1" value={emailAdd} name="emailAdd" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
             
        <select className="form-control m-1" disabled={loading} name="courseName" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={courseName} >
        {items}
        </select>
        <input type="text" placeholder="Father's Name" className="form-control m-1" name="fatherName" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={fatherName}></input>
        <input type="text" placeholder="Mother's Name" className="form-control m-1" name="motherName" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={motherName}></input>
        <input type="number" placeholder="Mother's Phone no" className="form-control m-1" name="fatherPhoneNo" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={fatherPhoneNo}></input>
        <input type="number" placeholder="Father's Phone No" className="form-control m-1" name="motherPhoneNo" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={motherPhoneNo}></input>
        <input type="text" placeholder="Father's Profession" className="form-control m-1" name="fatherProfession" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={fatherProfession}></input>
        <input type="text" placeholder="Mother's Profession" className="form-control m-1" name="motherProfession" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={motherProfession}></input>
        <input type="text" placeholder="Father's Designation" className="form-control m-1" name="fatherDesignation" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={fatherDesignation}></input>
        <input type="text" placeholder="Mother's Designation" className="form-control m-1" name="motherDesignation" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={motherDesignation}></input>
              
        
        {(auth.user.position=="admin"||auth.user.position=="caller")
        &&<select className="form-control m-1" name="branch" value={branch} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}>
         {branches}
        </select>
        }
        
         <select className="form-control m-1"  name="status" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={status} >
             <option value="enrollment">enrollment</option>
             <option value="admission">admission</option>
              
         </select>
         <textarea name="notes" placeholder="Notes" className="form-control m-1" cols="30" rows="2" value={notes} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></textarea>
         <input type="number" placeholder="Enrolment Fee paid in Rs." className="form-control m-1" name="enrolmentFee" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={enrolmentFee}></input>
         <input type="number" placeholder="Total Course Fee" className="form-control m-1" name="totalCourseFee" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={totalCourseFee}></input>
         <input type="number" placeholder="Scholarship" className="form-control m-1" name="scholarship" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={scholarship}></input>
         <input type="number" placeholder="Fee Payable" className="form-control m-1" name="feePayable" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={feePayable}></input>
         <input type="number" placeholder="Fee Installments" className="form-control m-1" name="feeInstallments" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} value={feeInstallments}></input>
         
         {list.map((i,index)=>{
             return <> 
         <input type="number" placeholder="fee installment in Rs" className="form-control m-1" name="installment" onChange={e=>handleChange(e,index)} value={i.installment}></input>
         <input type="date" placeholder="Fee date" className="form-control m-1" name="date" onChange={e=>handleChange(e,index)} value={i.date}></input>
         {list.length!=1&&<input className="btn btn-dark m-1" type="button" value="remove" name='remove' onClick={()=>handleRemove(index)} ></input>
         }
         {list.length-1==index&&<input className="btn btn-dark m-1" type="button" value="add" name='add' onClick={handleAdd} ></input>         
         }</>
         })}
         
         <button type="submit" className="btn btn-success form-control m-1">Register</button>             
    </form>
    </div>
    </div>
</div>);
}

export default EnrolmentForm;
