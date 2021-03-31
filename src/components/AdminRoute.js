import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router"


const AdminRoute=({...rest})=>{
    const auth = useSelector((state)=>({...state}));
    return (auth && auth.token
        &&auth.user.position=="admin"?<Route {...rest}></Route>:auth&&auth.token?<Redirect to="/dashboard"></Redirect>:<Redirect to='/login'></Redirect>);
}

export default AdminRoute;