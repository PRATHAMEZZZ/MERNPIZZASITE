import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import NavHead from '../Components/NavHead'
import Footer from '../Components/Footer'
import axios from 'axios'
function SignUp() {
    const [postUser,setPostUser] = useState({
        name:"",
        email:"",
        address:"",
        contact:"",
        password:""
    })
    const navigate=useNavigate()
    const handleInput=(e)=>{
        const {name,value}=e.target
        setPostUser({...postUser,[name]:value})
    }
    const submitInput=async()=>{
        await axios.post("http://localhost:8080/user/addUser/",postUser)
        
    }
    return (
        <>
        <NavHead/>
        <div style={{ background: "#f5f5f5" }} className='vh-100'>
          <Row className=' justify-content-center align-items-center h-100'>
            <Col xl={4} className='border bg-white'>
            <form action="">
                                        <div className="p-5">
                                            <p className="fs-3 fw-bold">Create account</p>
                                            <div class="mb-3">
                                                <label for="name" class="form-label">Name</label>
                                                <input type="text" class="form-control" id="name" placeholder="name" name='name' style={{ background: "#f5f5f5" }}  onChange={handleInput}/>
                                            </div>
                                            <div class="mb-3">
                                                <label for="email" class="form-label">Email address</label>
                                                <input type="email" class="form-control" id="email" placeholder="name@example.com" name='email' style={{ background: "#f5f5f5" }} onChange={handleInput}/>
                                            </div>
                                            <div class="mb-3">
                                                <label for="password" class="form-label">Password</label>
                                                <input type="password" class="form-control" id="password" placeholder="**********" name='password' style={{ background: "#f5f5f5" }} onChange={handleInput}/>
                                            </div>
                                            <div class="mb-3">
                                                <label for="contact" class="form-label">Contact</label>
                                                <input type="number" class="form-control" id="contact" placeholder="contact" name='contact' style={{ background: "#f5f5f5" }} onChange={handleInput}/>
                                            </div>
                                            <div class="mb-3">
                                                <label for="address" class="form-label">Address</label>
                                                <input type="text" class="form-control" id="address" placeholder="Address" name='address' style={{ background: "#f5f5f5" }} onChange={handleInput}/>
                                            </div>
                                            <div className="my-4">
                                                <button className='btn btn-success py-2 w-100' onClick={submitInput}>create account</button>
                                            </div>
                                            <p><NavLink className="text-success nav-link p-0" to={'/login'}>Already have an account? Login</NavLink></p>
                                        </div>
                                    </form>
            </Col>
          </Row>
        </div>
        <Footer/>
        </>
    )
}

export default SignUp