import React from 'react'

import { Route, Redirect } from 'react-router'
import NavBar from '../navbar/NavBar';

const NavBarPrivate = (props) => {
    return (
        <div>
            <NavBar/>
            <Route {...props}/>
        </div>

    );

}

const PrivateRoute = props => {
    const isLogged = localStorage.getItem('login-orion')
    return isLogged ? <NavBarPrivate {...props}/> : <Redirect to="/login"/>
}

export default PrivateRoute