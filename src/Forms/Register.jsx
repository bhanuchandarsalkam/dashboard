import React,{useState} from 'react'
import {API_URL} from "../data/apipath.js";
const Register = ({display}) => {
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(true)
   const submithandler=async(e)=>{
    e.preventDefault();
    try{
    const response=await fetch(`${API_URL}/vendor/register`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({username,email,password})
    })
    const data=await response.json();
    if(response.ok){
      setUsername("")
      setEmail("")
      setPassword("")
      console.log(data)
      alert("vendor registered successfully")
      display();
    }
    else{
      setError(data.error)
    }
    }
    catch(err){
     console.log("registration failed",err)
     alert("registration failed")
    }
  }
  return (
    <div className="registersection">
      <form className="authform" onSubmit={submithandler}>
      <h3>Vendor Register</h3>
        <label>Username</label>
        <input type="text"name="username" onChange={(e)=>setUsername(e.target.value)} value={username} placeholder="enter your name"/><br/>
        <label>Email</label>
        <input type="text" name="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="enter your email"/><br/>
        <label>password</label>
        <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="enter your password"/><br/>
        <div className="btnsubmit">
            <button type="submit">submit</button>
        </div>
      </form>
    </div>
  )
}

export default Register
