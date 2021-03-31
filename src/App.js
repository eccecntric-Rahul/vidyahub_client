import React from "react";
import {BrowserRouter,Switch,Route,Link} from "react-router-dom";
import Register from "./container/Register";
import Search from "./container/Search";
import Result from "./container/Result";
import Login from "./container/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./container/Dashboard";
import AddCourse from "./container/AddCourse";
import Admission from "./container/Admission";
import Fee from "./container/Fee";
import Branch from "./container/Branch";
import Employee from "./container/Employee";
import Topic from "./container/Topic";
import AdminRoute from "./components/AdminRoute";
import StaffRoute from "./components/StaffRoutes";
import AdminBranchRoute from "./components/AdminBranchRoute"
import StaffCallerRoute from "./components/StaffCallerRoute";
import SignUp from "./container/SignUp";
import Enrollment from "./container/Enrollment";
import NotFoundPage from "./components/404Page";
import Schedule from "./container/Schedule";
import UploadFile from "./container/UploadFile";
function App() {
  return (<>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
          {/* <Route exact component={NotFoundPage}></Route> */}
          <Route exact path="/upload" component={UploadFile}></Route>
          
          <StaffCallerRoute exact path="/register" component={Register}></StaffCallerRoute>
          <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
          <StaffRoute exact path="/admission/:id" component={Admission}></StaffRoute>
          <StaffRoute exact path="/fee" component={Fee}></StaffRoute>
          <StaffRoute exact path="/add-schedule" component={Schedule}></StaffRoute>
          <StaffRoute exact path="/enrollment" component={Enrollment}></StaffRoute>
          
          <StaffCallerRoute exact path="/search/:id" component={Result}></StaffCallerRoute>
          <StaffCallerRoute exact path="/search" component={Search}></StaffCallerRoute>
          <AdminRoute exact path="/add-branch" component={Branch}></AdminRoute>
          <AdminBranchRoute exact path="/add-course" component={AddCourse} ></AdminBranchRoute>
          <AdminBranchRoute exact path="/add-employee" component={Employee}></AdminBranchRoute>
          <AdminBranchRoute exact path="/add-topic" component={Topic}></AdminBranchRoute>

        </Switch>
      </BrowserRouter>  
  </>);
}

export default App;
