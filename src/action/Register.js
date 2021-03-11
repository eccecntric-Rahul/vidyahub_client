import { NewRegister } from "../Route/RegisterRoute";

const newRegister =(values)=>
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

    console.log(formData) ;
    const res = NewRegister(formData);
     return res;
        

}

export default newRegister;