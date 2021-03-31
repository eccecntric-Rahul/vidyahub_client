import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router"


const StaffRoute=({...rest})=>{
    const auth = useSelector((state)=>({...state}));
    return (auth && auth.token &&
         (auth.user.position=="admin"
         ||auth.user.position=="branchHead"
         ||auth.user.position=="receptionist"
         ||auth.user.position=="staff")?<Route {...rest}></Route>:auth&&auth.token?<Redirect to="/dashboard"></Redirect>:<Redirect to='/login'></Redirect>);
}

export default StaffRoute;