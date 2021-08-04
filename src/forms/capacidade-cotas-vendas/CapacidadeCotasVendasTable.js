/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class CapacidadeProducaoTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {

        const { capacidades } = this.props;
        const { options } = this.props;

        return (
            <BootstrapTable ref='table-capacidades' data={capacidades} pagination={true} options={options} striped={true} hover={true} keyBoardNav>
                
                <TableHeaderColumn dataField='id' isKey={true} hidden width='50'>Id</TableHeaderColumn>
                <TableHeaderColumn dataField='periodo' filter={{ type: 'TextFilter', placeholder: 'Periodo' }} width='300'>Período</TableHeaderColumn>
                <TableHeaderColumn dataField='colecao' filter={{ type: 'TextFilter', placeholder: 'Coleção' }} width='250'>Coleção</TableHeaderColumn>
                <TableHeaderColumn dataField='linha' filter={{ type: 'TextFilter', placeholder: 'Linha' }} width='150'>Linha</TableHeaderColumn>                
                <TableHeaderColumn dataField='minutos' dataAlign="right" width='300'>Quantidade Minutos</TableHeaderColumn>
                <TableHeaderColumn dataField='pecas' dataAlign="right" width='300'>Quantidade Peças</TableHeaderColumn>

            </BootstrapTable>
        );
    }
}