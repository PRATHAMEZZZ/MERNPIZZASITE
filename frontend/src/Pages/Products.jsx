import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import NavHead from "../Components/NavHead";
import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import ToastMsg from "../Components/Toast";
const Products = () => {
  const id = useParams();
  const [catName, setCatName] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    products();
  }, []);
  const products = async () => {
    const products = await axios.get(
      `http://localhost:8080/product/prodByCat/${id.id}`
    );
    setAllProducts(products.data.data);
    console.log(products.data.data);
    products.data.data.map((ele) => setCatName(ele.categoryId.categoryName));
  };

  const addToCart=async(id)=>{
    if(localStorage.getItem("user")!=undefined){
        const data=await axios.post("http://localhost:8080/cart/addToCart",{product:id})
        console.log(data)
        
    }
    else{
        setShow(true)
    }
  }


  return (
    <div>
      <div className="vh-100" style={{ backgroundColor: "#f2f2f2", overflowY: "scroll"  }}>
        <NavHead></NavHead>
        <ToastMsg show={show} setShow={setShow} />
        <div style={{ backgroundColor: "#f2f2f2"}}>
          <Container className="py-5">
            <section>
              <p className="fw-bold fs-5 text-muted border px-3 py-2 bg-white  rounded text-center mb-5">
                {catName}
              </p>
              <div>
                <Row className="gy-5 justify-content-center" xl={4} lg={3} md={3} sm={1} xs={1} >
                  {allProducts.map((ele, ind) => {
                    return (
                      <Col key={ind}>
                        <Card style={{ width: "100%" }} className="shadow">
                          <div className="position-relative">
                            <Card.Img
                              variant="top"
                              src={`http://localhost:8080/Images/ProductImages/${ele.productImage}`}
                              style={{ height: "130px" }}
                            />
                            <img
                              style={{ top: "7px", left: "0" }}
                              src={
                                ele.type == "veg"
                                  ? "https://pizzaonline.dominos.co.in/static/assets/icons/veg.svg"
                                  : "https://pizzaonline.dominos.co.in/static/assets/icons/non_veg.svg"
                              }
                              alt=""
                              className="position-absolute ms-2"
                            />
                            <p
                              style={{ top: "85px" }}
                              className="position-absolute ms-2 fw-bold text-light"
                            >
                              ₹{ele.price}
                            </p>
                          </div>
                          <Card.Body className="bg-light rounded">
                            <Card.Title className="onelineEllipse">
                              {ele.productName}
                            </Card.Title>
                            <Card.Text
                              className="text-muted lineEllipse"
                              style={{ height: "50px" }}
                            >
                              {ele.productDescription}
                            </Card.Text>
                            <button className="border border px-2 py-1  float-end border-success rounded bg-light fw-semibold text-success" onClick={()=>addToCart(ele._id)}>
                              ADD TO CART
                            </button>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </section>
          </Container>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Products;
