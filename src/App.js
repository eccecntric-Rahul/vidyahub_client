import React from "react";
import {BrowserRouter,Switch,Route,Link} from "react-router-dom";
import Register from "./container/Register";
import env from "react-dotenv";
function App() {
  return (<>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Register}></Route>
        </Switch>
      </BrowserRouter>  
  </>);
}

export default App;
