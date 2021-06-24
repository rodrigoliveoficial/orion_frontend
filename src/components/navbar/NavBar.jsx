import React, { Component } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import '../../css/style.scss';
import NavBarDrop from "./NavDropdown";
import api from "../../services/api";
import { history } from "../Routes/history";

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
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">
                    <img
                        src="/orion_new.jpg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                    {' '}
                    ORION
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <NavBarDrop />
                    <Form inline onSubmit={this.handleSubmit}>
                        <FormControl type="text" placeholder="Pesquisar programa" className="mr-sm-2" value={this.state.value} onChange={this.handleChange}/>
                        <Button type="submit" variant="outline-secondary">Pesquisar</Button>
                    </Form>
                    <Nav>
                        <Nav.Link href="#" disabled>
                            {localStorage.getItem("usuario-logado")}
                        </Nav.Link>
                        <Nav.Link href="/login">Sair</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBar;