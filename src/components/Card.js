import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {DeleteRoute} from "../Route/DeleteRoute";
import {toast} from "react-toastify";

const Card=(props)=>
{   
    const history= useHistory();
    const [displayDate,setDisplayDate]= useState();
    const [displayTime,setDisplayTime]=useState();
    const handleClick=()=>{
        history.push(`/search/${props.item._id}`);
    }
    
    useEffect(()=>{
        const onlyDate= new Date(props.item.createdAt);
        var date=onlyDate.getDate();
        var month=onlyDate.getMonth();
        var year=onlyDate.getFullYear();
        
        var dateString= date +"-"+(month+1)+"-"+year;
        setDisplayDate(dateString);
        var dt = new Date(props.item.createdAt);
        var hr =dt.getHours()-12;
        var min= dt.getMinutes();
       if(hr==0)
       {
           hr=12;
       } 
       var time= hr+":"+min;
       setDisplayTime(time);

    },[]);
    const handleDelete = async()=>{
       const reply= window.confirm("do you wanna delete the user");
        if(reply==true)
       {  console.log(props.item._id);
            const id=props.item._id;
           const res= await DeleteRoute(id);
        if(res) {console.log(res);
        toast.success("user deleted");
        }
    }
}
    console.log() 
    return (
        <tr>    
        <td>{props.item.branch} </td>
        <td>{displayDate} </td>
        <td>{displayTime} </td>
        <td>{props.item.name} </td>
        <td>{props.item.classNum} </td>
        <td>{props.item.modeOfEnquiry} </td>
        <td>{props.item.leadGeneratedBy} </td>
        <td> 
        <button className="btn btn-danger"  onClick={handleDelete}>Delete</button>
        <button className="btn btn-primary"  onClick={handleClick}>edit</button>
        </td>
        </tr>
    );
}

export default Card;