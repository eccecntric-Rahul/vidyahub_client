import SignUpRoute from "../Route/SignUpRoute";

const SignUpAction =(values)=>{
    
    var formData = new FormData();
    formData.append("name",values.name);
    formData.append("position",values.position);
    formData.append('phoneNo',values.phoneNo);
    formData.append("password",values.password);
    const res = SignUpRoute(formData);
    return res;
}

export default SignUpAction;