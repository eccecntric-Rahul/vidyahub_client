import { UpdateRoute } from "../Route/UpdateRoute";
const UpdateAction=(values,URL)=>{
    var formData = new FormData();
    console.log(values);
    formData.append("name",values.name);
    formData.append("classNum",values.classNum);
    formData.append("fatherName",values.fatherName);
    formData.append("age",values.age);
    formData.append("courseName",values.courseName);
    formData.append('emailAdd',values.emailAdd);
    formData.append('phoneNo',values.phoneNo);
    formData.append('school',values.school);
    formData.append("modeOfEnquiry",values.modeOfEnquiry);
    formData.append("refferedBy",values.refferedBy);
    formData.append("leadGeneratedBy",values.leadGeneratedBy);
    formData.append('leadFollowedUpBy',values.leadFollowedUpBy);
    formData.append('branch',values.branch);
    formData.append('enquiryType',values.enquiryType);
    formData.append('status',values.status);
    formData.append('description',values.description);
    formData.append('interest',values.interest);


    console.log(formData) ;
    const res = UpdateRoute(formData,URL);
     return res;
}

export default UpdateAction;