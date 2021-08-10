import './App.css';
import Login from './Login';
import Home from './Home';
import React, { useState, useEffect} from 'react';
import {firebase} from './utils/firebase';
import { Switch, Route} from "react-router-dom";
import axios from './utils/axios';

let userContext = React.createContext();

function App() {
  let [user, setUser] = useState();
  
  useEffect(function(){
    firebase.auth().onAuthStateChanged(User => {
        setUser(User);
        if(User){
          User
          .getIdToken(/* force refresh */ true)
          .then(function(idToken){
            //console.log(idToken);
            axios.defaults.headers["Authorization"] = `Bearer ${idToken}`;
            console.log(axios.defaults.headers["Authorization"]);

          })
          .catch(function(error){
            console.log(error);
          });
      }
      });
}, []);

  return (
    <div className="App">
      <userContext.Provider value={{user, setUser}}>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </userContext.Provider>
    </div>
  );
}

export {App, userContext};
