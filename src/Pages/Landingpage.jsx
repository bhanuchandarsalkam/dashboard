import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar';
import Sidebar from "../components/Sidebar";
import Login from '../Forms/Login';
import Register from '../Forms/Register';
import Addfirm from '../Forms/Addfirm';
import Addproduct from '../Forms/Addproduct';
import Welcome from '../Forms/Welcome';
import Allproducts from '../Forms/Allproducts';

const Landingpage = () => {
    const [showlogin,setShowlogin]=useState(false);
    const [showregister,setShowregister]=useState(false);
    const [showfirm,setShowfirm]=useState(false)
    const [showproduct,setShowproduct]=useState(false);
    const [showwelcome,setShowwelcome]=useState(false)
    const [showallproducts,setShowallproducts]=useState(false)
    const [showlogout,setShowlogout]=useState(false)
    const [showfirmtitle,setShowfirmtitle]=useState(true)
    useEffect(()=>{
      const logintoken=localStorage.getItem("logintoken");
      if(logintoken){
        setShowlogout(true)
      }
    },[])
    useEffect(()=>{
      const firmname=localStorage.getItem("firmname")
      if(firmname){
        setShowfirmtitle(false)
      }
    },[])
    const logouthandler=()=>{
      confirm("are you sure to logout?")
      localStorage.removeItem("logintoken")
      localStorage.removeItem("firmId");
      localStorage.removeItem("firmname")
      setShowlogout(false)
      setShowfirmtitle(true)
    }
    const display=()=>{
        setShowlogin(true)
        setShowregister(false)
        setShowfirm(false)
        setShowproduct(false)
        setShowwelcome(false)
        setShowallproducts(false)
    }
    const registerhandler=()=>{
        setShowregister(true)
        setShowlogin(false)
        setShowfirm(false)
        setShowproduct(false)
        setShowwelcome(false)
        setShowallproducts(false)
    }
    const firmhandler=()=>{
      if(showlogout){
        setShowfirm(true)
        setShowregister(false)
        setShowlogin(false)
        setShowproduct(false)
        setShowwelcome(false)
        setShowallproducts(false)
      }else{
        alert("please login")
        setShowlogin(true)
        setShowregister(false)
      }
    }
    const producthandler=()=>{
      if(showlogout){
        setShowfirm(false)
        setShowregister(false)
        setShowlogin(false)
        setShowproduct(true)
        setShowwelcome(false)
        setShowallproducts(false)
      }
      else{
        alert("please login")
        setShowlogin(true)
      }
    }
    const welcomehandler=()=>{
      setShowfirm(false)
      setShowregister(false)
      setShowlogin(false)
      setShowproduct(false)
      setShowwelcome(true)
      setShowallproducts(false)
  }
  const allproductshandler=()=>{
    if(showlogout){
    setShowfirm(false)
    setShowregister(false)
    setShowlogin(false)
    setShowproduct(false)
    setShowwelcome(false)
    setShowallproducts(true)
    }
    else{
      alert("please login")
      setShowlogin(true)
    }
}
  return (
    <div>
      <>
      <section className="landingsection">
        <Navbar display={display} registerhandler={registerhandler} showlogout={showlogout} logouthandler={logouthandler}/>
        <div className="collectionsection">
        <Sidebar firmhandler={firmhandler} producthandler={producthandler} allproductshandler={allproductshandler} showfirmtitle={showfirmtitle}/>
         {showlogin&&<Login welcomehandler={welcomehandler}/>}
        {showregister && <Register display={display}/> }
        {showfirm && showlogout && <Addfirm/>}
        {showproduct && showlogout && <Addproduct/>}
        {showwelcome && <Welcome/>}
        {showallproducts && showlogout && <Allproducts/>}
        </div>
      </section>
      </>
    </div>
  )
}

export default Landingpage
