import React, { useEffect, useState } from "react";
import NavHead from "../Components/NavHead";
import {
  Col,
  Container,
  Row,
  Modal,
  Button,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { SlLocationPin } from "react-icons/sl";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

import Footer from "../Components/Footer";
import axios from "axios";




const Cart = () => {
  const [allCart, setCart] = useState([]);
  const[singleUser,setSingleUser]=useState({})
  const[newAddress,setNewAddress]=useState({})
  
  useEffect(() => {
    getCart();
  }, [allCart]);
  const getCart = async () => {
    const data = await axios.get("http://localhost:8080/cart/getCart/");
    await setCart(data.data.data);
    if(allCart[0]?.user){
      const single=await axios.get(`http://localhost:8080/user/singleUser/${allCart[0].user}`);
      setSingleUser(single.data.data)
    }
  };

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const incrementQty=async(id)=>{
      await axios.patch(`http://localhost:8080/cart/updateQty/${id}`,{type:"inc"})
      getCart()
  
  }
  const decrementQty=async(id)=>{
    await axios.patch(`http://localhost:8080/cart/updateQty/${id}`,{type:"dec"})
    getCart()

}

const deleteCart=async(id)=>{
  await axios.delete(`http://localhost:8080/cart/deleteCart/${id}`)
  getCart()
}

const placeOrder=async()=>{
  if(allCart.length>0){
    const data=await axios.post("http://localhost:8080/orders/addOrders/")
    getCart()
  }
   
}
//Address
const handleAddress=(e)=>{
  const {name,value}=e.target
  setNewAddress({[name]:value})
}
const updateAddress=async(e)=>{
  console.log(await axios.patch(`http://localhost:8080/user/updateUser/${singleUser._id}`,newAddress))
  console.log(newAddress)
  getCart()
  handleClose()
}
  const Total=allCart.reduce((acc,ele)=>{
      const multiple=ele.price*ele.quantity
      return acc + multiple
  },0)

 
  return (
    <>
      <div
        className="vh-100"
        style={{ overflowY: "scroll", overflowX: "hidden" }}
      >
    
        <NavHead cartLength={allCart.length}/>
        <div className="my-5">
          <Container>
            <Row lg={2} md={2} sm={1} xs={1} className="gx-5">
              <p className="fw-bold text-dark">{allCart.length} Items you have selected</p>
              <Col lg={8} md={6} sm={12}>
              {allCart.map((ele, ind) => {
                return (
                    <div className="border border-1 rounded mb-2 p-3 d-flex gap-4" key={ind}>
                      <div>
                        <img
                          src={`http://localhost:8080/Images/ProductImages/${ele.image}`}
                          
                          alt=""
                          style={{width:"200px",height:"120px"}}
                        />
                      </div>
                      <div className="w-100">
                        <p className="fw-bold fs-5">{ele.name}</p>
                        <p className="text-muted">
                          {ele.product.productDescription}
                        </p>
                      </div>
                      <div className="d-flex flex-wrap ps-5">
                        <p className="fw-bold w-100">₹ {ele.price}</p>
                        <div>
                          <div className="border d-flex">
                            {ele.quantity<=1 ? (
                              <button className="border border-0 border-end bg-light px-1" onClick={()=>deleteCart(ele._id)}>
                                <MdDeleteOutline />
                              </button>
                            ) : (
                              <button className="border border-0 border-end bg-light px-1" onClick={()=>decrementQty(ele._id)}>
                                <AiOutlineMinus />
                              </button>
                            )}{" "}
                            <span className="px-1">{ele.quantity}</span>{" "}
                            <button className="border border-0 bg-light border-start px-1" onClick={()=>incrementQty(ele._id)}>
                              <AiOutlinePlus />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                );
              })}
              </Col>
              <Col lg={4} md={6} sm={12}>
                <p className="fw-bold text-dark">Choose a delivery address</p>
                <div className="border p-3 d-flex flex-wrap gap-4 shadow-sm rounded">
                  <SlLocationPin />
                  <div>
                    <p className="fw-bold"> CURRENT ADDRESS</p>
                    <p className="text-muted fw-semibold">{singleUser?singleUser?.address:""}</p>
                  </div>
                  <div className="ps-5">
                    <button
                      className="text-white fw-semibold border-0 rounded px-3 py-1"
                      style={{ backgroundColor: "#65ab0a" }}
                      onClick={handleShow}
                    >
                      CHANGE
                    </button>
                  </div>
                </div>

                <p className="fw-bold text-dark mt-5">Price Details</p>
                <div className="border p-3 gap-4 shadow-sm rounded">
                  <div className="d-flex justify-content-between fw-semibold ">
                    <p>Sub Total</p>
                    <p>₹ {Total}</p>
                  </div>
                  <div className="d-flex justify-content-between fw-semibold ">
                    <p>Discount</p>
                    <p>₹ 0</p>
                  </div>
                  <div className="d-flex justify-content-between fw-semibold ">
                    <p>Taxes and Charges</p>
                    <p>₹ 0</p>
                  </div>
                  <div className="d-flex justify-content-between fw-semibold border-top border-bottom mb-4 pt-2">
                    <p>Grand Total</p>
                    <p>₹ {Total}</p>
                  </div>
                  <button
                    className="text-white fw-semibold border-0 rounded px-3 py-2 w-100"
                    style={{ backgroundColor: "#65ab0a" }}
                    onClick={placeOrder}
                  >
                    PLACE ORDER
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Modal Component */}
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          
          <Modal.Header closeButton>
            <Modal.Title>Change Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId="floatingTextarea2" label="Address">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}   
                onChange={handleAddress}
                name="address"
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "#65ab0a" }}
              className="border-0"
              onClick={()=>{updateAddress()}}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
