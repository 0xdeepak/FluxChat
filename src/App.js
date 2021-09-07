import "./App.css";
import React, { useState, useEffect} from 'react';
import {firebase} from './utils/firebase';
import axios from './utils/axios';
import Routes from "./Routes";

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
        <Routes />
      </userContext.Provider>
    </div>
  );
}

export {App, userContext};