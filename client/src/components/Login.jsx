import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleOnchange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user, [name]: value
    })
  }
  axios.defaults.withCredentials = true;
  const login = ()=>{
    const {email, password} = user;
    if(email && password){
      axios.post('http://127.0.0.1:3001/login',{email, password})
      .then(res =>{
        if(res.data === "Success"){
          if(res.data.role === "admin"){
            navigate("/dashboard");
          }
          else{
            navigate('/');
          }
        }
      }).catch(err=>console.log("Data doesnt send",err))
    }
    else{
      console.log("Invalid Inputs");
    }
  }
  return (
    <>
    {console.log("user",user)}
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                      <form className="mx-1 mx-md-4">

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" className="form-control" name='email' value={user.name} onChange={handleOnchange}/>
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control" name='password' value={user.password} onChange={handleOnchange}/>
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                          <label className="form-check-label" htmlFor="form2Example3">
                            I agree all statements in <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" onClick={login} className="btn btn-primary btn-lg">Login</button>
                        </div>
                        <Link to="/signup" className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>Register</Link>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="Sample image" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login

