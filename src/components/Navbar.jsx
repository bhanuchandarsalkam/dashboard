import React from 'react'

const Navbar = ({display,registerhandler,showlogout,logouthandler}) => {
  const firmname=localStorage.getItem("firmname")
  return (
    <div className="navsection">
      <div className="company">
      Vendor Dashboard
      </div>
      <div className="firmname">
        FirmName:{firmname}
      </div>
      <div className="userAuth">
        {!showlogout?<> <span onClick={display}>Login/</span>
        <span onClick={registerhandler}>Register</span></>:<><span onClick={logouthandler}>Logout</span></>}
       
      </div>
    </div>
  )
}

export default Navbar
