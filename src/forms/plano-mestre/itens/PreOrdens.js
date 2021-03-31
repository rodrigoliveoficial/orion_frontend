import React, { useEffect, useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import { useFormik } from 'formik';
import Select from 'react-select';
import api from '../../../services/api';
import PreOrdensTable from './PreOrdensTable';

const optionsAgrupaOpPorRefer = [
    { value: 0, label: 'Não' },
    { value: 1, label: 'Sim' }
]

const initialValues = {
    agrupaOpPorRefer: 1,
    qtdeMaximaOP: 0,
    qtdeMinimaOP: 0,
    periodoOP: 0,
    depositoOP: 0,
    observacaoOP: ''
}

const FormPreOrdens = (props) => {

    const [agrupaOpPorRefer, setAgrupaOpPorRefer] = useState(1);
    const [loading, setLoading] = useState(false);
    const [body, setBody] = useState([]);
    const [dadosPreOrdens, setDadosPreOrdens] = useState([]);
    const [itensSelected, setItensSelected] = useState([]);
    
    const [depositoOP, setDepositoOP] = useState([]);

    const [agruparInfo, setAgruparInfo] = useState([]);
    const [qtdeMaxInfo, setQtdeMaxInfo] = useState([]);
    const [qtdeMinInfo, setQtdeMinInfo] = useState([]);
    const [periodoInfo, setPeriodoInfo] = useState([]);
    const [depositoInfo, setDepositoInfo] = useState([]);
    const [observacaoInfo, setObservacaoInfo] = useState([]);

    const { idPlanoMestre } = props;
    const { depositos } = props;

    const {
        handleChange,
        setFieldValue,
        values
    } = useFormik({
        initialValues: initialValues
    });

    useEffect(() => {

        const loadParametros = () => {

            api.get(`plano-mestre/parametros/${idPlanoMestre}`).then((response) => {

                setFieldValue('agrupaOpPorRefer', response.data.agrupaOpPorRefer);
                setFieldValue('qtdeMaximaOP', response.data.qtdeMaximaOP);
                setFieldValue('qtdeMinimaOP', response.data.qtdeMinimaOP);
                setFieldValue('periodoOP', response.data.periodoOP);
                setFieldValue('depositoOP', response.data.depositoOP);
                setFieldValue('observacaoOP', response.data.observacaoOP);

                setAgrupaOpPorRefer(optionsAgrupaOpPorRefer.find(o => o.value === response.data.agrupaOpPorRefer));
                setDepositoOP(depositos.find(o => o.value === response.data.depositoOP));

                setAgruparInfo(response.data.agrupaOpPorRefer);
                setQtdeMaxInfo(response.data.qtdeMaximaOP);
                setQtdeMinInfo(response.data.qtdeMinimaOP);
                setPeriodoInfo(response.data.periodoOP);
                setDepositoInfo(response.data.depositoOP);
                setObservacaoInfo(response.data.observacaoOP);

            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
                setAgrupaOpPorRefer(optionsAgrupaOpPorRefer.find(o => o.value === 1));

                setAgruparInfo(1);
                setQtdeMaxInfo(0);
                setQtdeMinInfo(0);
                setPeriodoInfo(0);
                setDepositoInfo(0);
                setObservacaoInfo('');
            });
        };

        const loadPreOrdens = () => {
            api.get(`plano-mestre/pre-ordens/${idPlanoMestre}`).then((response) => {
                setDadosPreOrdens(response.data);
            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
                setDadosPreOrdens([]);
            });
        };
        
        loadParametros();
        loadPreOrdens();

    }, [idPlanoMestre, setFieldValue, depositos]);

    useEffect(() => {

        const obterParametros = () => {
            setBody({
                idPlanoMestre: idPlanoMestre,
                agrupaOpPorRefer: agruparInfo,
                qtdeMaximaOP: qtdeMaxInfo,
                qtdeMinimaOP: qtdeMinInfo,
                periodoOP: periodoInfo,
                depositoOP: depositoInfo,
                observacaoOP: observacaoInfo
            });

        };

        obterParametros();

    }, [idPlanoMestre, agruparInfo, qtdeMaxInfo, qtdeMinInfo, periodoInfo, depositoInfo, observacaoInfo]);

    const gerarPreOrdens = async event => {

        setLoading(true);
        setItensSelected([]);

        try {
            const response = await api.post('plano-mestre/pre-ordens/gerar', body);
            setDadosPreOrdens(response.data);
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
            setDadosPreOrdens([]);
        }

        setLoading(false);
    };

    const onRowSelect = ({ id }, isSelected) => {
        if (isSelected) {
            setItensSelected([...itensSelected, id].sort());
        } else {
            setItensSelected(itensSelected.filter(it => it !== id));
        }
        return false;
    };

    const onSelectAll = (isSelected) => {
        if (!isSelected) {
            setItensSelected([]);
        } else {
            setItensSelected(dadosPreOrdens.map(d => d.id));
        }

        return isSelected;
    }

    const selectRowPropAux = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: onRowSelect,
        onSelectAll: onSelectAll,
        selected: itensSelected,
        bgColor: 'rgb(193, 219, 238)'
    };

    return (
        <div>
            <br></br>
            <Form id="aba-pre-ordens-form" noValidate>
                <Form.Row>
                    <Form.Group as={Col} md="1" controlId="cor">
                        <Form.Label>
                            Agrupar por Referência
                        </Form.Label>
                        <Select className="basic-multi-select" classNamePrefix="select"
                            name="agrupaOpPorRefer"
                            options={optionsAgrupaOpPorRefer}
                            value={agrupaOpPorRefer}
                            onChange={(selected) => {
                                setAgrupaOpPorRefer(selected);
                                setAgruparInfo(selected.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="qtdeMaximaOP">
                        <Form.Label>
                            Qtde Máxima por Ordem
                        </Form.Label>

                        <Form.Control
                            type="number"
                            maxLength="9999"
                            name="qtdeMaximaOP"
                            value={values.qtdeMaximaOP}
                            onChange={handleChange}
                            onBlur={() => {
                                setQtdeMaxInfo(values.qtdeMaximaOP);
                            }}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="qtdeMinimaOP">
                        <Form.Label>
                            Qtde Mínima por Ordem
                        </Form.Label>

                        <Form.Control
                            type="number"
                            maxLength="9999"
                            name="qtdeMinimaOP"
                            value={values.qtdeMinimaOP}
                            onChange={handleChange}
                            onBlur={() => {
                                setQtdeMinInfo(values.qtdeMinimaOP);
                            }}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="periodoOP">
                        <Form.Label>
                            Período de Produção
                        </Form.Label>

                        <Form.Control
                            type="number"
                            maxLength="9999"
                            name="periodoOP"
                            value={values.periodoOP}
                            onChange={handleChange}
                            onBlur={() => {
                                setPeriodoInfo(values.periodoOP);
                            }}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="deposito">
                        <Form.Label>
                            Depósito de Entrada de Peças
                        </Form.Label>

                        <Select className="basic-select" classNamePrefix="select" placeholder="Informe o depósito de entrada de peças."
                            name="deposito"
                            value={depositoOP}
                            options={depositos}
                            onChange={(selected) => {
                                setDepositoOP(selected);
                                setDepositoInfo(selected.value);
                            }}
                        />
                    </Form.Group>

                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="observacaoOP">
                        <Form.Label>
                            Observação das Ordens
                        </Form.Label>

                        <Form.Control
                            type="text"
                            maxLength="60"
                            name="observacaoOP"
                            autoComplete="off"
                            value={values.observacaoOP}
                            onChange={handleChange}
                            onBlur={() => {
                                setObservacaoInfo(values.observacaoOP);
                            }}
                        />
                    </Form.Group>
                </Form.Row>

                <Button
                    variant="primary" disabled={loading}
                    onClick={gerarPreOrdens}
                >
                    {loading ?
                        <Spinner
                            show="false"
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : ''}

                    Gerar Pré-Ordens
                </Button>
            </Form>

            <br></br>

            <PreOrdensTable
                {...props}
                dadosPreOrdens={dadosPreOrdens}
                selectRowPropAux={selectRowPropAux}
            />

        </div >
    );

}

export default FormPreOrdens;