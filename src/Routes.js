import { Switch, Route} from "react-router-dom";
import Login from './Login';
import Home from './Home';
import AuthGuard from "./components/AutGuard";

export default function Routes(){
    
    return (
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/" exact>
            <AuthGuard >
                <Home />
            </AuthGuard>
          </Route>
        </Switch>
    )
}