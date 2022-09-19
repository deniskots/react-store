import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevices, fetchBrands, fetchTypes} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";


const CreateDevice = observer(({show, onHide}) => {
        const {device} = useContext(Context);
        const [info, setInfo] = useState([]);
        const [name, setName] = useState('');
        const [price, setPrice] = useState(0);
        const [file, setFile] = useState(null);

        useEffect(() => {
            fetchTypes().then(data => device.setTypes(data))
            fetchBrands().then(data => device.setBrands(data))
        }, [])

        const selectFile = (e) => {
            setFile(e.target.files[0])
        }

        const addInfo = () => {
            setInfo([...info, {title: '', description: '', number: Date.now()}])
        }

        const removeInfo = (number) => {
            setInfo(info.filter(i => i.number !== number))
        }

        //если номер совпадает с номером элемента итерации тогда возращаем обьект новый
        //и у этого обькта по ключу заменяем у нее поле на новое значение
        const changeInfo = (key, value, number) => {
            setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
        }

        const addDevice = () => {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('price', `${price}`)
            formData.append('img', file)
            formData.append('brandId', device.selectedBrand.id)
            formData.append('typeId', device.selectedType.id)
            formData.append('info', JSON.stringify(info))
            createDevices(formData).then(data => onHide())

        }


        return (
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Добавить устройство
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className='d-flex mt-2'>
                            <Dropdown className='m-2'>
                                <Dropdown.Toggle>
                                    {device.selectedType.name || 'Выберите тип'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {device.types.map(type =>
                                        <Dropdown.Item
                                            key={type.id}
                                            onClick={() => device.setSelectedType(type)}
                                        >
                                            {type.name}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown className='m-2'>
                                <Dropdown.Toggle>
                                    {device.selectedBrand.name || 'Выберите бренд'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {device.brands.map(brand =>
                                        <Dropdown.Item
                                            key={brand.id}
                                            onClick={() => device.setSelectedBrand(brand)}
                                        >
                                            {brand.name}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <Form.Control
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className='mt-2'
                            placeholder='Введите название устройства'
                        />
                        <Form.Control
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                            className='mt-3'
                            placeholder='Введите стоимость устройства'
                            type='number'
                        />
                        <Form.Control
                            onChange={selectFile}
                            className='mt-3'
                            type='file'
                        />
                        <Button className='mt-3' variant='outline-dark' onClick={addInfo}>Добавить свойство</Button>
                        {info.map(i =>
                            <Row className='mt-3' key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.title}
                                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                        placeholder='Введите название свойства'
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.description}
                                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                        placeholder='Введите описание свойства'
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button
                                        onClick={() => removeInfo(i.number)}
                                        variant='outline-danger'>
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>
                        )}

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                    <Button variant='outline-primary' onClick={addDevice}>Добавить</Button>
                </Modal.Footer>
            </Modal>
        );
    }
)

export default CreateDevice;
