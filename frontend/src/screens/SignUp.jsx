import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function SignUp() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation }))
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      // alert("Enter valid credentials")
      Swal.fire("error","Enter valid credential !","error")
      
    }
    else{
      Swal.fire("success","Created successfully!","success");
    }
  }
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className="container mt-5 p-5 border" style={{ "width": "30rem", "maxHeight": "700px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="texr" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} />
          </div>
          <button type="submit" className="m-3 btn btn-success">SignUp</button>
          <Link to="/login" className="m-3 btn btn-danger">Already a user?</Link>
        </form>
      </div>
    </>
  )
}


// export default SignUp