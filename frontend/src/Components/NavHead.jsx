import React, { useState,useContext, useEffect } from 'react'
import { Container,Dropdown,Badge} from 'react-bootstrap'
import { CgProfile } from 'react-icons/cg';
import { NavLink, useNavigate } from 'react-router-dom';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import axios from 'axios';
const NavHead = () => {
  const navigate=useNavigate()
  const isAuthenticate=localStorage.getItem("user")
 

  const getCart = async () => {
    if(isAuthenticate){
      const data = await axios.get("http://localhost:8080/cart/getCart/");
    }
  };
  useEffect(()=>{
    getCart()
  },[])
  
  return (
    <>
   <header style={{backgroundColor:"#0066a7"}} className='py-2'>
    <Container className='justify-content-between w-100 d-flex'>
    <NavLink  to={"/"}> <img src="https://pizzaonline.dominos.co.in/static/assets/logo_white.svg" alt="" className='py-auto'/></NavLink>    
    <div className='d-flex align-items-center'>
    
      <div className="cart-icon" onClick={()=>navigate("/cart")}>
      <RiShoppingCart2Fill style={{cursor:"pointer"}} className='text-white fs-4' />
    </div>
    
            <Dropdown>
            <Dropdown.Toggle style={{backgroundColor:"transparent"}} className='border border-0'>
              <CgProfile className='fs-4 my-auto text-light'/>
          </Dropdown.Toggle>
          <Dropdown.Menu style={{backgroundColor:"#f2f2f2"}}>
        <Dropdown.Item  onClick={()=>navigate("/orders")}>My Orders</Dropdown.Item>
        {isAuthenticate?<Dropdown.Item onClick={()=>{localStorage.clear("user");navigate("/login")}}>Logout</Dropdown.Item>:<Dropdown.Item onClick={()=>navigate("/login")}>Login</Dropdown.Item>}
      </Dropdown.Menu>
            </Dropdown>
      </div>   
 
    </Container>
   </header>

    </>
  )
}

export default NavHead