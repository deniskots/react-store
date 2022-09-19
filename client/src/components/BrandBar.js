import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Card, Row} from "react-bootstrap";
import {fetchDevices} from "../http/deviceApi";

const BrandBar = observer (() => {
    const {device} = useContext(Context);

    const getAllDevices = () => {
        fetchDevices(null, null, 1,4).then(data => {
                device.setDevices(data.rows)
                device.setTotalCount(data.count)
            }
        )
    }
        return (
        <Row className='d-flex justify-content-center'>
            <Card
                onClick={() => getAllDevices()}
                variant="outline-primary"
                style={{cursor: 'pointer', width: 80, alignItems: "center", marginLeft: 5}}
                className='p-2'
            >
                Все
            </Card>
                {device.brands.map(brand =>
                    <Card
                        style={{cursor: 'pointer', width: 80, alignItems: "center", marginLeft: 5}}
                        key={brand.id}
                        className='p-2'
                        onClick={() => device.setSelectedBrand(brand)}
                        border={brand.id === device.selectedBrand.id ? 'primary' : 'light'}
                    >
                        {brand.name}
                    </Card>
                )}
        </Row>
    );
}
)

export default BrandBar;
