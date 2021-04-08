/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class PreOrdensTable extends React.Component {

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

        const { dadosPreOrdens } = this.props;
        const { selectRowPropAux } = this.props;

        const footerData = [
            [
                {
                    label: 'Total',
                    columnIndex: 6
                },
                {
                    label: 'Total value',
                    columnIndex: 7,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].quantidade;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                }
            ]
        ];

        const options = {
            sizePerPageList: [5, 10, 15, 20, 1000],
            sizePerPage: 10,
            page: currPage
        };

        return (
            <BootstrapTable ref='pre-ordens-table' data={dadosPreOrdens} selectRow={selectRowPropAux} pagination={true} options={options} striped={true} hover={true} condensed={true} footerData={footerData} footer>
                <TableHeaderColumn dataField='id' isKey={true} dataSort width='140'>ID Pré-Ordem</TableHeaderColumn>
                <TableHeaderColumn dataField='ordemGerada' dataSort width='140'>OP Gerada</TableHeaderColumn>
                <TableHeaderColumn dataField='referencia' dataSort>Referência</TableHeaderColumn>
                <TableHeaderColumn dataField='periodo' dataSort width='140'>Período</TableHeaderColumn>
                <TableHeaderColumn dataField='alternativa' dataSort>Alternativa</TableHeaderColumn>
                <TableHeaderColumn dataField='roteiro' dataSort width='140'>Roteiro</TableHeaderColumn>
                <TableHeaderColumn dataField='deposito' dataSort>Depósito de Entrada</TableHeaderColumn>
                <TableHeaderColumn dataField='observacao' dataSort>Observação</TableHeaderColumn>
                <TableHeaderColumn dataField='quantidade' dataSort width='140' dataAlign="right">Quantidade</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}