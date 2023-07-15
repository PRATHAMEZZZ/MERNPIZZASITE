import React from 'react'
import { Container } from 'react-bootstrap'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
const Admin = () => {
  return (
    <div>
        <Container>
        <div style={{ display: 'block', width: 700, padding: 30 }}>
      <h4 className='mb-3'>Admin Panel</h4>
      <Tabs defaultActiveKey="second">
        <Tab eventKey="first" title="User">
            <div className='mt-2'>
              <h5>Add User</h5>
              
            </div>
        </Tab>
        <Tab eventKey="second" title="Category">
          Hii, I am 2nd tab content
        </Tab>
        <Tab eventKey="third" title="Products">
          Hii, I am 3rd tab content
        </Tab>
        <Tab eventKey="third" title="Orders">
          Hii, I am 3rd tab content
        </Tab>
      </Tabs>
    </div>
        </Container>
    </div>
  )
}

export default Admin