/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class CadastroHelpTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currPage: 1
        };
    }

    render() {

        const { options } = this.props;
        const { programas } = this.props;

        return (
            <BootstrapTable ref='help-table' data={programas} pagination={true} options={options} striped={true} hover={true} keyBoardNav>
                <TableHeaderColumn dataField='id' isKey={true} dataSort width='100' >Código</TableHeaderColumn>
                <TableHeaderColumn dataField='modulo' dataSort>Módulo</TableHeaderColumn>
                <TableHeaderColumn dataField='descricao' dataSort>Programa</TableHeaderColumn>
                <TableHeaderColumn dataField='help' dataSort>Help</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}