import { Admission } from "../Route/RegisterRoute";

const AdmissionAction =(values)=>
{
    var formData = new FormData();
    console.log(values);
    formData.append("name",values.name);
    formData.append("class",values.classNum);
    formData.append("fatherName",values.fatherName);
    formData.append("age",values.age);
    formData.append("courseName",values.courseName);
    formData.append("description",values.description);
    formData.append('fee',values.fee);
    formData.append("day",values.day);
    formData.append("registerTime",values.registerTime);
    formData.append('phoneNo',values.phoneNo);
    formData.append('emailAdd',values.emailAdd);
    formData.append('address',values.address);
    formData.append("income",values.income);
    formData.append("dob",values.dob);
    formData.append("religion",values.religion);
    formData.append("feeValue",values.feeValue);
    formData.append("aadharCard",values.aadharCard);
    formData.append("image",values.image);
    formData.append("signature",values.signature);
    
    console.log(formData) ;
    const res = Admission(formData);
     return res;
        

}

export default AdmissionAction;