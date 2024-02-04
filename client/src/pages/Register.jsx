import { NavLink, useNavigate } from "react-router-dom";
import {styled} from "styled-components";
import Logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
const Register=()=>
{
    const [values,setValue]=useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:"",
    });
const navigate=useNavigate();
    const toastOptions={
        position:"top-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    }
    const handleInput=(event)=>
    {
        const name=event.target.name;
        const value=event.target.value;
        setValue({
            ...values,
            [name]:value,

        })
        
    }
    useEffect(()=>
    {
      if(localStorage.getItem('chat-app-user'))
      {
        navigate("/login");
        
      }

    },[]);

    const handleSubmit=async(event)=>
    {
        event.preventDefault();
        if(handleValidation())
        {
            //calling api for posting registration data
           const {username,email,password}=values;
            const {data}=await axios.post("http://localhost:3000/api/auth/register",{
              username,email,password,
            });
            
              
             
            
           
            if(data.status===true)
            {
              
              localStorage.setItem("chat-app-user",JSON.stringify(data.user));
              toast.success("Registration successfull",toastOptions);
              navigate("/");
            }
            if(data.status===false){
              toast.error(data.message,toastOptions);
            }
            
            
        }
    }

  const handleValidation=()=>
  {
    const {username,email,password,confirmpassword}=values;
    if(password!==confirmpassword)
    {
        toast.error("password and confirm password must be same",toastOptions)
         return false;
    }
    else if(username.length<3)
    {toast.error("Username must be greater than 3 characters",toastOptions)
     return false;}
    else if(password.length<8)
    {toast.error("Password must be greater than  8 characters",toastOptions)
    return false;}
    else if(email==="")
    {toast.error("Email is requird",toastOptions)
    return false;}
    
return true;


  }

  return(
   <>
   <FormContainer>

   
   <form onSubmit={handleSubmit}>
    <div className="brand">
        <img src={Logo} alt="Logo image" />
        <h1>Interactify</h1>
    </div>

    <input 
    type="text" 
    placeholder="Username" 
    name="username" 
    value={values.username}
    onChange={handleInput} 
    />

    <input 
    type="email" 
    placeholder="Email" 
    name="email" 
    value={values.email}
    onChange={handleInput} 
    />

    <input 
    type="password" 
    placeholder="Password" 
    name="password" 
    value={values.password}
    onChange={handleInput} 
    />
    <input 
    type="password" 
    placeholder="Confirm Password" 
    name="confirmpassword" 
    value={values.confirmpassword}
    onChange={handleInput} 
    />
    
<button type="submit">Create User</button>
<span>already have an account ? <NavLink to="/login">Login</NavLink></span>

   </form>
   </FormContainer>
   <ToastContainer />
   </>
  )
};

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.brand{
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    height:5rem;
  }
  h1 {
    color: white;
    tet-transform: uppercase;

  }
}
form{
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #00000076; 
  border-radius: 2rem;
  padding: 3rem 5rem;
  input{
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus{
      border: 0.1rem solid #99af0;
      outline: none;
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
  span{
    color:white;
    text-transform: uppercase;
    a{
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }

}
`;

export default Register;