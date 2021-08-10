import React from 'react'
import NavBar from "./NavBar"

const NavBarPrivate = props => {
    const isLogged = localStorage.getItem('login-orion')
    return isLogged ? <NavBar {...props}/> : <div></div>
}

export default NavBarPrivate