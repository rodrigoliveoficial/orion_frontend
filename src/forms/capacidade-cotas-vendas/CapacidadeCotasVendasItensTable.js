/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../css/CapacidadeCotasVendas.css'

function columnClassChangeColor(fieldValue, row, rowIdx, colIdx) {
    return row.modelo === '00000' ? 'modelo-generico-style' : '';
}

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
                            label += parseInt(tableData[i].minutos);
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

        const keyBoardNav = {
            enterToEdit: true
        };

        return (
            <BootstrapTable ref='table-capacidadesItens' data={capacidadesItens} pagination={true} options={options} hover={true} cellEdit={cellEditProp} keyBoardNav={keyBoardNav} footerData={footerData} footer>
                <TableHeaderColumn dataField='modelo' columnClassName={ columnClassChangeColor }  isKey={true} editable={false} filter={{ type: 'TextFilter', placeholder: 'Produto' }} width='150'>Produto</TableHeaderColumn>
                <TableHeaderColumn dataField='descricao' columnClassName={ columnClassChangeColor } editable={false} filter={{ type: 'TextFilter', placeholder: 'Descrição' }}>Descrição</TableHeaderColumn>                
                <TableHeaderColumn dataField='minutos' columnClassName={ columnClassChangeColor } editable={{ type: 'number' }} dataAlign="right" width='300'>Capacidade Minutos</TableHeaderColumn>
                <TableHeaderColumn dataField='pecas' columnClassName={ columnClassChangeColor } editable={{ type: 'number' }} dataAlign="right" width='300'>Capacidade Peças</TableHeaderColumn>

            </BootstrapTable>
        );
    }
}