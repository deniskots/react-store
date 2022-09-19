import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateType from "../components/modals/CreateType";
import CreateDevice from "../components/modals/CreateDevice";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    return (
        <Container>
            <div className='d-flex flex-column m-auto' style={{width: 450}}>
                <Button variant='outline-primary' className='m-3 p-3' onClick={() => setTypeVisible(true)} >Добавить тип</Button>
                <Button variant='outline-primary' className='m-3 p-3' onClick={() => setBrandVisible(true)}>Добавить бренд</Button>
                <Button variant='outline-primary' className='m-3 p-3' onClick={() => setDeviceVisible(true)}>Добавить устройство</Button>
            </div>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
        </Container>
    );
};

export default Admin;
