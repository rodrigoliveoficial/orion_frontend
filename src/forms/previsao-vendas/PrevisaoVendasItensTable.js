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
                    columnIndex:12,
                    align: 'right'
                },
                {
                    label: 'Total value',
                    columnIndex: 13,
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
                <TableHeaderColumn dataField='id' isKey={true} dataSort width='60' >ID</TableHeaderColumn>                
                <TableHeaderColumn dataField='grupo' dataSort width='150' editable={false}  filter={{ type: 'TextFilter', placeholder: '' }}>Referência</TableHeaderColumn>
                <TableHeaderColumn dataField='item' dataSort width='150' editable={false}  filter={{ type: 'TextFilter', placeholder: '' }}>Cor</TableHeaderColumn>
                <TableHeaderColumn dataField='descricao' dataSort editable={false}  filter={{ type: 'TextFilter', placeholder: '' }}>Descrição</TableHeaderColumn>
                <TableHeaderColumn dataField='artigo' dataSort editable={false}  filter={{ type: 'TextFilter', placeholder: '' }}>Artigo</TableHeaderColumn>
                <TableHeaderColumn dataField='linha' dataSort editable={false}  filter={{ type: 'TextFilter', placeholder: '' }}>Linha</TableHeaderColumn>
                <TableHeaderColumn dataField='embarque' dataSort editable={false}  filter={{ type: 'TextFilter', placeholder: '' }}>Embarque</TableHeaderColumn>
                <TableHeaderColumn dataField='valorSellIn' editable={false} width='200' dataAlign="right" dataSort> Sell IN</TableHeaderColumn>
                <TableHeaderColumn dataField='valorSellOut' editable={false} width='200' dataAlign="right" dataSort>Sell OUT</TableHeaderColumn>                
                <TableHeaderColumn dataField='grupoBase' width='200' dataSort>Referência (Base)</TableHeaderColumn>                
                <TableHeaderColumn dataField='itemBase' width='200' dataSort>Cor (Base)</TableHeaderColumn>                
                <TableHeaderColumn dataField='qtdeVendidaBase' width='200' editable={false} dataSort dataAlign="right">Qtde Vendida (Base)</TableHeaderColumn>
                <TableHeaderColumn dataField='percAplicar' editable={{ type: 'number' }} width='200' dataAlign="right" dataSort>Percentual Aplicar</TableHeaderColumn>
                <TableHeaderColumn dataField='qtdePrevisao' editable={{ type: 'number' }} width='200' dataAlign="right" dataSort>Previsão Vendas</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}