import React, {useContext} from 'react';
import {Routes, Route} from "react-router-dom";
import {authRouter, publicRouter} from "../routes";
import Shop from "../pages/Shop";
import {Context} from "../index";


const AppRouter = () => {
    const {user} = useContext(Context);

    return (
        <Routes>
            {user.isAuth && authRouter.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRouter.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path="*" element={<Shop/>}/>
        </Routes>
    );
};

export default AppRouter;
