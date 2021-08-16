/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class ArtigosTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {

        const { artigos } = this.props;
        const { options } = this.props;

        const footerData = [
            [
                {
                    label: 'Total',
                    columnIndex: 1,
                    align: 'right'
                },
                {
                    label: 'Total value',
                    columnIndex: 2,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += parseInt(tableData[i].qtdePecas);
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 3,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += parseInt(tableData[i].qtdeMinutos);
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                }
            ]
        ];

        const cellEditProp = {
            mode: 'click',
            blurToSave: true            
        };

        const keyBoardNav = {
            enterToEdit: true
        };

        return (
            <BootstrapTable ref='artigo-table' data={artigos} pagination={true} options={options} striped={true} hover={true} cellEdit={cellEditProp} keyBoardNav={keyBoardNav} footerData={footerData} footer>

                <TableHeaderColumn dataField='artigo' dataSort isKey={true} filter={{ type: 'TextFilter', placeholder: 'Código' }} width='150'>Código</TableHeaderColumn>
                <TableHeaderColumn dataField='descricao' dataSort editable={false} filter={{ type: 'TextFilter', placeholder: 'Descrição' }}>Descrição</TableHeaderColumn>
                <TableHeaderColumn dataField='qtdePecas' dataSort editable={{ type: 'number' }} dataAlign="right" width='300'>Quantidade de Peças</TableHeaderColumn>
                <TableHeaderColumn dataField='qtdeMinutos' dataSort editable={{ type: 'number' }} dataAlign="right" width='300'>Quantidade de Minutos</TableHeaderColumn>

            </BootstrapTable>
        );
    }
}