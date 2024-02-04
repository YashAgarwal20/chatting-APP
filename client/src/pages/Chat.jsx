import { useEffect, useState } from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import Contacts from "../components/Contacts";
import axios from "axios";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
const Chat=()=>
{

  const [contacts,setContacts]=useState([]);
  const [currentuser,SetCurrentUser]=useState(undefined);
  const [currentChat,setCurrentChat]=useState(undefined);
  const navigate=useNavigate();
  const [isLoaded,setIsLoaded]=useState(false);

  // to get cuurent user which is logged in
  useEffect(()=>{
    async function getcurrentuser(){
      if(!localStorage.getItem("chat-app-user"))
      {
        navigate("/login");
      }
      else{
       
        SetCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
       
    
      }
    }
      
    getcurrentuser();
  },[]);


useEffect(()=>{
  async function contactfetch(){
    if(currentuser){
      if(currentuser.isAvatarImageSet){
        const data=await axios.get(`http://localhost:3000/api/auth/allusers/${currentuser._id}`);
    
        setContacts(data.data);
      }else{
        navigate("/setavatar");
      }
    }
  }
  contactfetch();
},[currentuser]);

const handleChatChange=(chat)=>{
  setCurrentChat(chat);
}


  return(
    <Conatiner>
      <div className="container">
        
       <Contacts contacts={contacts} currentuser={currentuser} changeChat={handleChatChange} />

       {
          isLoaded===true&&currentChat===undefined?
          <Welcome currentuser={currentuser}></Welcome>
          :
          <ChatContainer currentuser={currentuser} currentChat={currentChat} />
       }
       
       </div>
    </Conatiner>
  )
};


const Conatiner=styled.div`
height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat;