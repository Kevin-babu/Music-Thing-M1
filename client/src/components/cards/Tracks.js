import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, Button } from 'react-bootstrap'

export default function Tracks({trackImg, title, duration, index}) {

  console.log("trackImg --", trackImg)
  console.log("title --", title)
  return (

    
    <div className='track'>
      <Row>   
              <Col md={1} className='ms-2 justify-items-center align-items-center'>{index}</Col>
              <Col md={2} className=' justify-items-center align-items-center'>
                <img src= {trackImg} style={{height: "40px", width:"40px", borderRadius:"2px"}} className=''/>
              </Col>
              {/* <Col> */}
              {/* <Row> */}
                <Col md={5}>{title.substring(0,25)}</Col>
                <Col md={1} className=' text-tertiary me-2' style={{fontSize: "10px"}}> {duration} </Col>
              {/* </Row> */}
                
              {/* </Col> */}
              <Col md={1}>
                <Button variant="light" className="edit-btn bi bi-pencil-fill"></Button>
              </Col>
      </Row>
    </div>
  )
}
