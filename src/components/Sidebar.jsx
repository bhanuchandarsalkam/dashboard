import React from 'react'

const Sidebar = ({firmhandler,producthandler,allproductshandler,showfirmtitle}) => {
  return (
    <div className="sidebarsection">
      <ul>
        {showfirmtitle?<><li onClick={firmhandler}>Add Firm</li></>:""}
        <li onClick={producthandler}>Add Product</li>
        <li onClick={allproductshandler}>All Products</li>
        <li>User Details</li>
      </ul>
    </div>
  )
}

export default Sidebar;
