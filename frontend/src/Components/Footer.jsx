import React from 'react'
import { Row,Col } from 'react-bootstrap'
const Footer = () => {
  return (
    <>
    <div className='bg-dark text-light p-5'>
        <Row xl={4} lg={4} md={3} sm={2} xs={1} >
            <Col>
                <ul style={{listStyle:"none"}} className='fs-5'>
                    <li className='mb-4 fw-bold text-secondary'>Menu</li>
                    <li className='mb-2'>Veg Pizzas</li>
                    <li className='mb-2'>NonVeg Pizzas</li>
                    <li className='mb-2'>Sides</li>
                    <li className='mb-2'>Desserts</li>
                    <li className='mb-2'>Drinks</li>

                </ul>
            </Col>
            <Col>
                <ul style={{listStyle:"none"}} className='fs-5'>
                    <li className='mb-4 fw-bold text-secondary'>Company</li>
                    <li className='mb-2'>Blog</li>
                    <li className='mb-2'>Investor</li>
                    <li className='mb-2'>Feedback</li>
                    <li className='mb-2'>Ads</li>
                </ul>
            </Col>
            <Col>
                <ul style={{listStyle:"none"}} className='fs-5'>
                    <li className='mb-4 fw-bold text-secondary'>PIZZA RESTAURANTS</li>
                    <li className='mb-2'>Restaurants Near Me</li>
                    <li className='mb-2'>Pizza Near Me Pizzas</li>
                    <li className='mb-2'>Food Near Me</li>
                    <li className='mb-2'>Italian Food</li>
                    <li className='mb-2'>Order Food Online</li>

                </ul>
            </Col>
            <Col>
                <ul style={{listStyle:"none"}} className='fs-5'>
                    <li className='mb-4 fw-bold text-secondary'>ABOUT</li>
                    <li className='mb-2'>Gift card</li>
                    <li className='mb-2'>Card Balance Enquiry</li>
                    <li className='mb-2'>FAQ</li>
                    <li className='mb-2'>Italian Food</li>
                    <li className='mb-2'>Virtual Pizza Party</li>
                </ul>
            </Col>
        </Row>
    </div>
        <div className='bg-dark py-2  border-light border-top'>
            <p className='text-center fw-bold text-light'>Dominos Clone by Prathamesh</p>
        </div>
    </>
  )
}

export default Footer