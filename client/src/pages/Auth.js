import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";

import {Context} from "../index";
import {useNavigate} from "react-router-dom";

const Auth = observer(() => {
        const location = useLocation();
        const isLogin = location.pathname === LOGIN_ROUTE;
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const {user} = useContext(Context);
        const navigate = useNavigate();


        const click = async () => {
            try {
                let data;
                if (isLogin) {
                    data = await login(email, password)
                } else {
                    data = await registration(email, password)
                }
                user.setUser(user)
                user.setIsAuth(true)
                navigate(SHOP_ROUTE)
            } catch (e) {
                alert(e.response.data.message)
            }
        }

        return (
            <Container className="d-flex justify-content-center align-items-center"
                       style={{height: window.innerHeight - 55}}>
                <Card style={{width: 450}} className='p-5'>
                    <h2 className='m-auto'>
                        {isLogin ? 'Авторизация' : 'Регистрация'}
                    </h2>
                    <Form className='d-flex flex-column'>
                        <Form.Control
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Введите ваш email'
                            className='mt-3'/>
                        <Form.Control
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder='Введите ваш пароль'
                            className='mt-3'
                            type='password'/>
                    </Form>
                    <Button
                        onClick={click}
                        variant={'outline-primary'}
                        className='align-self-end mt-3'
                    >
                        {isLogin ? 'Войти' : 'Регистрация'}
                    </Button>
                    <Row className='mt-3 align-self-center'>
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Авторизация</NavLink>
                            </div>
                        }
                    </Row>
                </Card>
            </Container>
        );
    }
)

export default Auth;
