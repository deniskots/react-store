import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {fetchOneDevices} from "../http/deviceApi";
import data from "bootstrap/js/src/dom/data";

const DevicePage = () => {
    const [device, setDevice] = useState({info:[]})
    const {id} = useParams()


    useEffect(() => {
        fetchOneDevices(id).then(data => setDevice(data))
    }, [])

    return (
        <Container className='mt-3 d-flex'>
            <Col md={4}>
                <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}></Image>
            </Col>
            <Col md={8}>
                <Row>
                    <h2>{device.name}</h2>
                    <h3>Цена: {device.price}</h3>
                    <h4 className='mt-4'>Характеристики</h4>
                    <Row className='d-flex flex-column mt-3'>
                        {device.info.map((info, index) =>
                            <Row key={info.id}
                                 style={{background: index % 2 === 0 ? 'lightgrey' : 'transparent', padding: 8}}>
                                {info.title}: {info.description}
                            </Row>
                        )}
                    </Row>
                    <Button className='mt-3' style={{width: 250, padding: 10}} variant="outline-success">Добавить в корзину</Button>
                </Row>
            </Col>


        </Container>
    );
};

export default DevicePage;
