import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import { useSelector } from "react-redux";
import { getEnrollmentDetails,getFeeDetails, loadBranch } from "../../Route/SearchRoute";
import { Admission } from "../../Route/RegisterRoute";

import { toast } from "react-toastify";
import { getCourse } from "../../Route/SearchRoute";
import { UpdateFee } from "../../Route/UpdateRoute";
const AdmissionForm=()=>{
    var url= window.location.pathname;
    
    var courseResponse;
    // var options;
    const [items,setItems]=useState();
    const [loading,setLoading]=useState(true);
    const [image,setImage]= useState({image: ""});
    const [signature,setSignature] = useState();
    const [branches,setBranches]=useState();
    const [marksheet,setMarksheet]=useState();
    const [addressProof,setAddressProof]=useState();
    const [schoolId,setSchoolId]= useState();
    const auth =useSelector((state)=>({...state}));

    const [values,setValues]=useState({
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
        aadharCard: "",
        dob: "",
        income: "",
        referredBy:"",        
        
    });
    
    const history = useHistory();
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
        loadData(loadFees);
    },[]);
    const loadBranches= async ()=>{
        const resp = await loadBranch();
        console.log(resp);
        setBranches(resp.data.map((i)=><option key={i._id} value={i.name}>{i.name}</option>) );
        
    }

    
    const loadData= async (loadFees)=>{
        console.log(url.slice(11));
        const URL = url.slice(11);
        var enrollResp = await  getEnrollmentDetails(URL);
        if(enrollResp.status==200){enrollResp= enrollResp.data;
        console.log(enrollResp);
            setValues({ 
            name:enrollResp.name,
            classNum: enrollResp.classNum,
            address: enrollResp.address,
            school: enrollResp.school,
            phoneNo: enrollResp.phoneNo,
            gender: enrollResp.gender,
            dob: enrollResp.dob,
            emailAdd: enrollResp.emailAdd,
            fatherName: enrollResp.fatherName,
            motherName: enrollResp.motherName,
            fatherPhoneNo: enrollResp.fatherPhoneNo,
            motherPhoneNo: enrollResp.motherPhoneNo,
            fatherProfession: enrollResp.fatherProfession,
            motherProfession: enrollResp.motherProfession,
            fatherDesignation: enrollResp.fatherDesignation,
            motherDesignation: enrollResp.motherDesignation,
            courseName: enrollResp.courseName,
            branch: enrollResp.branch,
            notes: enrollResp.notes,
            status: enrollResp.status, 
        });
        loadFees(enrollResp.phoneNo);
    } 
    }

    const { 
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
        aadharCard,
        referredBy,
        
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

        const loadFees= async (phone)=>{
            var feesResp= await getFeeDetails(phone);
            if(feesResp.status==200){
                feesResp= feesResp.data;
                
                console.log({...feesResp[0].list});
                setValues((values)=>
                { return{...values, 
                    enrolmentFee: feesResp[0].enrolmentFee,
                    totalCourseFee: feesResp[0].totalCourseFee,
                    scholarship: feesResp[0].scholarship,
                    feeInstallments: feesResp[0].feeInstallments,
                    feePayable: feesResp[0].feePayable,
                }});
                 const smallList= [...feesResp[0].list]
                setList(smallList);
            }
        }

        // useEffect(()=>{
        //    loadFees();
        // },[name]);
        const position= "student";
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(values);
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
        formData.append("referredBy",referredBy);
        formData.append('aadharCard',aadharCard);
        formData.append('image',image);
        formData.append("signature",signature);
        formData.append("addressProof",addressProof);
        formData.append("schoolId",schoolId);
        formData.append('marksheet',marksheet);
        formData.append("position",position);
        console.log(phoneNo);
        console.log(name);
        //    fee form
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
            const AdmissionResp = await Admission(formData,auth.token);
            if(AdmissionResp.status==200){
                const feesResp= await UpdateFee(feeFormData,auth.token);
                if(feesResp.status==200)
                {
                    toast.success('Admission Completed');
                }else{
                    toast.error("Error occured during fee update");
                }
                }else{
                    toast.error('error occured during admission');
                }
        
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
         <input type="text" placeholder="Refrence By" className="form-control m-1" value={referredBy} name="referredBy" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
         
        <input type="number" placeholder="aadhar Card Number" className="form-control m-1" value={aadharCard} name="aadharCard" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
        <label htmlFor="" className="form-control m-1">image</label>
        <input type="file" accept="image/*"  className='form-control m-1'  name="image"  onChange={(e)=>{setImage(e.target.files[0])}} ></input>
        <label htmlFor=""className="form-control m-1">signature</label>
        <input type="file" accept="image/*"  className="form-control m-1"  name="signature" onChange={(e)=>setSignature(e.target.files[0])} />
        <label htmlFor=""className="form-control m-1">marksheet</label>
        <input type="file"   className="form-control m-1"  name="marksheet" onChange={(e)=>setMarksheet(e.target.files[0])} />
        <label htmlFor=""className="form-control m-1">address Proof</label>
        <input type="file"   className="form-control m-1"  name="addressProof" onChange={(e)=>setAddressProof(e.target.files[0])} />
        <label htmlFor=""className="form-control m-1">school id</label>
        <input type="file"   className="form-control m-1"  name="shoolId" onChange={(e)=>setSchoolId(e.target.files[0])} />
         
         <button type="submit" className="btn btn-success form-control m-1">Register</button>             
    </form>
    </div>
    </div>
</div>);


}
export default AdmissionForm;