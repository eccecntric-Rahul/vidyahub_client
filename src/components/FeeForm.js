import {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import feeRegister from '../action/feeRegister';

const FeeForm=()=>{
    
    const [values,setValues]=useState({
        name: "",
        fee: "",
        feePayDay: null,
        emailAdd: "",
        amount: 0,       

    });

    const {name,fee,feePayDay,emailAdd,amount}= values;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(e);
        try{
            const res = await feeRegister(values);
            console.log(res.data);
            toast.success("fee status updated ");
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
         <select className="form-control m-1" name="fee" value={fee} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}>
             <option className="form-control" value="unpaid"  >Unpaid</option>
             <option className="form-control" value="paid" >Paid</option>
         </select>
        {fee=="paid"&&<input type="number" placeholder="Amount" className="form-control m-1" value={amount} name="amount" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />}
        <input type="email" placeholder="email" className="form-control m-1" value={emailAdd} name="emailAdd" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
        {fee=="paid"&& <input type="date" placeholder="Date" className="form-control m-1" name="feePayDay" value={feePayDay} onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input>}
         <button type="submit" className="btn btn-success form-control m-1">Register</button>             
    </form>
    </div>
    </div>
</div>);
}

export default FeeForm;