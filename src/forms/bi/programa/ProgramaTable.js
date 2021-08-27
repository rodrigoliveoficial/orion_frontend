import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class ProgramaTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currPage: 1
        };
    }

    render() {

        const { options } = this.props;
        const { programas } = this.props;

        return (
            <BootstrapTable ref='usuarios-table' data={programas} pagination={true} options={options} striped={true} hover={true} keyBoardNav>
                <TableHeaderColumn dataField='id' isKey={true} dataSort width='100' >Código</TableHeaderColumn>
                <TableHeaderColumn dataField='areaModulo' filter={{ type: 'TextFilter', placeholder: 'Área/Módulo' }} width='400' dataSort>Área/Módulo</TableHeaderColumn>
                <TableHeaderColumn dataField='descricao' width='600' dataSort>Descrição</TableHeaderColumn>
                <TableHeaderColumn dataField='ferramenta' dataSort>Ferramenta</TableHeaderColumn>
                <TableHeaderColumn dataField='frequencia' dataSort>Frequência</TableHeaderColumn>
                <TableHeaderColumn dataField='planilha' dataSort>Planilha</TableHeaderColumn>
                <TableHeaderColumn dataField='extrator' dataSort>Extrator</TableHeaderColumn>
                <TableHeaderColumn dataField='help' dataSort>Help</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}