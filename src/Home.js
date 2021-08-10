import './App.css';
import { useContext} from 'react';
import {userContext} from './App'
import axios from './utils/axios';

function Home() {

    let {user} = useContext(userContext);
    return (
        user ? (
        <div>
           <h1> {user.displayName} </h1> 
           <h1>{user.uid} </h1>
           <button onClick={function(){
            axios.get("http://localhost:5000/alive/").then(function(response){
              console.log(response);
            }).catch(function(error){
              console.log(error);
            })
           }} >I am Alive</button>
        </div> )
        : 
        <div>undefined</div>
        
  );
}

export default Home;
