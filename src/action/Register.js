import { NewRegister } from "../Route/RegisterRoute";

const newRegister =(values)=>
{
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

    console.log(formData) ;
    const res = NewRegister(formData);
     return res;
        

}

export default newRegister;