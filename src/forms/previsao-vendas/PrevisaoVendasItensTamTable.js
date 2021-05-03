/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class PrevisaoVendasItensTamTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }
    
    render() {

        const { tamanhosItem } = this.props;

        const cellEditProp = {
            mode: 'click',
            blurToSave: true
        };

        const keyBoardNav = {
            enterToEdit: true              
        };

        return (
            <BootstrapTable ref='previsao-itens-tam-table' data={tamanhosItem}  striped={true} hover={true} cellEdit={cellEditProp} keyBoardNav={keyBoardNav}>
                <TableHeaderColumn dataField='ordem' isKey={true} width='50'>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='sub' editable={false}>Tamanhos</TableHeaderColumn>
                <TableHeaderColumn dataField='qtdePrevisao' editable={{ type: 'number' }} dataAlign="right">Previsão Vendas</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}