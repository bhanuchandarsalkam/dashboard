import React,{useState} from 'react';
import {API_URL} from "../data/apipath.js";
const Addproduct = () => {
  const [productname,setProductname]=useState("");
  const [price,setPrice]=useState("");
  const [category,setCategory]=useState([]);
  const[bestseller,setBestseller]=useState(false);
  const [file,setFile]=useState(null);
  const [description,setDescription]=useState("");
  const handlecategorychange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
     setCategory(category.filter((item)=>item!==value))
    }
    else{
     setCategory([...category,value])
    }
   }
   const handlebestseller=(event)=>{
    const value=event.target.value==="true";
    setBestseller(value)
   }
   const handleimageupload=(event)=>{
    const selectedimage=event.target.files[0];
    setFile(selectedimage);
  }
  const handleproduct=async(event)=>{
    event.preventDefault();
    try{
     const logintoken=localStorage.getItem("logintoken")
     const firmId=localStorage.getItem("firmId");
     console.log(firmId)
     if(!logintoken||!firmId){
       console.error("user not authenticated")
     }
     const formdata=new FormData();
     formdata.append("productname",productname)
     formdata.append("price",price);
     formdata.append("image",file);
     formdata.append("description",description)
     formdata.append("bestseller",bestseller)
     category.forEach((value)=>{
      formdata.append("category",value)
     })
     console.log([...formdata]);
     const response=await fetch(`${API_URL}/product/add-product/${firmId}`,{
      method:'POST',
      body:formdata
     })
     const data=await response.json();
     if(response.ok){
      console.log(data)
      alert("product added succesfully")
      setProductname("");
      setPrice("");
      setCategory([]);
      setBestseller(false)
      setFile(null)
      setDescription("")
     }
    }
    catch(err){
      console.log(err)
     console.error(err.message)
     alert("product added failed")
    }
  }
  return (
    <div className="firmsection">
      <form className="tableform" onSubmit={handleproduct}>
        <h3>Add Product</h3>
        <label>Productname</label>
        <input type="text" placeholder="enter product name" value={productname} onChange={(e)=>setProductname(e.target.value)}/>
        <label>Price</label>
        <input type="text" placeholder="enter product price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
        {/* <label>Category</label>
        <input type="text"/> */}
        <div className="checkInp">
          <label>category</label>
          <div className="inputcontainer">
          <div className="checkboxcontainer">
            <label>Veg</label>
            <input type="checkbox" value="veg"checked={category.includes("veg")} onChange={handlecategorychange}/>
          </div>
          <div className="checkboxcontainer">
            <label>non-Veg</label>
            <input type="checkbox" value="non-Veg" checked={category.includes("non-veg")} onChange={handlecategorychange}/>
          </div>
          </div>
        </div>
        {/* <label>Bestseller</label>
        <input type="text"/> */}
        <div className="checkInp">
          <label>Bestseller</label>
          <div className="inputcontainer">
          <div className="checkboxcontainer">
            <label>yes</label>
            <input type="radio" value="true" checked={bestseller===true} onChange={handlebestseller}/>
          </div>
          <div className="checkboxcontainer">
            <label>no</label>
            <input type="radio" value="false" checked={bestseller===false} onChange={handlebestseller}/>
          </div>
          </div>
        </div>
        <label>Description</label>
        <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <label>firm Image</label>
        <input type="file" onChange={handleimageupload}/>
        <br/>
        <div className="btnsubmit">
            <button type="submit">submit</button>
        </div>
      </form>
    </div>
  )
}

export default Addproduct
