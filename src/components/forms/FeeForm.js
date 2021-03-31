import {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {useHistory} from "react-router-dom";
import { toast } from "react-toastify";
import {Enrollment, Fee} from '../../Route/RegisterRoute';
import { getEnrollmentDetails,getFeeDetails, loadBranch } from "../../Route/SearchRoute";

const FeeForm=()=>{
    const auth =useSelector((state)=>({...state}));
    
    const [values,setValues]=useState({
        name: "",
        enrolmentFee: "",
        totalCourseFee: "",
        scholarship: "",
        feePayable : "",
        feeInstallments: '',
        emailAdd: '',
        phoneNo: "",              
        status: '',
    });

    const {name,enrolmentFee,
        totalCourseFee,
        scholarship,
        feePayable ,
        feeInstallments,
        emailAdd,status,
        phoneNo,
        }= values;
        
        const [list,setList]= useState(
            [{installment :"",
            date: "",
            }]);

            useEffect(()=>{
                loadFees(9015709221);
            })
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
                    setValues(
                     {  name: feesResp[0].name,
                        emailAdd: feesResp[0].emailAdd,
                        phoneNo: feesResp[0].phoneNo,
                        enrolmentFee: feesResp[0].enrolmentFee,
                        totalCourseFee: feesResp[0].totalCourseFee,
                        scholarship: feesResp[0].scholarship,
                        feeInstallments: feesResp[0].feeInstallments,
                        feePayable: feesResp[0].feePayable,
                    });
                     const smallList= [...feesResp[0].list]
                    setList(smallList);
                }
            }
    
            const handleSubmit=async (e)=>{
                e.preventDefault();
                const feeFormData = new FormData();
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
                const feeResp = await Fee(feeFormData,auth.token);
                if(feeResp.status==200)toast.success("successfully Updated");
                else toast.error("error occurred");
            }
    
    return (<div className="form-group container-fluid">
    <div className="row">
    <div className="col-md-6 col-sm-6 offset-3 mt-2">
   
    </div>
    </div>
</div>);
}

export default FeeForm;