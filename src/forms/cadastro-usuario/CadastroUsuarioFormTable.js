/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class CadastroUsuarioFormTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currPage: 1
        };
    }

    render() {

        const { options } = this.props;
        const { programas } = this.props;
        const { selectRowPropAux }= this.props;

        return (
            <BootstrapTable ref='programas-table' data={programas} selectRow={selectRowPropAux} pagination={true} options={options} striped={true} hover={true} keyBoardNav>
                <TableHeaderColumn dataField='id' isKey={true} dataSort width='100' >Código</TableHeaderColumn>
                <TableHeaderColumn dataField='modulo' dataSort width='100' >Módulo</TableHeaderColumn>
                <TableHeaderColumn dataField='descricao' dataSort filter={{ type: 'TextFilter', placeholder: 'Nome do Programa' }}>Nome do Programa</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}