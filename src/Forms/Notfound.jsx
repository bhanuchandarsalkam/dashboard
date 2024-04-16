import React from 'react'
import {Link} from "react-router-dom"
const Notfound = () => {
  return (
    <div className="errorsection">
        <Link to="/home">go back</Link>
      <h1 className="color">404</h1>
      <p>Not Found</p>
    </div>
  )
}

export default Notfound
