import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import logo from '../assets/img/logo.svg'
import admin from '../assets/img/user-role-svgrepo-com.svg'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";


const NavBar = observer(() => {
        const {user} = useContext(Context)
        const navigate = useNavigate()

        const logout = () => {
            user.setUser({})
            user.setIsAuth(false)
        }


        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <NavLink style={{color: "white"}} to={SHOP_ROUTE}>
                            <img style={{width: '40px', height: '40px'}} src={logo} alt="logo"/>
                        </NavLink>
                        {user.isAuth ?
                            <Nav className="ml-auto">
                                <Button
                                    variant="outline-light"
                                    onClick={() => navigate(ADMIN_ROUTE)}
                                >
                                    <img style={{width: '20px', height: '20px'}} src={admin} alt="admin"/>
                                </Button>
                                <Button
                                    variant="outline-warning"
                                    style={{marginLeft: '10px'}}
                                    onClick={() => logout()}
                                >
                                    Выйти
                                </Button>
                            </Nav>
                            :
                            <Nav className="ml-auto">
                                <Button variant="outline-warning" onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                            </Nav>
                        }

                    </Container>
                </Navbar>
            </div>


        );
    }
)

export default NavBar;
