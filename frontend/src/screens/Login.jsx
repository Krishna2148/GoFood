import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email: credentials.email, password: credentials.password }))
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      // alert("Enter valid credentials")
      Swal.fire("error", "Enter valid credential !", "error")
    }

    // if (json.success) {
    //   navigate("/");
    // }

    else {
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      Swal.fire("success", "Login successfully!", "success");
      navigate("/");
    }
  }
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <>
      <div className="container mt-5 p-5 border" style={{ "width": "30rem", "maxHeight": "500px" }}>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
          </div>

          <button type="submit" className="m-3 btn btn-success">Login</button>
          <Link to="/createuser" className="m-3 btn btn-danger">Didn't signup yet?</Link>
        </form>
      </div>
    </>
  )
}

export default Login