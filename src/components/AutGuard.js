import { useContext } from "react";
import { Redirect } from "react-router";
import { userContext } from "../App";

export default function AuthGuard({children}){
    let {user} = useContext(userContext);

    if(user === undefined){
        return <h1>Loading</h1>
    }
    else if(user === null){
        return <Redirect to="/login" />
    }
    else {
        return children;
    }
}