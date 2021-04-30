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
        const { planoDem1 } = this.props;
        const { planoDem2 } = this.props;
        const { planoDem3 } = this.props;
        const { planoDem4 } = this.props;
        const { planoDem5 } = this.props;
        const { planoDem6 } = this.props;
        const { planoDem7 } = this.props;
        const { planoDem8 } = this.props;
        const { planoProc1 } = this.props;
        const { planoProc2 } = this.props;
        const { planoProc3 } = this.props;
        const { planoProc4 } = this.props;
        const { planoProc5 } = this.props;
        const { planoProc6 } = this.props;
        const { planoProc7 } = this.props;
        const { planoProc8 } = this.props;
        const { planoProg } = this.props;
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
            <BootstrapTable ref='itens-table' data={itens} pagination={true} options={options} striped={true} hover={true} footerData={footerData} footer cellEdit={cellEditProp} keyBoardNav={keyBoardNav}>

                <TableHeaderColumn row='0' rowSpan='3' colSpan='6' headerAlign="center">Produtos</TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='3' headerAlign="center">Plano 1</TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='3' headerAlign="center">Plano 2</TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='3' headerAlign="center">Plano 3</TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='3' headerAlign="center">Plano 4</TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='3' headerAlign="center">Plano 5</TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='3' headerAlign="center">Plano 6</TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='3' headerAlign="center">Plano 7</TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='3' headerAlign="center">Plano 8</TableHeaderColumn>

                <TableHeaderColumn row='0' rowSpan='3' colSpan='3' headerAlign="center">Acumulado Total</TableHeaderColumn>
                <TableHeaderColumn row='0' rowSpan='2' colSpan='3' headerAlign="center">Acumulado Parcial</TableHeaderColumn>
                <TableHeaderColumn row='0' rowSpan='3' colSpan='4' headerAlign="center">Sugestão Programação</TableHeaderColumn>

                <TableHeaderColumn row='1' rowSpan='1' colSpan='3' headerAlign="center">{planoDem1}</TableHeaderColumn>
                <TableHeaderColumn row='1' rowSpan='1' colSpan='3' headerAlign="center">{planoDem2}</TableHeaderColumn>
                <TableHeaderColumn row='1' rowSpan='1' colSpan='3' headerAlign="center">{planoDem3}</TableHeaderColumn>
                <TableHeaderColumn row='1' rowSpan='1' colSpan='3' headerAlign="center">{planoDem4}</TableHeaderColumn>
                <TableHeaderColumn row='1' rowSpan='1' colSpan='3' headerAlign="center">{planoDem5}</TableHeaderColumn>
                <TableHeaderColumn row='1' rowSpan='1' colSpan='3' headerAlign="center">{planoDem6}</TableHeaderColumn>
                <TableHeaderColumn row='1' rowSpan='1' colSpan='3' headerAlign="center">{planoDem7}</TableHeaderColumn>
                <TableHeaderColumn row='1' rowSpan='1' colSpan='3' headerAlign="center">{planoDem8}</TableHeaderColumn>
                <TableHeaderColumn row='2' rowSpan='1' colSpan='3' headerAlign="center">{planoProc1}</TableHeaderColumn>
                <TableHeaderColumn row='2' rowSpan='1' colSpan='3' headerAlign="center">{planoProc2}</TableHeaderColumn>
                <TableHeaderColumn row='2' rowSpan='1' colSpan='3' headerAlign="center">{planoProc3}</TableHeaderColumn>
                <TableHeaderColumn row='2' rowSpan='1' colSpan='3' headerAlign="center">{planoProc4}</TableHeaderColumn>
                <TableHeaderColumn row='2' rowSpan='1' colSpan='3' headerAlign="center">{planoProc5}</TableHeaderColumn>
                <TableHeaderColumn row='2' rowSpan='1' colSpan='3' headerAlign="center">{planoProc6}</TableHeaderColumn>
                <TableHeaderColumn row='2' rowSpan='1' colSpan='3' headerAlign="center">{planoProc7}</TableHeaderColumn>
                <TableHeaderColumn row='2' rowSpan='1' colSpan='3' headerAlign="center">{planoProc8}</TableHeaderColumn>
                <TableHeaderColumn row='2' rowSpan='1' colSpan='3' headerAlign="center">{planoProg}</TableHeaderColumn>

                <TableHeaderColumn row='3' dataField='codigo' width='140' dataSort isKey={true} filter={{ type: 'TextFilter', placeholder: 'Código' }}>Ref . Cor</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='embarque' editable={false} width='130' dataSort filter={{ type: 'TextFilter', placeholder: 'Embarque' }}>Emb</TableHeaderColumn>                
                <TableHeaderColumn row='3' dataField='sugCancelProducao' editable={false} width='60' dataSort filter={{ type: 'TextFilter', placeholder: 'Sugestão' }}>S.C</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='rank' editable={false} dataAlign="right" dataSort>Rank</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdePrevisao' editable={false} dataAlign="right" dataSort>Prev</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeEstoque' editable={false} dataAlign="right" dataSort>Estq</TableHeaderColumn>

                <TableHeaderColumn row='3' dataField='qtdeDemPlano1' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeProcPlano1' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeSaldoPlano1' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='3' dataField='qtdeDemPlano2' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeProcPlano2' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeSaldoPlano2' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='3' dataField='qtdeDemPlano3' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeProcPlano3' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeSaldoPlano3' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='3' dataField='qtdeDemPlano4' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeProcPlano4' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeSaldoPlano4' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='3' dataField='qtdeDemPlano5' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeProcPlano5' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeSaldoPlano5' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='3' dataField='qtdeDemPlano6' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeProcPlano6' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeSaldoPlano6' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='3' dataField='qtdeDemPlano7' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeProcPlano7' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeSaldoPlano7' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='3' dataField='qtdeDemPlano8' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeProcPlano8' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeSaldoPlano8' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='3' dataField='qtdeDemAcumulado' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeProcAcumulado' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeSaldoAcumulado' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='3' dataField='qtdeDemAcumProg' editable={false} dataAlign="right" dataSort>Dem</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeProcAcumProg' editable={false} dataAlign="right" dataSort>Proc</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeSaldoAcumProg' editable={false} dataAlign="right" dataSort>Saldo</TableHeaderColumn>

                <TableHeaderColumn row='3' dataField='qtdeSugestao' editable={false} dataAlign="right" dataSort>Sug</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeEqualizadoSugestao' editable={false} dataAlign="right" dataSort>Equal</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeDiferencaSugestao' editable={false} dataAlign="right" dataSort>Dif</TableHeaderColumn>
                <TableHeaderColumn row='3' dataField='qtdeProgramada' editable={{ type: 'number' }} width='110' dataAlign="right" dataSort>Prog</TableHeaderColumn>

            </BootstrapTable>
        );
    }
}