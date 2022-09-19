import React from 'react';
import {Carousel} from "react-bootstrap";
import a from '../assets/img/user-role-svgrepo-com.svg'
import b from '../assets/img/logo.svg'

const Slider = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={a}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item >
                <img
                    className="d-block w-100"
                    src={b}
                    alt="First slide"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default Slider;
