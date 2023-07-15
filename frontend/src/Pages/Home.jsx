import React, { useEffect, useState } from "react";
import NavHead from "../Components/NavHead";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../Components/Footer";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate=useNavigate()
  const[allCategory,setAllCategory]=useState([])
  useEffect(()=>{
    getCategory()
  },[])

  const getCategory=async()=>{
    const categories=await axios.get("http://localhost:8080/category/getCategory")
    setAllCategory(categories.data.data)
    console.log(categories.data.data)

  }


  return (
    <div style={{ backgroundColor: "#f2f2f2" }}>
      <NavHead />
  
  
      <div className="my-5">
      <p
        style={{
          color: "#e61a39",
          fontFamily: "font-family: 'Oswald', sans-serif;",
        }}
        className="fs-3 fw-bold text-center"
      >
        DOMINOS'S MENU
      </p>
      <Row xl={3} lg={3} md={2} sm={1} xs={1} className="gx-0 gy-2">
        {allCategory.map((ele,ind)=>{
          return(
            <Col key={ind}>
            <div>
              <Card className=" text-white text-center rounded-0">
                <Card.Img src="https://www.dominos.co.in/theme2/front/images/menu-images/red.webp" alt="Card image" className="image-fluid rounded-0" style={{height:"450px"}}/>
                <Card.ImgOverlay>
                  <Card.Title>{ele.categoryName}</Card.Title>
                  <Card.Text>
                    <div style={{height:"280px"}}>
                      <img src={`http://localhost:8080/Images/CategoryImage/${ele.categoryImage}`} className="image-fluid my-auto" style={{width:"45%"}} alt="" />
                    </div>
                      <p className="lh-1 mt-2">{ele.categoryDescription}</p>
                      <button className="px-4 py-2 rounded categoryBtn fw-semibold" onClick={()=>navigate(`/products/${ele._id}`)}>VIEW ALL</button>
                  </Card.Text>
                </Card.ImgOverlay>
              </Card>
            </div>
          </Col>
          )
        })}
    
      </Row>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
