import React from 'react';
import { BootstrapTable, TableHeaderColumn, InsertButton, DeleteButton } from 'react-bootstrap-table';

export default class ProgramaFormTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currPage: 1
        };
    }

    createCustomInsertButton = (onClick) => {
        return (
            <InsertButton
                btnText='Novo'
            />
        )
    };

    createCustomDeleteButton = (onClick) => {
        return (
            <DeleteButton
                btnText='Excluir'
            />
        )
    };

    render() {

        const { tiposEmail } = this.props;

        const onAfterInsertRow = (row) => {

            tiposEmail.push({
                codTipoEmail: row.codTipoEmail,
                descricao: row.descricao
            })
        }

        const onAfterDeleteRow = (rowKeys, row) => {

            tiposEmail.splice(tiposEmail.indexOf(row.codTipoEmail), 1);
        }

        const options = {
            insertBtn: this.createCustomInsertButton,
            deleteBtn: this.createCustomDeleteButton,
            afterInsertRow: onAfterInsertRow,
            afterDeleteRow: onAfterDeleteRow
        };

        const selectRow = {
            mode: 'checkbox'
        };

        const cellEditProp = {
            mode: 'click',
            blurToSave: true
        };

        return (
            <BootstrapTable ref='tiposEmail-table' data={tiposEmail} pagination={true} selectRow={selectRow} cellEdit={cellEditProp} options={options} striped={true} hover={true} keyBoardNav insertRow={true} deleteRow>
                <TableHeaderColumn editable={false} isKey={true} dataField='codTipoEmail' dataSort>Cód. Tipo de E-mail</TableHeaderColumn>
                <TableHeaderColumn editable={{ type: 'text' }} dataField='descricao' dataSort>Descrição</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}