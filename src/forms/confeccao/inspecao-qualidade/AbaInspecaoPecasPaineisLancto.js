/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class AbaInspecaoPecasPaineisLancto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currPage: 1
        };
    }

    render() {
   
        const { dataLancamentos } = this.props;
        const { selectRowLancto } = this.props;

        return (
            <BootstrapTable ref='inspecoes-table' data={dataLancamentos} selectRow={selectRowLancto} striped={true} hover={true} condensed={true}>
                <TableHeaderColumn dataField='id' isKey={true} width='90'>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='motivo'>Motivo</TableHeaderColumn>
                <TableHeaderColumn dataField='estagio'>Estagio do Motivo</TableHeaderColumn>
                <TableHeaderColumn dataField='usuario'>Usuário</TableHeaderColumn>
                <TableHeaderColumn dataField='dataHora'>Data</TableHeaderColumn>
                <TableHeaderColumn dataField='quantidade'>Quantidade</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}