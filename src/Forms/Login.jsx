import React,{useState} from 'react'
import {API_URL} from "../data/apipath.js";
const Login = ({welcomehandler}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const loginhandler=async(e)=>{
    e.preventDefault();
    try{
      const response=await fetch(`${API_URL}/vendor/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
      })
      const data=await response.json();
      console.log(data)
      const vendorId=data.vendorId;
      if(response.ok){
        if(data.token){
          setEmail("");
          setPassword("");
        alert("login success")
        localStorage.setItem("logintoken",data.token)
        welcomehandler();
        const firmresponse=await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
        const some=await firmresponse.json();
        if(firmresponse.ok){
          console.log(some)
           const firmId=some.data.firm[0]._id
          const firmname=some.data.firm[0].firmName;
          console.log(firmname)
          // console.log(firmId)
           localStorage.setItem("firmId",firmId)
          localStorage.setItem("firmname",firmname)
          window.location.reload();
        }
      }
    }
    }
    catch(err){
    console.log(err);
    alert("login failed")
    }
  }
  return (
    <div className="loginsection">
      <form className="authform" onSubmit={loginhandler}>
      <h3>Vendor Login</h3>
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="enter your email"/><br/>
        <label>password</label>
        <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="enter your password"/><br/>
        <div className="btnsubmit">
            <button type="submit">submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login;
