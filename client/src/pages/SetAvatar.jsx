import {useNavigate } from "react-router-dom";
import {styled} from "styled-components";
import Loader from "../assets/Loader.gif";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {Buffer} from "buffer";
const SetAvatar=()=>
{    //api for generating random avatars
    const api = `https://api.multiavatar.com/apikey=2h0n6NeoOTbwKk`;
    const navigate=useNavigate();

     const [avatars,setAvatars]=useState([]);
     const [isLoading,setIsLoading]=useState(true);
     const [selectedAvatar,setSelectedAvatar]=useState(undefined);
     const toastOptions={
        position:"top-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    }

    //if no avatar set then navigate to login page
    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login");
        }
    },[]);

    //to store the selectedavatar in database
    const setProfilePicture=async()=>{
        if(selectedAvatar===undefined){
            toast.error("Please select an avatar",toastOptions);

        }else{
            const user=await JSON.parse(localStorage.getItem("chat-app-user"));

            const {data}=await axios.post(`http://localhost:3000/api/auth/setavatar/${user._id}`,{
                image:avatars[selectedAvatar],
            });

            if(data.isSet){
                user.isAvatarImageSet=true;
                user.avatarImage=data.image;
                localStorage.setItem("chat-app-user",JSON.stringify(user));
                navigate("/");
            }
            else{
                toast.error("Error setting avatar.Please try again",toastOptions);
            }

             


        }
    };

    //getting avatars frm api
    useEffect(() => {
        async function fetchData() {
          const data = [];
          const delay = 3000;
          for (let i = 0; i < 4; i++) {
            await new Promise(resolve => setTimeout(resolve, delay)); 
            try {
              const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`, { responseType: 'arraybuffer' });
              const buffer = new Buffer(image.data);
              data.push(buffer.toString("base64"));
            } catch (error) {
              console.error("Error fetching avatar:", error);
            } 
          };
          setAvatars(data);
          setIsLoading(false);
        }
        fetchData();
      }, []);
    return(<>
    {
        isLoading?<Container>
            <img src={Loader} alt="loader" className="loader" />

        </Container>:<Container>
            <div className="title-container">
              <h1>Pick an avatar as your profile picture</h1>
            </div>
            <div className='avatars'>
              {avatars.map((avatar, index) => (
                <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                  <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)} />
                </div>
              ))}
            </div>
            <button className="submit-btn" onClick={setProfilePicture}>Set Profile Picture</button>
          </Container>

    }
    
    <ToastContainer />
    </>);
}
const Container=styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5ms ease-in-out;
    &:hover{
      background-color: #4e0eff;
    }
  }

`;

export default SetAvatar;