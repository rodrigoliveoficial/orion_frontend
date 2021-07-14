import React, { useState, useEffect } from 'react'
import { Nav, NavDropdown } from "react-bootstrap";
import api from '../../services/api';
import '../../css/Navbar.css'

const NavBarDrop = () => {

    const idUsuario = localStorage.getItem("id-usuario-logado")
    const [programas, setProgramas] = useState([]);
    const [modulos, setModulos] = useState([]);

    const obterProgramasUsuario = () => {
        api.get(`usuarios/programas-navbar/${idUsuario}`).then((response) => {
            setProgramas(response.data.programas);
            setModulos(response.data.modulos);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setProgramas([]);
        });
    }

    const load = () => {

        Promise.all([
            obterProgramasUsuario(),
        ])
            .then(([
                responseProgramas,
            ]) => {
                setProgramas(responseProgramas.data);
            })
            .catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
            });
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <Nav className="mr-auto">
            {modulos.map((dados) => {
                return (
                    <NavDropdown title={dados.modulo} id="collasible-nav-dropdown-pcp">
                        {programas.filter(p => p.modulo === dados.modulo).map(programaFiltro => (
                            <NavDropdown.Item href={programaFiltro.path}>{programaFiltro.descricao}</NavDropdown.Item>
                        ))}
                    </NavDropdown>
                );
            })}
        </Nav>
    );
}

export default NavBarDrop