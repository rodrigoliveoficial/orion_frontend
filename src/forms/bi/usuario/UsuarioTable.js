import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class UsuarioTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currPage: 1
        };
    }

    render() {

        const { options } = this.props;
        const { usuarios } = this.props;

        return (
            <BootstrapTable ref='usuarios-table' data={usuarios} pagination={true} options={options} striped={true} hover={true} keyBoardNav>
                <TableHeaderColumn dataField='id' isKey={true} dataSort width='100' >Código</TableHeaderColumn>
                <TableHeaderColumn dataField='nome' dataSort>Nome</TableHeaderColumn>
                <TableHeaderColumn dataField='usuario' dataSort>Usuário</TableHeaderColumn>
                <TableHeaderColumn dataField='email' dataSort>E-mail</TableHeaderColumn>
                <TableHeaderColumn dataField='situacao' dataSort>Situação</TableHeaderColumn>
                <TableHeaderColumn dataField='administrador' dataSort>Administrador</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}