import { useContext, useEffect, useState} from 'react';
import {userContext} from './App';
import {io} from "socket.io-client";
import useStyles from './styles/HomeStyles';

import {Button, Typography, IconButton} from "@material-ui/core";
import ReplyIcon from '@material-ui/icons/Reply';
import CancelIcon from '@material-ui/icons/Cancel';

function Home() {
  const classes = useStyles();

  let {user} = useContext(userContext);
  const [socket, setSocket] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [target, setTarget] = useState(false);
  const [targetName, setTargetName] = useState("");


  useEffect(function(){
    async function fetchToken(){
      let response = await user.getIdToken(true);
      return response;
    }
    const token = fetchToken();
    let sock = io("https://salty-cove-84971.herokuapp.com/",{
      autoConnect: true,
      extraHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    sock.on("connect", function(){
      setSocket(sock);
    });

    sock.on("message",function(payload){
      setMessages((messages) => {
        let gen = [...messages];
        gen.push(payload);
        return gen;
      })
    })
    
    sock.on("disconnect", function(){
      setSocket(null);
    });

  },[user]);

  const handleSubmit = function(){
    if(message){
      socket.emit("message",{
        senderId: user.uid,
        senderName: user.displayName,
        message: message,
        targetId: target,
        targetName: targetName
      });
      setMessage("");
      setTarget(false);
      setTargetName("");
    }
  };

  if(socket){
    return (
      <div className={classes.root}>

        <div className={classes.messages} id="messages">{
          messages.map(function(messageItem,index){
            return (
              <div key={index} className={classes.message} 
                style={{ alignSelf: user.uid === messageItem.senderId ? "flex-end" : "flex-start" }} >

                <div className={classes.message_text} style={{
                  textAlign: user.uid === messageItem.senderId ? "right" : "left"
                }}>
                    { user.uid !== messageItem.senderId ? 
                      <div style={{display: "flex", alignItems: "center", gap: "5px"}} >
                        <small style={{backgroundColor: "", }}>{messageItem.senderName}</small>
                        { messageItem.targetId ? <small style={{color: "red", fontWeight: "400"}}>to You</small> : "" }
                      </div>
                      : messageItem.targetId ? <small style={{color: "red", fontWeight: "400", alignSelf: "flex-end"}}>to {messageItem.targetName} </small> : "" }

                  <Typography>
                    {messageItem.message}
                  </Typography>
                </div>
                { user.uid !== messageItem.senderId ? 
                  <IconButton 
                  className={classes.message_button}
                  size="small"
                  onClick={() => {
                    setTarget(messageItem.senderId);
                    setTargetName(messageItem.senderName);
                  }}  >
                    <ReplyIcon fontSize="small" />
                </IconButton> : "" }
              </div>
            )
          })
        } </div>

        <div className={classes.bottom}>

          <Button onClick={() => {
            setTarget(false);
            setTargetName("");
            }}
             disableTouchRipple
             style={{visibility: target ? "visible" : "hidden" }}
             className={classes.replyBanner}
             > <CancelIcon fontSize="small"
                  style={{marginRight: "5px"}} />{`Replying to ${targetName} privately`}</Button>

          <div className={classes.type} >
            <input className={classes.input} 
              type="text"
              placeholder="Enter message"
              autoFocus
              onKeyPress={(e) => {if(e.key === "Enter") {
                handleSubmit();
              }}}
              value={message}
              onChange={function(e){
              setMessage(e.target.value);
            }} ></input>

            <Button className={classes.button}
              disableElevation
              color="primary"
              variant="contained"
              onClick={ handleSubmit } >Send</Button>
          </div>
        </div>
      </div>
    )
  }
  else {
    return <h2>You are disconnected. Connecting you back</h2>
  }
}

export default Home;
