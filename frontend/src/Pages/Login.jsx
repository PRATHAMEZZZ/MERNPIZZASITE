import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import NavHead from "../Components/NavHead";
import Footer from "../Components/Footer";



function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
 
  const navigate = useNavigate();
  function handleInput(e) {
    const{name,value}=e.target
    setLoginData({ ...loginData,[name]:value });
  }
  async function handleLogin(e) {
    e.preventDefault();
    const userData = await axios.post(
      "http://localhost:8080/user/login/",
      loginData
    );
    console.log(userData)
    localStorage.setItem("user", JSON.stringify(userData.data));
    navigate("/");
  }
  return (
    <>
      <NavHead />
      
      <div style={{ background: "#f5f5f5" }} className="vh-100">
        <Row
          className="justify-content-center align-items-center h-100 "
          style={{ background: "#f5f5f5" }}
        >
          <Col xl={4} className="border bg-white">
            <form action="">
              <div className="p-5">
                <p className="fs-3 fw-bold">Login</p>
                <div class="mb-3">
                  <label for="email" class="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    onChange={handleInput}
                    name="email"
                    placeholder="name@example.com"
                    style={{ background: "#f5f5f5" }}
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    onChange={handleInput}
                    name="password"
                    placeholder="password"
                    style={{ background: "#f5f5f5" }}
                  />
                </div>
                <div className="my-4">
                  <button
                    className="btn btn-success py-2 w-100"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
                <p>
                  <NavLink className="text-success mb-3 nav-link p-0">
                    Forget your password
                  </NavLink>
                </p>
                <p>
                  <NavLink
                    className="text-success mb-3 nav-link p-0"
                    to={"/signup"}
                  >
                    Create account
                  </NavLink>
                </p>
              </div>
            </form>
          </Col>
        </Row>
      </div>
      <Footer/>
    </>
  );
}

export default Login;
