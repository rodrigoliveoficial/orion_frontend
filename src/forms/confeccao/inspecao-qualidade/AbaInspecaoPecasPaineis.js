import React, { useEffect, useState } from "react";
import { Form, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';
import Accordion from 'react-bootstrap/Accordion';
import api from '../../../services/api';
import DeleteDialog from '../../../components/alert/DeleteDialog';
import AbaInspecaoPecasPaineisItens from './AbaInspecaoPecasPaineisItens';
import AbaInspecaoPecasPaineisLancto from './AbaInspecaoPecasPaineisLancto';

const normalizeDados = (dados) => {
    return dados.map((c) => {
        return {
            id: c.id,
            data: format(parseISO(c.data), 'dd/MM/yyyy'),
            turno: c.turno,
            usuario: c.usuario,
            percInspecionarPcs: c.percInspecionarPcs,
            qtdeInspecionarPcs: c.qtdeInspecionarPcs,
            qtdeInspecionadaPcs: c.qtdeInspecionadaPcs,
            qtdeRejeitadaPcs: c.qtdeRejeitadaPcs,
            percRejeitadaPcs: c.percRejeitadaPcs
        };
    });
};

const normalizeLanctos = (dados) => {
    return dados.map((c) => {
        return {
            id: c.id,
            motivo: c.motivo,
            estagio: c.estagio,
            usuario: c.usuario,
            dataHora: format(parseISO(c.dataHora), 'dd/MM/yyyy hh:mm:ss'),
            quantidade: c.quantidade
        };
    });
};

const initialValues = {
    idInspecao: 0,
    percInspecao: null,
    qtdeInspecionar: 0,
    qtdeInspecionada: 0,
    qtdeRejeitada: 0,
    percRejeicao: 0,
    motivo: null,
    estagioMotivo: '',
    quantidade: 0
}

const percentuais = [
    { value: 10, label: '10 %' },
    { value: 20, label: '20 %' },
    { value: 30, label: '30 %' },
    { value: 40, label: '40 %' },
    { value: 50, label: '50 %' },
    { value: 60, label: '60 %' },
    { value: 70, label: '70 %' },
    { value: 80, label: '80 %' },
    { value: 90, label: '90 %' },
    { value: 100, label: '100 %' }
];

const AbaInspecaoPecasPaineis = (props) => {

    const [percInspecao, setPercInspecao] = useState(null);
    const [motivo, setMotivo] = useState(null);
    const [disabledLctoMotivo, setDisabledLctoMotivo] = useState(true);
    const [disabledPercInspecao, setDisabledPercInspecao] = useState(true);
    const [dataInspecoesPecas, setDataInspecoesPecas] = useState([]);
    const [dataLancamentos, setDataLancamentos] = useState([]);
    const [idInspecaoSelecionado, setIdInspecaoSelecionado] = useState(0);
    const [idLancamentoSelecionado, setIdLancamentoSelecionado] = useState(0);    
    const [showDeleteAlertInspecao, setShowDeleteAlertInspecao] = useState(false);
    const [showDeleteAlertLancto, setShowDeleteAlertLancto] = useState(false);

    const [disabledButtonExcluirInspecao, setDisabledButtonExcluirInspecao] = useState(true);
    const [disabledButtonExcluirLancto, setDisabledButtonExcluirLancto] = useState(true);

    const { turno } = props;
    const { estagio } = props;
    const { motivos } = props;
    const { periodo } = props;
    const { data } = props;
    const { ordemProducao } = props;
    const { ordemConfeccao } = props;
    const { estagiosMotivos } = props;
    const { qtdeOrdemConfeccao } = props;
    const { nomeUsuario } = props;

    const {
        handleChange,
        setFieldValue,
        values
    } = useFormik({
        initialValues: initialValues
    });

    const obterListaInspecoes = (ordemProducao, ordemConfeccao, codEstagio) => {
        api.get(`inspecao-qualidade/inspecoes-ordem-estagio/${ordemProducao}/${ordemConfeccao}/${codEstagio}`).then((response) => {
            setDataInspecoesPecas(normalizeDados(response.data));
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
        });
    }

    useEffect(() => {
        setDisabledLctoMotivo(true);
        if ((estagio > 0) && (ordemProducao > 0) && (ordemConfeccao > 0) && (values.percInspecao !== null) && (values.quantidade > 0) && (values.motivo !== null))
            setDisabledLctoMotivo(false);
    }, [estagio, ordemProducao, ordemConfeccao, values]);

    useEffect(() => {
        setDisabledPercInspecao(true);
        if (values.idInspecao === 0) setDisabledPercInspecao(false);
    }, [values.idInspecao]);

    useEffect(() => {
        if ((ordemProducao > 0) && (ordemConfeccao > 0) && (estagio > 0)) {
            obterListaInspecoes(ordemProducao, ordemConfeccao, estagio);
        }
    }, [ordemProducao, ordemConfeccao, estagio]);

    useEffect(() => {
        
        setDisabledButtonExcluirInspecao(true);
        
        if (idInspecaoSelecionado > 0) {

            setDisabledButtonExcluirInspecao(false);

            api.get(`inspecao-qualidade/inspecao/${idInspecaoSelecionado}`).then((response) => {
                console.log(response.data);
                setFieldValue('idInspecao', response.data.id);
                setFieldValue('percInspecao', response.data.percInspecionarPcs);
                setFieldValue('qtdeInspecionar', response.data.qtdeInspecionarPcs);
                setFieldValue('qtdeInspecionada', response.data.qtdeInspecionadaPcs);
                setFieldValue('qtdeRejeitada', response.data.qtdeRejeitadaPcs);
                setFieldValue('percRejeicao', response.data.percRejeitadaPcs);
                setPercInspecao(percentuais.find(o => o.value === response.data.percInspecionarPcs));
            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
            });

            api.get(`inspecao-qualidade/lanctos-pecas/${idInspecaoSelecionado}`).then((response) => {
                console.log(response.data);
                setDataLancamentos(normalizeLanctos(response.data));
            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
            });
        }
    }, [idInspecaoSelecionado, setFieldValue]);

    const onClickNovaInspecao = () => {
        setFieldValue('idInspecao', 0);
        setFieldValue('percInspecao', null);
        setFieldValue('qtdeInspecionar', 0);
        setFieldValue('qtdeInspecionada', 0);
        setFieldValue('qtdeRejeitada', 0);
        setFieldValue('percRejeicao', 0);
        setFieldValue('motivo', null);
        setFieldValue('estagioMotivo', '');
        setFieldValue('quantidade', 0);
        setMotivo(null);
        setPercInspecao(null);
        setDataLancamentos([]);
    };

    const formatDate = (data) => {
        let dataFormat = new Date(data);
        return ((dataFormat.getDate() + 1)) + "-" + ((dataFormat.getMonth() + 1)) + "-" + dataFormat.getFullYear();
    };

    const onRowSelect = ({ id }, isSelected) => {
        setIdInspecaoSelecionado(0);
        if (isSelected) setIdInspecaoSelecionado(id);
    };

    const onRowSelectLancto = ({ id }, isSelected) => {
        setIdLancamentoSelecionado(0);
        if (isSelected) setIdLancamentoSelecionado(id);
    };

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: onRowSelect,
        bgColor: 'rgb(193, 219, 238)'
    };

    const selectRowLancto = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: onRowSelectLancto,
        bgColor: 'rgb(193, 219, 238)'
    };

    const onClickLancarMotivo = () => {

        const capa = ({
            id: values.idInspecao,
            turno: turno,
            usuario: nomeUsuario,
            codEstagio: estagio,
            periodo: periodo,
            ordemProducao: ordemProducao,
            ordemConfeccao: ordemConfeccao,
            percInspecionarPcs: values.percInspecao,
            qtdeInspecionarPcs: values.qtdeInspecionar,
            qtdeInspecionadaPcs: values.qtdeInspecionada,
            qtdeRejeitadaPcs: values.qtdeRejeitada,
            percRejeitadaPcs: values.percRejeicao
        });

        const item = ({
            id: 0,
            idInspecao: values.idInspecao,
            codMotivo: values.motivo,
            quantidade: values.quantidade,
            usuario: nomeUsuario
        });

        const body = ({
            dataInspecao: formatDate(data),
            inspecaoQualidade: capa,
            inspecaoQualidadeLanctoPeca: item
        });

        api.post('inspecao-qualidade/salvar-inspecao-peca', body).then((response) => {
            console.log(response.data);
            setFieldValue('idInspecao', response.data.id);
            setFieldValue('qtdeInspecionada', response.data.qtdeInspecionadaPcs);
            setFieldValue('qtdeRejeitada', response.data.qtdeRejeitadaPcs);
            setFieldValue('percRejeicao', response.data.percRejeitadaPcs);
            setFieldValue('motivo', null);
            setFieldValue('estagioMotivo', '');
            setFieldValue('quantidade', 0);
            setMotivo(null);

            obterListaInspecoes(ordemProducao, ordemConfeccao, estagio);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
        });
    };

    const deleteInspecao = () => {

    }

    const deleteLancamento = () => {

    }

    return (
        <div>
            <br></br>
            <Form id="aba-dados-gerais-form" noValidate>

                <Form.Row>
                    <Button onClick={onClickNovaInspecao}>
                        Nova Inspeção
                    </Button>
                </Form.Row>

                <br />

                <Form.Row>
                    <Form.Group as={Col} md="1" controlId="id-inspecao">
                        <Form.Label>
                            ID Inspeção
                        </Form.Label>

                        <Form.Control
                            type="number"
                            name="idInspecao"
                            disabled
                            value={values.idInspecao}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="perc-inspecao">
                        <Form.Label>
                            % Inspeção
                        </Form.Label>
                        <Select className="basic-multi-select" classNamePrefix="select" placeholder="% inspeção"
                            name="percInspecao"
                            options={percentuais}
                            value={percInspecao}
                            isDisabled={disabledPercInspecao}
                            onChange={(selected) => {
                                let qtdeInspecionarCalc = (selected.value / 100) * qtdeOrdemConfeccao;
                                setPercInspecao(selected);
                                setFieldValue('percInspecao', selected.value);
                                setFieldValue('qtdeInspecionar', qtdeInspecionarCalc.toFixed(0));
                            }}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="qtde-inspecionar">
                        <Form.Label>
                            Qtde Inspecionar
                        </Form.Label>

                        <Form.Control
                            type="number"
                            name="qtdeInspecionar"
                            disabled
                            value={values.qtdeInspecionar}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="qtde-inspecionada">
                        <Form.Label>
                            Qtde Inspecionada
                        </Form.Label>

                        <Form.Control
                            type="number"
                            name="qtdeInspecionada"
                            disabled
                            value={values.qtdeInspecionada}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="qtde-rejeitada">
                        <Form.Label>
                            Qtde Rejeitada
                        </Form.Label>

                        <Form.Control
                            type="number"
                            name="qtdeRejeitada"
                            disabled
                            value={values.qtdeRejeitada}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="perc-rejeicao">
                        <Form.Label>
                            % Rejeição
                        </Form.Label>

                        <Form.Control
                            type="number"
                            name="percRejeicao"
                            disabled
                            value={values.percRejeicao}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="motivo">
                        <Form.Label>
                            Motivo
                        </Form.Label>
                        <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o motivo da rejeição"
                            name="motivo"
                            options={motivos}
                            value={motivo}
                            onChange={(selected) => {
                                setMotivo(selected);
                                setFieldValue('motivo', selected.value);
                                setFieldValue('estagioMotivo', estagiosMotivos.find(o => o.value === selected.value).label);
                            }}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="2" controlId="estagio">
                        <Form.Label>
                            Estagio Defeito
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="estagioMotivo"
                            disabled
                            value={values.estagioMotivo}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="1" controlId="quantidade">
                        <Form.Label>
                            Quantidade Ordem
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="quantidade"
                            value={values.quantidade}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Button variant="success" disabled={disabledLctoMotivo} onClick={onClickLancarMotivo}>
                        Gravar Motivo
                    </Button>

                    <Button disabled={disabledButtonExcluirLancto} variant="danger">
                        Excluir Motivo
                    </Button>
                </Form.Row>

                <Form.Row>
                    <AbaInspecaoPecasPaineisLancto
                        {...props}
                        selectRowLancto={selectRowLancto}
                        dataLancamentos={dataLancamentos}
                    />
                </Form.Row>

                <Accordion>
                    <Accordion.Toggle
                        eventKey="0"
                        as={(p) => {
                            return (
                                <div style={{ display: 'inline-flex', width: '100%' }}>
                                    <i
                                        style={{ lineHeight: '3.4em' }}
                                        className="fa fa-chevron-down"
                                        onClick={p.onClick}
                                    />
                                </div>
                            );
                        }}
                    />

                    <Accordion.Collapse eventKey="0">
                        <div>

                            <h3>Inspeções Registradas:</h3>
                            <br></br>

                            <Form.Row>
                                <Button disabled={disabledButtonExcluirInspecao} variant="danger" onClick={() => { setShowDeleteAlertInspecao(true) }}>
                                    Excluir Inspeção
                                </Button>
                            </Form.Row>

                            <Form.Row>
                                <AbaInspecaoPecasPaineisItens
                                    {...props}
                                    selectRow={selectRow}
                                    dataInspecoesPecas={dataInspecoesPecas}
                                />
                            </Form.Row>
                        </div>
                    </Accordion.Collapse>
                </Accordion>

                {showDeleteAlertInspecao && (
                    <DeleteDialog
                        title='Deseja excluir o registro de inspeção selecionado?'
                        handleCancel={() => setShowDeleteAlertInspecao(false)}
                        handleDelete={deleteInspecao}
                    />
                )}

            </Form>
        </div>
    );
}

AbaInspecaoPecasPaineis.propTypes = {
    setData: PropTypes.func,
    setTurno: PropTypes.func,
    setEstagio: PropTypes.func,
    setPeriodo: PropTypes.func,
    setOrdemProducao: PropTypes.func,
    setQtdeOrdemProducao: PropTypes.func,
    setOrdemConfeccao: PropTypes.func,
    setQtdeOrdemConfeccao: PropTypes.func,
    setReferencia: PropTypes.func,
    setTamanho: PropTypes.func,
    setCor: PropTypes.func
};

AbaInspecaoPecasPaineis.defaultProps = {
    setData: () => { },
    setTurno: () => { },
    setEstagio: () => { },
    setPeriodo: () => { },
    setOrdemProducao: () => { },
    setQtdeOrdemProducao: () => { },
    setOrdemConfeccao: () => { },
    setQtdeOrdemConfeccao: () => { },
    setReferencia: () => { },
    setTamanho: () => { },
    setCor: () => { }
};

export default AbaInspecaoPecasPaineis;
