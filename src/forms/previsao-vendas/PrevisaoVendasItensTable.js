/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class PrevisaoVendasItensTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currPage: 1
        };
    }

    render() {

        const { options } = this.props;
        const { itensColecao } = this.props;

        const cellEditProp = {
            mode: 'click',
            blurToSave: true
        };

        const keyBoardNav = {
            enterToEdit: true            
        };
        
        const footerData = [
            [
                {
                    label: 'Total',
                    columnIndex:13,
                    align: 'right'
                },
                {
                    label: 'Total value',
                    columnIndex: 14,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += parseInt(tableData[i].qtdePrevisao);
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                }
            ]
        ];

        return (
            <BootstrapTable ref='previsao-itens-table' data={itensColecao} pagination={true} options={options} striped={true} hover={true} cellEdit={cellEditProp} keyBoardNav={keyBoardNav} footerData={footerData} footer>
                <TableHeaderColumn dataField='id' isKey={true} width='60' type="number">ID</TableHeaderColumn>                
                <TableHeaderColumn dataField='grupo' width='130' editable={false}  filter={{ type: 'TextFilter', placeholder: '' }}>Referência</TableHeaderColumn>
                <TableHeaderColumn dataField='item' width='130' editable={false}  filter={{ type: 'TextFilter', placeholder: '' }}>Cor</TableHeaderColumn>
                <TableHeaderColumn dataField='descricao' editable={false}  filter={{ type: 'TextFilter', placeholder: '' }}>Descrição</TableHeaderColumn>
                <TableHeaderColumn dataField='artigo' editable={false}  filter={{ type: 'TextFilter', placeholder: '' }}>Artigo</TableHeaderColumn>
                <TableHeaderColumn dataField='linha' editable={false}  filter={{ type: 'TextFilter', placeholder: '' }}>Linha</TableHeaderColumn>
                <TableHeaderColumn dataField='embarque' editable={false}  filter={{ type: 'TextFilter', placeholder: '' }}>Embarque</TableHeaderColumn>
                <TableHeaderColumn dataField='valorSellIn' width='130' editable={false} dataAlign="right"> Sell IN</TableHeaderColumn>
                <TableHeaderColumn dataField='valorSellOut' width='130' editable={false} dataAlign="right">Sell OUT</TableHeaderColumn>                
                <TableHeaderColumn dataField='grupoBase' width='130'>Ref. (Base)</TableHeaderColumn>                
                <TableHeaderColumn dataField='itemBase' width='130'>Cor (Base)</TableHeaderColumn>                
                <TableHeaderColumn dataField='descricaoBase'  editable={false} filter={{ type: 'TextFilter', placeholder: '' }}>Descrição</TableHeaderColumn>
                <TableHeaderColumn dataField='qtdeVendidaBase' width='130' editable={false} dataAlign="right">Vendido</TableHeaderColumn>
                <TableHeaderColumn dataField='percAplicar' editable={{ type: 'number' }} width='130' dataAlign="right">Percentual</TableHeaderColumn>
                <TableHeaderColumn dataField='qtdePrevisao' editable={{ type: 'number' }} width='130' dataAlign="right">Previsão</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}