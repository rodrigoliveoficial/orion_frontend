/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class ItensTable extends React.Component {

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

        const { previsaoVendas } = this.props;

        const options = {
            sizePerPageList: [5, 10, 20, 50, 100],
            sizePerPage: 10,
            page: currPage
        };

        const cellEditProp = {
            mode: 'click',
            blurToSave: true
        };

        const keyBoardNav = {
            enterToEdit: true            
        };
        
        return (
            <BootstrapTable ref='previsao-table' data={previsaoVendas} pagination={true} options={options} striped={true} hover={true} cellEdit={cellEditProp} keyBoardNav={keyBoardNav}>
                <TableHeaderColumn dataField='id' isKey={true} dataSort width='50' >ID</TableHeaderColumn>
                <TableHeaderColumn dataField='grupo' dataSort width='150' editable={false}  filter={{ type: 'TextFilter', placeholder: '' }}>Referência</TableHeaderColumn>
                <TableHeaderColumn dataField='item' dataSort width='150' editable={false}  filter={{ type: 'TextFilter', placeholder: '' }}>Cor</TableHeaderColumn>
                <TableHeaderColumn dataField='descricao' dataSort editable={false}  filter={{ type: 'TextFilter', placeholder: '' }}>Descrição</TableHeaderColumn>
                <TableHeaderColumn dataField='valorSellIn' editable={false} width='200' dataAlign="right" dataSort>Sell IN</TableHeaderColumn>
                <TableHeaderColumn dataField='valorSellOut' editable={false} width='200' dataAlign="right" dataSort>Sell OUT</TableHeaderColumn>                
                <TableHeaderColumn dataField='qtdePrevisaoVendas' editable={{ type: 'number' }} width='200' dataAlign="right" dataSort>Previsão Vendas</TableHeaderColumn>                                
            </BootstrapTable>
        );
    }
}