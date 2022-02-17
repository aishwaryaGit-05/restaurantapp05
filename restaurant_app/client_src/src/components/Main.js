import React from 'react';
import {useRoutes } from 'react-router-dom'
import Home from './Home';
import Login  from './Login';
import Menu from './Menu';
import Order from './Order';
import Signup from './Signup';
import Cart from './Cart';

const  Main = () => {
        const routes = useRoutes([
            { path: '/', element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/menu', element: <Menu /> },
            { path: '/signup', element: <Signup /> },
            { path: '/order', element: <Order /> },
            { path: '/cart', element: <Cart /> }
        ]);

    return routes;    
}

export default Main