/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class EstagiosTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {

        const { estagios } = this.props;
        const { options } = this.props;

        const cellEditProp = {
            mode: 'click',
            blurToSave: true            
        };

        const keyBoardNav = {
            enterToEdit: true
        };

        return (
            <BootstrapTable ref='table-estagios' data={estagios} pagination={true} options={options} striped={true} hover={true} cellEdit={cellEditProp} keyBoardNav={keyBoardNav}>

                <TableHeaderColumn dataField='estagio' dataSort isKey={true} filter={{ type: 'TextFilter', placeholder: 'Código' }}>Código</TableHeaderColumn>
                <TableHeaderColumn dataField='descricao' dataSort editable={false} filter={{ type: 'TextFilter', placeholder: 'Descrição' }}>Descrição</TableHeaderColumn>                
                <TableHeaderColumn dataField='qtdePecas' dataSort editable={{ type: 'number' }}>Quantidade de Peças</TableHeaderColumn>
                <TableHeaderColumn dataField='qtdeMinutos' dataSort editable={{ type: 'number' }}>Quantidade de Minutos</TableHeaderColumn>

            </BootstrapTable>
        );
    }
}