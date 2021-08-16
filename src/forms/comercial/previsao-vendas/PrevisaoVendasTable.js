/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class PrevisaoVendasTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currPage: 1
        };
    }

    render() {

        const { options } = this.props;
        const { previsoes } = this.props;

        return (
            <BootstrapTable ref='previsao-table' data={previsoes} pagination={true} options={options} striped={true} hover={true} keyBoardNav>
                <TableHeaderColumn dataField='id' isKey={true} dataSort width='100' >Código</TableHeaderColumn>
                <TableHeaderColumn dataField='descricao' dataSort>Descrição</TableHeaderColumn>
                <TableHeaderColumn dataField='descricaoColecao' dataSort>Coleção</TableHeaderColumn>
                <TableHeaderColumn dataField='descricaoTabPrecoSellIn' dataSort>Tabela de Preço - Sell In</TableHeaderColumn>
                <TableHeaderColumn dataField='descricaoTabPrecoSellOut' dataSort>Tabela de Preço - Sell Out</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}