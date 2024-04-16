import React,{useState} from 'react'
import {API_URL} from "../data/apipath.js";
const Addfirm = () => {
  const [firmName,setFirmName]=useState("");
  const [area,setArea]=useState("");
  const [category,setCategory]=useState([]);
  const [region,setRegion]=useState([]);
  const [offer,setOffer]=useState("");
  const [file,setFile]=useState(null);
  const handleimageupload=(event)=>{
    const selectedimage=event.target.files[0];
    setFile(selectedimage);
  }
  const handlecategorychange=(event)=>{
   const value=event.target.value;
   if(category.includes(value)){
    setCategory(category.filter((item)=>item!==value))
   }
   else{
    setCategory([...category,value])
   }
  }
  const handleregionchange=(event)=>{
    const value=event.target.value;
    if(region.includes(value)){
     setRegion(region.filter((item)=>item!==value))
    }
    else{
     setRegion([...region,value])
    }
   }
  const handlefirm=async(e)=>{
    e.preventDefault();
    try{
    const logintoken= localStorage.getItem("logintoken");
    if(!logintoken){
      console.error("user not authenticated");
    }
    const formdata=new FormData();
    formdata.append("firmName",firmName);
    formdata.append("area",area);
    formdata.append("offer",offer);
    formdata.append("image",file)
    category.forEach((value)=>{
      formdata.append("category",value)
    })
    region.forEach((value)=>{
      formdata.append("region",value)
    })
    const response=await fetch(`${API_URL}/firm/add-firm`,{
      method:"POST",
      headers:{
        "token":`${logintoken}`
      },
     body:formdata
    })
    const data=await response.json();
    console.log(data)
    if(data.message==="vendor have only one firm"){
      alert("firm exists")
    }
    else if(response.ok){
      console.log(data)
      setFirmName("")
      setArea("")
      setCategory([])
      setRegion([])
      setFile(null)
      setOffer("");
      alert("firm added successfully")
      console.log("firm Id is",data.data);
      const firmId=data.data;
     localStorage.setItem("firmId",firmId)
    }
    else{
      alert("failed to add firm")
    }
    }
    catch(err){
    console.error("failed to add firm")
    }
  }
  return (
    <div className="firmsection">
      <form className="tableform" onSubmit={handlefirm}>
        <h3>Add Firm</h3>
        <label>firmName</label>
        <input type="text" name="firmName" placeholder="enter firm name" value={firmName} onChange={(e)=>setFirmName(e.target.value)}/>
        <label>area</label>
        <input type="text" name="area" placeholder="enter firm area" value={area} onChange={(e)=>setArea(e.target.value)}/>
        {/* <label>Category</label>
        <input type="text"/> */}
        <div className="checkInp">
          <label>category</label>
          <div className="inputcontainer">
          <div className="checkboxcontainer">
            <label>Veg</label>
            <input type="checkbox" checked={category.includes('veg')} onChange={handlecategorychange} value="veg"/>
          </div>
          <div className="checkboxcontainer">
            <label>non-Veg</label>
            <input type="checkbox" checked={category.includes('non-veg')} onChange={handlecategorychange} value="non-veg"/>
          </div>
          </div>
        </div>
        {/* <label>region</label>
        <input type="text"/> */}
        <div className="checkInp">
          <label>region</label>
          <div className="regioncontainer">
          <div className="regionboxcontainer">
            <label>South-Indian</label>
            <input type="checkbox" checked={region.includes('south-indian')} onChange={handleregionchange} value="south-indian"/>
          </div>
          <div className="regionboxcontainer">
            <label>north-Indian</label>
            <input type="checkbox" checked={region.includes('north-indian')} onChange={handleregionchange} value="north-indian"/>
          </div>
          <div className="regionboxcontainer">
            <label>chineese</label>
            <input type="checkbox" checked={region.includes('chineese')} onChange={handleregionchange} value="chineese"/>
          </div>
          <div className="regionboxcontainer">
            <label>Bakery</label>
            <input type="checkbox" checked={region.includes('Bakery')} onChange={handleregionchange} value="Bakery"/>
          </div>
          </div>
        </div>
        <label>offer</label>
        <input type="text" name="offer" value={offer} onChange={(e)=>setOffer(e.target.value)}/>
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

export default Addfirm;
