/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class AbaInspecaoPecasPaineisItens extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currPage: 1
        };
    }

    render() {
   
        const { dataInspecoesPecas } = this.props;
        const { selectRow } = this.props;

        return (
            <BootstrapTable ref='inspecoes-table' data={dataInspecoesPecas} selectRow={selectRow} striped={true} hover={true}>
                <TableHeaderColumn dataField='id' isKey={true} width='90'>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='data'>Data Inspeção</TableHeaderColumn>
                <TableHeaderColumn dataField='turno'>Turno</TableHeaderColumn>
                <TableHeaderColumn dataField='usuario'>Usuário</TableHeaderColumn>
                <TableHeaderColumn dataField='percInspecionarPcs'>% Inspecionar</TableHeaderColumn>
                <TableHeaderColumn dataField='qtdeInspecionarPcs'>Qtde Inspecionar</TableHeaderColumn>
                <TableHeaderColumn dataField='qtdeInspecionadaPcs'>Qtde Inspecionada</TableHeaderColumn>
                <TableHeaderColumn dataField='qtdeRejeitadaPcs'>Qtde Rejeitada</TableHeaderColumn>
                <TableHeaderColumn dataField='percRejeitadaPcs'>% Rejeição</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}