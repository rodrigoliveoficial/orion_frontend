/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../css/CapacidadeCotasVendas.css'

export default class CapacidadeProducaoItensTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {

        const { capacidadesItens } = this.props;
        const { options } = this.props;

        const footerData = [
            [
                {
                    label: 'Total',
                    columnIndex: 3,
                    align: 'right'
                },
                {
                    label: 'Total value',
                    columnIndex: 4,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += parseFloat(tableData[i].minutos);
                        }
                        return (
                            <strong>{label.toFixed(4)}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 5,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += parseInt(tableData[i].pecas);
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

        return (
            <BootstrapTable ref='table-capacidadesItens' data={capacidadesItens} striped pagination={true} options={options} hover={true} cellEdit={cellEditProp} keyBoardNav footerData={footerData} footer>
                <TableHeaderColumn dataField='modelo' isKey={true} editable={false} filter={{ type: 'TextFilter', placeholder: 'Produto' }} width='150'>Produto</TableHeaderColumn>
                <TableHeaderColumn dataField='descricao' editable={false} filter={{ type: 'TextFilter', placeholder: 'Descrição' }}>Descrição</TableHeaderColumn>                
                <TableHeaderColumn dataField='categoria' editable={false} width='250' filter={{ type: 'TextFilter', placeholder: 'Categoria' }}>Categoria</TableHeaderColumn>
                <TableHeaderColumn dataField='tempoUnitario' editable={false} dataAlign="right" width='300'>Tempo Unitário</TableHeaderColumn>
                <TableHeaderColumn dataField='minutos'editable={false} dataAlign="right" width='300'>Quantidade Minutos</TableHeaderColumn>
                <TableHeaderColumn dataField='pecas' editable={{ type: 'float' }} dataAlign="right" width='300'>Quantidade Peças</TableHeaderColumn>

            </BootstrapTable>
        );
    }
}