import React from "react";
import {BrowserRouter,Switch,Route,Link} from "react-router-dom";
import Register from "./container/Register";
import Search from "./container/Search";
import SignUp from "./container/SignUp";
import Result from "./container/Result";
import Login from "./container/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./container/Dashboard";
import AddCourse from "./container/AddCourse";
import Admission from "./container/Admission";
import Fee from "./container/Fee";
function App() {
  return (<>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Register}></Route>
          <Route exact path="/search" component={Search}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
          <Route exact path="/search/:id" component={Result}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/admission" component={Admission}></Route>
          <Route exact path="/fee" component={Fee}></Route>
          
          <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
          <PrivateRoute exact path="/add-course" component={AddCourse} ></PrivateRoute>
        </Switch>
      </BrowserRouter>  
  </>);
}

export default App;
