import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const ResultCard=({item})=>{
   
    const [displayDate,setDisplayDate]= useState();
    const [displayTime,setDisplayTime]=useState();
    const history= useHistory();
    useEffect(()=>{
        const onlyDate= new Date(item.createdAt);
        var date=onlyDate.getDate();
        var month=onlyDate.getMonth();
        var year=onlyDate.getFullYear();
        
        var dateString= date +"-"+(month+1)+"-"+year;
        setDisplayDate(dateString);
        var dt = new Date(item.createdAt);
        var hr =dt.getHours()-12;
        var min= dt.getMinutes();
       if(hr==0)
       {
           hr=12;
       } 
       var time= hr+":"+min;
       setDisplayTime(time);

    },[]);
    
    const handleClick=()=>{
        history.push(`/admission/${item._id}`);
    }
   
   return <tr>
        <td>{item.name}</td>
        <td>{item.enrollmentNo}</td>
        <td>{displayDate}</td>
        <td>{displayTime}</td>
        <td><button className='btn btn-dark' onClick={handleClick}> Fill admission Form</button></td>
    </tr>

    
}

export default ResultCard;