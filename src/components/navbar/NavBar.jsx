import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import '../../css/style.scss';
import PrevisaoVendas from '../../forms/previsao-vendas/PrevisaoVendas';
import CapacidadeProducao from '../../forms/capacidade-producao/CapacidadeProducao';
import SugestaoCancelamento from '../../forms/sugestao-cancelamento/SugestaoCancelamento';
import PlanoMestre from '../../forms/plano-mestre/PlanoMestre';

class NavBar extends Component {

    render() {
        return (
            <Router>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/home">ORION</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Menu" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/previsao-vendas">Previsão de Vendas</NavDropdown.Item>
                                <NavDropdown.Item href="/capacidade-producao">Capacidade de Produção</NavDropdown.Item>
                                <NavDropdown.Item href="/sugestao-cancelamento">Sugestão de Cancelamento</NavDropdown.Item>
                                <NavDropdown.Item href="/plano-mestre">Plano Mestre de Produção</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <br />
                <Switch>
                    <Route path="/home">
                    </Route>
                    <Route path="/previsao-vendas">
                        <PrevisaoVendas />
                    </Route>
                    <Route path="/capacidade-producao">
                        <CapacidadeProducao />
                    </Route>
                    <Route path="/sugestao-cancelamento">
                        <SugestaoCancelamento />
                    </Route>
                    <Route path="/plano-mestre">
                        <PlanoMestre />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default NavBar;