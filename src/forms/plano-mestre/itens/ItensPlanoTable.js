/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class ItensPlanoTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {

        const { itens } = this.props;
        const { plano1 } = this.props;
        const { plano2 } = this.props;
        const { plano3 } = this.props;
        const { plano4 } = this.props;
        const { plano5 } = this.props;
        const { plano6 } = this.props;
        const { plano7 } = this.props;
        const { plano8 } = this.props;
        const { options } = this.props;

        const footerData = [
            [
                {
                    label: 'Total',
                    columnIndex: 0
                },
                {
                    label: 'Total value',
                    columnIndex: 4,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdePrevisao;
                        }
                        return (
                            <strong>{label}</strong>
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
                            label += tableData[i].qtdeEstoque;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 6,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeDemPlano1;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 7,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeProcPlano1;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 8,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        let label2 = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            if (tableData[i].qtdeSaldoPlano1 < 0) label += tableData[i].qtdeSaldoPlano1;
                            else label2 += tableData[i].qtdeSaldoPlano1;
                        }
                        return (
                            <strong><font color="red">{label}</font> <br></br> {label2}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 9,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeDemPlano2;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 10,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeProcPlano2;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 11,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        let label2 = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            if (tableData[i].qtdeSaldoPlano2 < 0) label += tableData[i].qtdeSaldoPlano2;
                            else label2 += tableData[i].qtdeSaldoPlano2;
                        }
                        return (
                            <strong><font color="red">{label}</font> <br></br> {label2}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 12,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeDemPlano3;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 13,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeProcPlano3;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 14,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        let label2 = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            if (tableData[i].qtdeSaldoPlano3 < 0) label += tableData[i].qtdeSaldoPlano3;
                            else label2 += tableData[i].qtdeSaldoPlano3;
                        }
                        return (
                            <strong><font color="red">{label}</font> <br></br> {label2}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 15,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeDemPlano4;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 16,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeProcPlano4;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 17,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        let label2 = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            if (tableData[i].qtdeSaldoPlano4 < 0) label += tableData[i].qtdeSaldoPlano4;
                            else label2 += tableData[i].qtdeSaldoPlano4;
                        }
                        return (
                            <strong><font color="red">{label}</font> <br></br> {label2}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 18,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeDemPlano5;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 19,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeProcPlano5;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 20,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        let label2 = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            if (tableData[i].qtdeSaldoPlano5 < 0) label += tableData[i].qtdeSaldoPlano5;
                            else label2 += tableData[i].qtdeSaldoPlano5;
                        }
                        return (
                            <strong><font color="red">{label}</font> <br></br> {label2}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 21,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeDemPlano6;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 22,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeProcPlano6;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 23,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        let label2 = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            if (tableData[i].qtdeSaldoPlano6 < 0) label += tableData[i].qtdeSaldoPlano6;
                            else label2 += tableData[i].qtdeSaldoPlano6;
                        }
                        return (
                            <strong><font color="red">{label}</font> <br></br> {label2}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 24,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeDemPlano7;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 25,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeProcPlano7;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 26,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        let label2 = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            if (tableData[i].qtdeSaldoPlano7 < 0) label += tableData[i].qtdeSaldoPlano7;
                            else label2 += tableData[i].qtdeSaldoPlano7;
                        }
                        return (
                            <strong><font color="red">{label}</font> <br></br> {label2}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 27,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeDemPlano8;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 28,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeProcPlano8;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 29,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        let label2 = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            if (tableData[i].qtdeSaldoPlano8 < 0) label += tableData[i].qtdeSaldoPlano8;
                            else label2 += tableData[i].qtdeSaldoPlano8;
                        }
                        return (
                            <strong><font color="red">{label}</font> <br></br> {label2}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 30,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeDemAcumulado;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 31,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeProcAcumulado;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 32,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        let label2 = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            if (tableData[i].qtdeSaldoAcumulado < 0) label += tableData[i].qtdeSaldoAcumulado;
                            else label2 += tableData[i].qtdeSaldoAcumulado;
                        }
                        return (
                            <strong><font color="red">{label}</font> <br></br> {label2}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 33,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeSugestao;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 34,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeEqualizadoSugestao;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 35,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += tableData[i].qtdeDiferencaSugestao;
                        }
                        return (
                            <strong>{label}</strong>
                        );
                    }
                },
                {
                    label: 'Total value',
                    columnIndex: 36,
                    align: 'right',
                    formatter: (tableData) => {
                        let label = 0;
                        for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            label += parseInt(tableData[i].qtdeProgramada);
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
            <BootstrapTable ref='table' data={itens} pagination={true} options={options} striped={true} hover={true} footerData={footerData} footer cellEdit={cellEditProp} keyBoardNav={keyBoardNav}>

                <TableHeaderColumn row='0' rowSpan='2' colSpan='6' headerAlign="center">Produtos</TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='3' headerAlign="center">Plano 1</TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='3' headerAlign="center">Plano 2</TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='3' headerAlign="center">Plano 3</TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='3' headerAlign="center">Plano 4</TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='3' headerAlign="center">Plano 5</TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='3' headerAlign="center">Plano 6</TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='3' headerAlign="center">Plano 7</TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='3' headerAlign="center">Plano 8</TableHeaderColumn>

                <TableHeaderColumn row='0' rowSpan='2' colSpan='3' headerAlign="center">Acumulado</TableHeaderColumn>
                <TableHeaderColumn row='0' rowSpan='2' colSpan='4' headerAlign="center">Sugestão Programação</TableHeaderColumn>

                <TableHeaderColumn row='1' rowSpan='1' colSpan='3' headerAlign="center">{plano1}</TableHeaderColumn>
                <TableHeaderColumn row='1' rowSpan='1' colSpan='3' headerAlign="center">{plano2}</TableHeaderColumn>
                <TableHeaderColumn row='1' rowSpan='1' colSpan='3' headerAlign="center">{plano3}</TableHeaderColumn>
                <TableHeaderColumn row='1' rowSpan='1' colSpan='3' headerAlign="center">{plano4}</TableHeaderColumn>
                <TableHeaderColumn row='1' rowSpan='1' colSpan='3' headerAlign="center">{plano5}</TableHeaderColumn>
                <TableHeaderColumn row='1' rowSpan='1' colSpan='3' headerAlign="center">{plano6}</TableHeaderColumn>
                <TableHeaderColumn row='1' rowSpan='1' colSpan='3' headerAlign="center">{plano7}</TableHeaderColumn>
                <TableHeaderColumn row='1' rowSpan='1' colSpan='3' headerAlign="center">{plano8}</TableHeaderColumn>

                <TableHeaderColumn row='2' dataField='codigo' width='140' dataSort isKey={true} filter={{ type: 'TextFilter', placeholder: 'Código' }}>Ref . Cor</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='embarque' editable={false} width='130' dataSort filter={{ type: 'TextFilter', placeholder: 'Embarque' }}>Emb</TableHeaderColumn>                
                <TableHeaderColumn row='2' dataField='sugCancelProducao' editable={false} width='60' dataSort filter={{ type: 'TextFilter', placeholder: 'Sugestão' }}>S.C</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='rank' editable={false} dataAlign="right" dataSort>Rank</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdePrevisao' editable={false} dataAlign="right" dataSort>Prev</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeEstoque' editable={false} dataAlign="right" dataSort>Estq</TableHeaderColumn>

                <TableHeaderColumn row='2' dataField='qtdeDemPlano1' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeProcPlano1' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeSaldoPlano1' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='2' dataField='qtdeDemPlano2' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeProcPlano2' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeSaldoPlano2' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='2' dataField='qtdeDemPlano3' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeProcPlano3' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeSaldoPlano3' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='2' dataField='qtdeDemPlano4' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeProcPlano4' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeSaldoPlano4' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='2' dataField='qtdeDemPlano5' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeProcPlano5' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeSaldoPlano5' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='2' dataField='qtdeDemPlano6' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeProcPlano6' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeSaldoPlano6' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='2' dataField='qtdeDemPlano7' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeProcPlano7' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeSaldoPlano7' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='2' dataField='qtdeDemPlano8' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeProcPlano8' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeSaldoPlano8' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='2' dataField='qtdeDemAcumulado' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeProcAcumulado' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeSaldoAcumulado' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='2' dataField='qtdeSugestao' editable={false} dataAlign="right" dataSort>Sug</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeEqualizadoSugestao' editable={false} dataAlign="right" dataSort>Equal</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeDiferencaSugestao' editable={false} dataAlign="right" dataSort>Dif</TableHeaderColumn>
                <TableHeaderColumn row='2' dataField='qtdeProgramada' editable={{ type: 'number' }} width='100' dataAlign="right" dataSort>Prog</TableHeaderColumn>

            </BootstrapTable>
        );
    }
}