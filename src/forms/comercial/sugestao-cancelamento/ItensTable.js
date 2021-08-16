/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class ItensTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currPage: 1
        };
    }

    render() {
        const {
            currPage
        } = this.state;

        const { dadosConsulta } = this.props;
        const { selectRowPropAux } = this.props;

        const options = {
            sizePerPageList: [5, 10, 15, 20],
            sizePerPage: 10,
            page: currPage
        };

        return (
            <BootstrapTable ref='table' data={dadosConsulta} selectRow={selectRowPropAux} pagination={true} options={options} striped={true} hover={true} condensed={true}>
                <TableHeaderColumn dataField='id' isKey={true} dataSort hidden={true} width='150'>Ref . Cor</TableHeaderColumn>
                <TableHeaderColumn dataField='grupo' dataSort width='150' filter={{ type: 'TextFilter'}}>Referência</TableHeaderColumn>
                <TableHeaderColumn dataField='item' dataSort width='150' filter={{ type: 'TextFilter'}}>Cor</TableHeaderColumn>                
                <TableHeaderColumn dataField='descricao' dataSort filter={{ type: 'TextFilter'}}>Descrição</TableHeaderColumn>
                <TableHeaderColumn dataField='colecao' dataSort filter={{ type: 'TextFilter'}}>Coleção</TableHeaderColumn>
                <TableHeaderColumn dataField='situacao' dataSort filter={{ type: 'TextFilter'}}>Situação</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}