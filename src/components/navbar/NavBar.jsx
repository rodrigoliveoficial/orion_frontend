import React, { Component } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import '../../css/style.scss';
import NavBarDrop from "./NavDropdown";
import api from "../../services/api";
import { history } from "../routes/history";
import '../../css/Navbar.css'

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        var idUsuario = localStorage.getItem("id-usuario-logado")

        api.get(`usuarios/programa-like/${idUsuario}/${this.state.value}`).then((response) => {
            history.push(response.data)
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
        });
        event.preventDefault();
    }

    render() {
        return (
            <Navbar sticky="top" collapseOnSelect expand="lg" className="Navbar-color">
                <Navbar.Brand href="/">
                    <img
                        src="/Orion LIVE!-02.png"
                        width="200"
                        height="32"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                    {' '}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <NavBarDrop />
                    <Form inline onSubmit={this.handleSubmit}>
                        <FormControl type="text" placeholder="Pesquisar programa" className="mr-sm-2" value={this.state.value} onChange={this.handleChange}/>
                        <Button type="submit" variant="outline-light">Pesquisar</Button>
                    </Form>
                    <Nav>
                        <Nav.Link href="#" disabled>
                            {localStorage.getItem("usuario-logado")}
                        </Nav.Link>
                        <Nav.Link href="/login" >Sair</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBar;