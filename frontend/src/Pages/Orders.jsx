import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import Footer from "../Components/Footer";
import NavHead from "../Components/NavHead";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    allOrders();
  }, []);
  const allOrders = async () => {
    const data = await axios.get("http://localhost:8080/orders/getOrders/");
    setOrders(data.data.data);
  };
  const deleteOrder=async(orderId)=>{
   await axios.delete(`http://localhost:8080/orders/delOrder/${orderId}`)
   allOrders()
  }
  
  const ISTDate=(ordDate)=>{
      const data=new Date(ordDate)
      return data
  }
  return (
    <>
      <div className="vh-100" style={{ backgroundColor: "#f2f2f2",overflow:"scroll" }}>
        <NavHead />
        <Container className="my-3">
          <h2 className="mb-5">My Orders</h2>
          <Table bordered >
            <thead>
              <tr>
                <th
                  style={{ backgroundColor: "#65ab0a" }}
                  className="text-white"
                >
                  Order No
                </th>
                <th
                  style={{ backgroundColor: "#65ab0a" }}
                  className="text-white"
                >
                  Image
                </th>
                <th
                  style={{ backgroundColor: "#65ab0a" }}
                  className="text-white"
                >
                  Cancel Order
                </th>
                <th
                  style={{ backgroundColor: "#65ab0a" }}
                  className="text-white"
                >
                  {" "}
                  Order Date
                </th>
              </tr>
            </thead>
            <tbody >
              {orders.map((ele, ind) => {
                console.log(ele)
                return (
                  <tr key={ind} >
                    <td>{ind+1}</td>
                    <td>
                      {
                        ele.productId.map((ele,ind)=>{
                          return(
                            <>
                              <div className="border border-1 rounded mb-2 p-3 d-flex  gap-4" key={ind}>
                      <div>
                        <img
                          src={`http://localhost:8080/Images/ProductImages/${ele.productImage}`}
                          
                          alt=""
                          style={{width:"200px",height:"120px"}}
                        />
                      </div>
                      <div className="w-100">
                        <p className="fw-bold fs-5">{ele.productName}</p>
                      </div>
                      <div className="ps-5">
                        <p className="fw-bold w-100 ">₹{ele.price}</p>
                      </div>
                    </div>
                            </>
                          )
                        })
                      }
                      </td>
                    <td><Button variant="danger" onClick={()=>deleteOrder(ele._id)}>Cancel</Button></td>
                    <td>{ISTDate(ele.OrderDate).toString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
