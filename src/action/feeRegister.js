import { UpdateFee } from "../Route/UpdateRoute";



const feeRegister =(values)=>
{
    var formData = new FormData();
    console.log(values);
    formData.append("name",values.name);
    formData.append('fee',values.fee);
    formData.append("feePayDay",values.feePayDay);
    formData.append('emailAdd',values.emailAdd);
    formData.append('amount',values.amount);
    console.log(formData) ;
    const res = UpdateFee(formData);
     return res;
        

}

export default feeRegister;