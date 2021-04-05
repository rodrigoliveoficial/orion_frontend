/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class TamanhosPlanoTable extends React.Component {

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
            <BootstrapTable ref='table' data={tamanhosItem}  striped={true} hover={true} cellEdit={cellEditProp} keyBoardNav={keyBoardNav}>

                <TableHeaderColumn dataField='ordem' isKey={true} width='50'>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='sub' editable={false}>Tamanho</TableHeaderColumn>
                <TableHeaderColumn dataField='qtdeEstoque' editable={false} dataAlign="right">Estoque</TableHeaderColumn>
                <TableHeaderColumn dataField='qtdeDemanda' editable={false} dataAlign="right">Demanda</TableHeaderColumn>
                <TableHeaderColumn dataField='qtdeProcesso' editable={false} dataAlign="right">Em Processo</TableHeaderColumn>
                <TableHeaderColumn dataField='qtdeSaldo' editable={false} dataAlign="right">Saldo</TableHeaderColumn>
                <TableHeaderColumn dataField='qtdeSugestao' editable={false} dataAlign="right">Sugestão</TableHeaderColumn>
                <TableHeaderColumn dataField='qtdeEqualizado' editable={false} dataAlign="right">Equalizado</TableHeaderColumn>
                <TableHeaderColumn dataField='qtdeDiferenca' editable={false} dataAlign="right">Diferença</TableHeaderColumn>
                <TableHeaderColumn dataField='qtdeProgramada' editable={ { type: 'number'} } dataAlign="right">Programado</TableHeaderColumn>
                
            </BootstrapTable>
        );
    }
}