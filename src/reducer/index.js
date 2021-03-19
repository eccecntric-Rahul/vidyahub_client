var userState;
if(window.localStorage.getItem("auth")){
    userState= JSON.parse(window.localStorage.getItem("auth"));
}else{
    userState=null;
}

const isLogged =(state=userState,action)=>{
    switch(action.type){
        case "LOGGED_IN":
            return {...state,...action.payload}
        case "LOGGED_OUT":
            return state;
        default: 
            return state;
    }
}

export default isLogged;