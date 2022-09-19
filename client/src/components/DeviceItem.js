import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import star from '../assets/img/star-rate-svgrepo-com.svg'
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device}) => {
    const navigate = useNavigate();


    return (
        <Col md={3}>
            <Card style={{cursor: "pointer"}} className='p-3 mt-2' onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                <div className='d-flex justify-content-between mt-2'>
                    <div className='text-black-50'>Название бренда</div>
                    <div className='d-flex align-items-center'>
                        <div>{device.rating}</div>
                        <Image style={{width: 13, height: 13 }} src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>

        </Col>
    );
};

export default DeviceItem;
