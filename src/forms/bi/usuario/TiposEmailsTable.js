/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class UsuarioFormTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currPage: 1
        };
    }

    render() {

        const { options } = this.props;
        const { tiposEmails } = this.props;
        const { selectRowPropAux } =this.props;

        return (
            <BootstrapTable ref='tiposEmails-table' data={tiposEmails} selectRow={selectRowPropAux} pagination={false} options={options} striped={true}>
                <TableHeaderColumn dataField='id' hidden={true} isKey={true} dataSort width='100' >Código</TableHeaderColumn>
                <TableHeaderColumn dataField='codTipoEmail' dataSort width='100' >Código</TableHeaderColumn>
                <TableHeaderColumn dataField='descricao' dataSort >Descrição</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}