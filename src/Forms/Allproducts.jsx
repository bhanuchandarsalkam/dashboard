import React,{useState,useEffect} from 'react'
import {API_URL} from "../data/apipath.js"
const Allproducts = () => {
    const [products,setProducts]=useState([])
    const producthandler=async()=>{
        const firmId=localStorage.getItem("firmId");
        try{
         const response=await fetch(`${API_URL}/product/${firmId}/products`)
         const data=await response.json();
         console.log(data)
         setProducts(data.data.products)
         console.log(data.data.products)
        }
        catch(err){
       console.log(err)
       alert("failed to fetch products")
        }
    }
    useEffect(()=>{
        producthandler();
        console.log("useeffect is called")
    },[])
    const handledeleteproduct=async(productId)=>{
      try{
        const response=await fetch(`${API_URL}/product/${productId}`,{
            method:'DELETE'
        })
      if(response.ok){
        setProducts(products.filter((item)=>item._id!==productId))
        confirm("are you sure, you want to delete?")
        alert("product deleted successfully")
      }
      }
      catch(err){
       console.error(err)
      }
    }
  return (
    <div>
      {
        !products?(
            <p>no products found</p>
        ):(
            <table className="table-name">
                <thead>
                    <tr>
                        <th>productname</th>
                        <th>price</th>
                        <th>image</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((item)=>{
                            return (
                                <>
                                <tr key={item._id}>
                                    <td>{item.productname}</td>
                                    <td>{item.price}</td>
                                    <td>
                                    {item.image&&(
                                        <img className="image" src={`${API_URL}/uploads/${item.image}`} alt={item.image} style={{width:"50px",height:"50px"}}/>
                                    )}
                                    </td>
                                    <td>
                                        <button onClick={()=>handledeleteproduct(item._id)}>Delete</button>
                                    </td>
                                </tr>
                                </>
                            )
                         })
                    }
                </tbody>
            </table>
        )
      }
    </div>
  )
}

export default Allproducts
