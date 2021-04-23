import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';
import { InputGroup } from "react-bootstrap";
import Select from 'react-select';
import * as yup from 'yup';
import { useFormik } from 'formik';
import api from '../../../services/api';

const loadDepositos = () => api.get('depositos');

const normalizePedidos = (dados) => {
    return dados.map((c) => {
        return {
            value: c.pedidoVenda,
            label: c.pedidoVenda
        };
    });
};

const normalizeDados = (dados) => {
    return dados.map((c) => {
        return {
            value: c.id,
            label: `${c.id} - ${c.descricao}`
        };
    });
};

const options = [
    { value: 0, label: 'Não' },
    { value: 1, label: 'Sim' }
]

const schema = yup.object().shape({
    demInicio1: yup.number().integer().max(9999),
    demInicio2: yup.number().integer().max(9999),
    demInicio3: yup.number().integer().max(9999),
    demInicio4: yup.number().integer().max(9999),
    demInicio5: yup.number().integer().max(9999),
    demInicio6: yup.number().integer().max(9999),
    demInicio7: yup.number().integer().max(9999),
    demInicio8: yup.number().integer().max(9999),
    demFim1: yup.number().integer().max(9999),
    demFim2: yup.number().integer().max(9999),
    demFim3: yup.number().integer().max(9999),
    demFim4: yup.number().integer().max(9999),
    demFim5: yup.number().integer().max(9999),
    demFim6: yup.number().integer().max(9999),
    demFim7: yup.number().integer().max(9999),
    demFim8: yup.number().integer().max(9999),
    procInicio1: yup.number().integer().max(9999),
    procInicio2: yup.number().integer().max(9999),
    procInicio3: yup.number().integer().max(9999),
    procInicio4: yup.number().integer().max(9999),
    procInicio5: yup.number().integer().max(9999),
    procInicio6: yup.number().integer().max(9999),
    procInicio7: yup.number().integer().max(9999),
    procInicio8: yup.number().integer().max(9999),
    procFim1: yup.number().integer().max(9999),
    procFim2: yup.number().integer().max(9999),
    procFim3: yup.number().integer().max(9999),
    procFim4: yup.number().integer().max(9999),
    procFim5: yup.number().integer().max(9999),
    procFim6: yup.number().integer().max(9999),
    procFim7: yup.number().integer().max(9999),
    procFim8: yup.number().integer().max(9999),
});

const initialValues = {
    demInicio1: 0,
    demInicio2: 0,
    demInicio3: 0,
    demInicio4: 0,
    demInicio5: 0,
    demInicio6: 0,
    demInicio7: 0,
    demInicio8: 0,
    demFim1: 0,
    demFim2: 0,
    demFim3: 0,
    demFim4: 0,
    demFim5: 0,
    demFim6: 0,
    demFim7: 0,
    demFim8: 0,
    procInicio1: 0,
    procInicio2: 0,
    procInicio3: 0,
    procInicio4: 0,
    procInicio5: 0,
    procInicio6: 0,
    procInicio7: 0,
    procInicio8: 0,
    procFim1: 0,
    procFim2: 0,
    procFim3: 0,
    procFim4: 0,
    procFim5: 0,
    procFim6: 0,
    procFim7: 0,
    procFim8: 0,
    consideraDeposito: 1,
    mostraProdSemDepo: 1,
    mostraProdSemProc: 1,
    consideraPedBloqu: 1,
    mostraProdSemPedi: 1
};

const AbaPlanejamento = (props) => {

    const [consideraDepositoParam, setConsideraDepositoParam] = useState(0);
    const [mostraProdSemDepoParam, setMostraProdSemDepoParam] = useState(0);
    const [mostraProdSemProcParam, setMostraProdSemProcParam] = useState(0);
    const [consideraPedBloquParam, setConsideraPedBloquParam] = useState(0);
    const [mostraProdSemPediParam, setMostraProdSemPediParam] = useState(0);
    const [depositosParam, setDepositosParam] = useState([]);
    const [pedidosParam, setPedidosParam] = useState([]);

    const [depositos, setDepositos] = useState([]);
    const [pedidos, setPedidos] = useState([]);

    const [perDemInicio1, setPerDemInicio1] = useState([]);
    const [perDemInicio2, setPerDemInicio2] = useState([]);
    const [perDemInicio3, setPerDemInicio3] = useState([]);
    const [perDemInicio4, setPerDemInicio4] = useState([]);
    const [perDemInicio5, setPerDemInicio5] = useState([]);
    const [perDemInicio6, setPerDemInicio6] = useState([]);
    const [perDemInicio7, setPerDemInicio7] = useState([]);
    const [perDemInicio8, setPerDemInicio8] = useState([]);
    const [perDemFim1, setPerDemFim1] = useState([]);
    const [perDemFim2, setPerDemFim2] = useState([]);
    const [perDemFim3, setPerDemFim3] = useState([]);
    const [perDemFim4, setPerDemFim4] = useState([]);
    const [perDemFim5, setPerDemFim5] = useState([]);
    const [perDemFim6, setPerDemFim6] = useState([]);
    const [perDemFim7, setPerDemFim7] = useState([]);
    const [perDemFim8, setPerDemFim8] = useState([]);
    const [perProcInicio1, setPerProcInicio1] = useState([]);
    const [perProcInicio2, setPerProcInicio2] = useState([]);
    const [perProcInicio3, setPerProcInicio3] = useState([]);
    const [perProcInicio4, setPerProcInicio4] = useState([]);
    const [perProcInicio5, setPerProcInicio5] = useState([]);
    const [perProcInicio6, setPerProcInicio6] = useState([]);
    const [perProcInicio7, setPerProcInicio7] = useState([]);
    const [perProcInicio8, setPerProcInicio8] = useState([]);
    const [perProcFim1, setPerProcFim1] = useState([]);
    const [perProcFim2, setPerProcFim2] = useState([]);
    const [perProcFim3, setPerProcFim3] = useState([]);
    const [perProcFim4, setPerProcFim4] = useState([]);
    const [perProcFim5, setPerProcFim5] = useState([]);
    const [perProcFim6, setPerProcFim6] = useState([]);
    const [perProcFim7, setPerProcFim7] = useState([]);
    const [perProcFim8, setPerProcFim8] = useState([]);

    const [perDemandaInicial, setPerDemandaInicial] = useState(0);
    const [perDemandaFinal, setPerDemandaFinal] = useState(0);

    const { periodosDemanda } = props;
    const { periodosProducao } = props;

    const load = () => {

        Promise.all([
            loadDepositos()
        ])
            .then(([
                responseDepositos
            ]) => {
                setDepositos(normalizeDados(responseDepositos.data));
            })
            .catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
            });
    };

    // TODO - Manter apenas os campos que devem ter o valor default
    const setParametrosGlobalDefault = () => {
        props.setPerDemInico1Info(2001);
        props.setPerDemInico2Info(2052);
        props.setPerDemInico3Info(2053);
        props.setPerDemInico4Info(2101);
        props.setPerDemInico5Info(2102);
        props.setPerDemInico6Info(2103);
        props.setPerDemInico7Info(2104);
        props.setPerDemInico8Info(2105);
        props.setPerDemFim1Info(2051);
        props.setPerDemFim2Info(2052);
        props.setPerDemFim3Info(2053);
        props.setPerDemFim4Info(2101);
        props.setPerDemFim5Info(2102);
        props.setPerDemFim6Info(2103);
        props.setPerDemFim7Info(2104);
        props.setPerDemFim8Info(2140);
        props.setPerProcInico1Info(5001);
        props.setPerProcInico2Info(5052);
        props.setPerProcInico3Info(5053);
        props.setPerProcInico4Info(5101);
        props.setPerProcInico5Info(5102);
        props.setPerProcInico6Info(5103);
        props.setPerProcInico7Info(5104);
        props.setPerProcInico8Info(5105);
        props.setPerProcFim1Info(5051);
        props.setPerProcFim2Info(5052);
        props.setPerProcFim3Info(5053);
        props.setPerProcFim4Info(5101);
        props.setPerProcFim5Info(5102);
        props.setPerProcFim6Info(5103);
        props.setPerProcFim7Info(5104);
        props.setPerProcFim8Info(5140);
        props.setConsideraDepositoSelected(1);
        props.setMostraProdSemDepoSelected(1);
        props.setMostraProdSemProcSelected(1);
        props.setConsideraPedBloquSelected(1);
        props.setMostraProdSemPediSelected(1);
    };

    const {
        handleChange,
        setFieldValue,
        values
    } = useFormik({
        validationSchema: schema,
        validateOnChange: true,
        validateOnBlur: true,
        initialValues: initialValues
    });

    const getPedidos = (inicio, fim) => {
        if (inicio > 0 && fim > 0) {
            api.get(`pedidos/${inicio}/${fim}`).then((response) => {
                setPedidos(normalizePedidos(response.data));
            }).catch((e) => {
                setPedidos([]);
                console.log('ocorreu algum erro!');
                console.error(e);
            }).finally();
        }
    }

    useEffect(() => {
        getPedidos(perDemandaInicial, perDemandaFinal);
    }, [perDemandaInicial, perDemandaFinal]);

    useEffect(() => {
        setConsideraDepositoParam(options.find(o => o.value === 1));
        setMostraProdSemDepoParam(options.find(o => o.value === 1));
        setMostraProdSemProcParam(options.find(o => o.value === 1));
        setConsideraPedBloquParam(options.find(o => o.value === 1));
        setMostraProdSemPediParam(options.find(o => o.value === 1));
        setParametrosGlobalDefault();
        load();
    }, []);

    return (
        <Form id="aba-planejamento-form" noValidate>
            <div>

                <br></br>

                <h4>
                    Horizonte de Planejamento
                </h4>

                <Form.Row>
                    <InputGroup>
                        <InputGroup.Text>Plano 1</InputGroup.Text>
                        <InputGroup.Text>Demanda</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="demInicio1">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo inicio"
                                name="demInicio1"
                                options={periodosDemanda}
                                value={perDemInicio1}
                                onChange={(selected) => {
                                    setPerDemInicio1(selected)
                                    props.setPerDemInico1Info(selected.value);
                                    setPerDemandaInicial(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>até</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="demFim1">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo fim"
                                name="demFim1"
                                options={periodosDemanda}
                                value={perDemFim1}
                                onChange={(selected) => {
                                    setPerDemFim1(selected)
                                    props.setPerDemFim1Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>Processo</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="procInicio1">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo inicio"
                                name="procInicio1"
                                options={periodosProducao}
                                value={perProcInicio1}
                                onChange={(selected) => {
                                    setPerProcInicio1(selected)
                                    props.setPerProcInico1Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>até</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="procFim1">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo fim"
                                name="procFim1"
                                options={periodosProducao}
                                value={perProcFim1}
                                onChange={(selected) => {
                                    setPerProcFim1(selected)
                                    props.setPerProcFim1Info(selected.value);
                                }}
                            />
                        </Form.Group>
                    </InputGroup>
                </Form.Row>

                <Form.Row>
                    <InputGroup>
                        <InputGroup.Text>Plano 2</InputGroup.Text>
                        <InputGroup.Text>Demanda</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="demInicio2">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo inicio"
                                name="demInicio2"
                                options={periodosDemanda}
                                value={perDemInicio2}
                                onChange={(selected) => {
                                    setPerDemInicio2(selected)
                                    props.setPerDemInico2Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>até</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="demFim2">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo fim"
                                name="demFim2"
                                options={periodosDemanda}
                                value={perDemFim2}
                                onChange={(selected) => {
                                    setPerDemFim2(selected)
                                    props.setPerDemFim2Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>Processo</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="procInicio2">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo inicio"
                                name="procInicio2"
                                options={periodosProducao}
                                value={perProcInicio2}
                                onChange={(selected) => {
                                    setPerProcInicio2(selected)
                                    props.setPerProcInico2Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>até</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="procFim2">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo fim"
                                name="procFim2"
                                options={periodosProducao}
                                value={perProcFim2}
                                onChange={(selected) => {
                                    setPerProcFim2(selected)
                                    props.setPerProcFim2Info(selected.value);
                                }}
                            />
                        </Form.Group>
                    </InputGroup>
                </Form.Row>

                <Form.Row>
                    <InputGroup>
                        <InputGroup.Text>Plano 3</InputGroup.Text>
                        <InputGroup.Text>Demanda</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="demInicio3">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo inicio"
                                name="demInicio3"
                                options={periodosDemanda}
                                value={perDemInicio3}
                                onChange={(selected) => {
                                    setPerDemInicio3(selected)
                                    props.setPerDemInico3Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>até</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="demFim3">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo fim"
                                name="demFim3"
                                options={periodosDemanda}
                                value={perDemFim3}
                                onChange={(selected) => {
                                    setPerDemFim3(selected)
                                    props.setPerDemFim3Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>Processo</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="procInicio3">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo inicio"
                                name="procInicio3"
                                options={periodosProducao}
                                value={perProcInicio3}
                                onChange={(selected) => {
                                    setPerProcInicio3(selected)
                                    props.setPerProcInico3Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>até</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="procFim3">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo fim"
                                name="procFim3"
                                options={periodosProducao}
                                value={perProcFim3}
                                onChange={(selected) => {
                                    setPerProcFim3(selected)
                                    props.setPerProcFim3Info(selected.value);
                                }}
                            />
                        </Form.Group>
                    </InputGroup>
                </Form.Row>

                <Form.Row>
                    <InputGroup>
                        <InputGroup.Text>Plano 4</InputGroup.Text>
                        <InputGroup.Text>Demanda</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="demInicio4">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo inicio"
                                name="demInicio4"
                                options={periodosDemanda}
                                value={perDemInicio4}
                                onChange={(selected) => {
                                    setPerDemInicio4(selected)
                                    props.setPerDemInico4Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>até</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="demFim4">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo fim"
                                name="demFim4"
                                options={periodosDemanda}
                                value={perDemFim4}
                                onChange={(selected) => {
                                    setPerDemFim4(selected)
                                    props.setPerDemFim4Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>Processo</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="procInicio4">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo inicio"
                                name="procInicio4"
                                options={periodosProducao}
                                value={perProcInicio4}
                                onChange={(selected) => {
                                    setPerProcInicio4(selected)
                                    props.setPerProcInico4Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>até</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="procFim4">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo fim"
                                name="procFim4"
                                options={periodosProducao}
                                value={perProcFim4}
                                onChange={(selected) => {
                                    setPerProcFim4(selected)
                                    props.setPerProcFim4Info(selected.value);
                                }}
                            />
                        </Form.Group>
                    </InputGroup>
                </Form.Row>

                <Form.Row>
                    <InputGroup>
                        <InputGroup.Text>Plano 5</InputGroup.Text>
                        <InputGroup.Text>Demanda</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="demInicio5">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo inicio"
                                name="demInicio5"
                                options={periodosDemanda}
                                value={perDemInicio5}
                                onChange={(selected) => {
                                    setPerDemInicio5(selected)
                                    props.setPerDemInico5Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>até</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="demFim5">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo fim"
                                name="demFim5"
                                options={periodosDemanda}
                                value={perDemFim5}
                                onChange={(selected) => {
                                    setPerDemFim5(selected)
                                    props.setPerDemFim5Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>Processo</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="procInicio5">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo inicio"
                                name="procInicio5"
                                options={periodosProducao}
                                value={perProcInicio5}
                                onChange={(selected) => {
                                    setPerProcInicio5(selected)
                                    props.setPerProcInico5Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>até</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="procFim5">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo fim"
                                name="procFim5"
                                options={periodosProducao}
                                value={perProcFim5}
                                onChange={(selected) => {
                                    setPerProcFim5(selected)
                                    props.setPerProcFim5Info(selected.value);
                                }}
                            />
                        </Form.Group>
                    </InputGroup>
                </Form.Row>

                <Form.Row>
                    <InputGroup>
                        <InputGroup.Text>Plano 6</InputGroup.Text>
                        <InputGroup.Text>Demanda</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="demInicio6">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo inicio"
                                name="demInicio6"
                                options={periodosDemanda}
                                value={perDemInicio6}
                                onChange={(selected) => {
                                    setPerDemInicio6(selected)
                                    props.setPerDemInico6Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>até</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="demFim6">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo fim"
                                name="demFim6"
                                options={periodosDemanda}
                                value={perDemFim6}
                                onChange={(selected) => {
                                    setPerDemFim6(selected)
                                    props.setPerDemFim6Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>Processo</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="procInicio6">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo inicio"
                                name="procInicio6"
                                options={periodosProducao}
                                value={perProcInicio6}
                                onChange={(selected) => {
                                    setPerProcInicio6(selected)
                                    props.setPerProcInico6Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>até</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="procFim6">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo fim"
                                name="procFim6"
                                options={periodosProducao}
                                value={perProcFim6}
                                onChange={(selected) => {
                                    setPerProcFim6(selected)
                                    props.setPerProcFim6Info(selected.value);
                                }}
                            />
                        </Form.Group>
                    </InputGroup>
                </Form.Row>

                <Form.Row>
                    <InputGroup>
                        <InputGroup.Text>Plano 7</InputGroup.Text>
                        <InputGroup.Text>Demanda</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="demInicio1">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo inicio"
                                name="demInicio7"
                                options={periodosDemanda}
                                value={perDemInicio7}
                                onChange={(selected) => {
                                    setPerDemInicio7(selected)
                                    props.setPerDemInico7Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>até</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="demFim7">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo fim"
                                name="demFim7"
                                options={periodosDemanda}
                                value={perDemFim7}
                                onChange={(selected) => {
                                    setPerDemFim7(selected)
                                    props.setPerDemFim7Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>Processo</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="procInicio7">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo inicio"
                                name="procInicio7"
                                options={periodosProducao}
                                value={perProcInicio7}
                                onChange={(selected) => {
                                    setPerProcInicio7(selected)
                                    props.setPerProcInico7Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>até</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="procFim7">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo fim"
                                name="procFim7"
                                options={periodosProducao}
                                value={perProcFim7}
                                onChange={(selected) => {
                                    setPerProcFim7(selected)
                                    props.setPerProcFim7Info(selected.value);
                                }}
                            />
                        </Form.Group>
                    </InputGroup>
                </Form.Row>

                <Form.Row>
                    <InputGroup>
                        <InputGroup.Text>Plano 8</InputGroup.Text>
                        <InputGroup.Text>Demanda</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="demInicio8">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo inicio"
                                name="demInicio8"
                                options={periodosDemanda}
                                value={perDemInicio8}
                                onChange={(selected) => {
                                    setPerDemInicio8(selected)
                                    props.setPerDemInico8Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>até</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="demFim8">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo fim"
                                name="demFim8"
                                options={periodosDemanda}
                                value={perDemFim8}
                                onChange={(selected) => {
                                    setPerDemFim8(selected)
                                    props.setPerDemFim8Info(selected.value);
                                    setPerDemandaFinal(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>Processo</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="procInicio8">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo inicio"
                                name="procInicio8"
                                options={periodosProducao}
                                value={perProcInicio8}
                                onChange={(selected) => {
                                    setPerProcInicio8(selected)
                                    props.setPerProcInico8Info(selected.value);
                                }}
                            />
                        </Form.Group>

                        <InputGroup.Text>até</InputGroup.Text>

                        <Form.Group as={Col} md="2" controlId="procFim8">
                            <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo fim"
                                name="procFim8"
                                options={periodosProducao}
                                value={perProcFim8}
                                onChange={(selected) => {
                                    setPerProcFim8(selected)
                                    props.setPerProcFim8Info(selected.value);
                                }}
                            />
                        </Form.Group>
                    </InputGroup>
                </Form.Row>

                <br></br>
                <h4>
                    Informações para a coluna "Estoque"
                </h4>

                <Form.Row>
                    <Form.Group as={Col} md="2" controlId="consideraDeposito">
                        <Form.Label>
                            Considera Depósitos?
                        </Form.Label>

                        <Select className="basic-select" classNamePrefix="select"
                            name="consideraDeposito"
                            value={consideraDepositoParam}
                            options={options}
                            onChange={(selected) => {
                                setConsideraDepositoParam(selected);
                                setFieldValue('consideraDeposito', selected.value);
                                props.setConsideraDepositoSelected(selected.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="2" controlId="mostraProdSemDepo">
                        <Form.Label>
                            Considera Produto Sem Estoque?
                        </Form.Label>

                        <Select className="basic-select" classNamePrefix="select"
                            name="mostraProdSemDepo"
                            value={mostraProdSemDepoParam}
                            options={options}
                            onChange={(selected) => {
                                setMostraProdSemDepoParam(selected);
                                setFieldValue('mostraProdSemDepo', selected.value);
                                props.setMostraProdSemDepoSelected(selected.value);
                            }}
                        />
                    </Form.Group>

                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="8" controlId="deposito">
                        <Form.Label>
                            Depósitos
                        </Form.Label>

                        <Select className="basic-select" classNamePrefix="select" placeholder="Informe os depósitos..."
                            name="deposito"
                            value={depositosParam}
                            options={depositos}
                            isMulti
                            onChange={(selected) => {
                                setDepositosParam(selected);
                                props.setDepositosSelected(selected);
                            }}
                        />
                    </Form.Group>
                </Form.Row>
                <h4>
                    Informações para a coluna "Em Processo"
                </h4>

                <Form.Row>
                    <Form.Group as={Col} md="2" controlId="mostraProdSemProc">
                        <Form.Label>
                            Considera Produto Sem Processo?
                        </Form.Label>

                        <Select className="basic-select" classNamePrefix="select"
                            name="mostraProdSemProc"
                            value={mostraProdSemProcParam}
                            options={options}
                            onChange={(selected) => {
                                setMostraProdSemProcParam(selected);
                                setFieldValue('mostraProdSemProc', selected.value);
                                props.setMostraProdSemProcSelected(selected.value);
                            }}
                        />
                    </Form.Group>

                </Form.Row>

                <h4>
                    Informações para a coluna "Demanda"
                </h4>

                <Form.Row>
                    <Form.Group as={Col} md="2" controlId="consideraPedBloqu">
                        <Form.Label>
                            Pedidos Bloqueados?
                        </Form.Label>

                        <Select className="basic-select" classNamePrefix="select"
                            name="consideraPedBloqu"
                            value={consideraPedBloquParam}
                            options={options}
                            onChange={(selected) => {
                                setConsideraPedBloquParam(selected);
                                setFieldValue('consideraPedBloqu', selected.value);
                                props.setConsideraPedBloquSelected(selected.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="2" controlId="mostraProdSemPedi">
                        <Form.Label>
                            Considera Produto Sem Pedido?
                        </Form.Label>

                        <Select className="basic-select" classNamePrefix="select"
                            name="mostraProdSemPedi"
                            value={mostraProdSemPediParam}
                            options={options}
                            onChange={(selected) => {
                                setMostraProdSemPediParam(selected);
                                setFieldValue('mostraProdSemPedi', selected.value);
                                props.setMostraProdSemPediSelected(selected.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="2" controlId="nrInterno">
                        <Form.Label>
                            Numero Interno
                        </Form.Label>
                        <Form.Control
                            type="number"
                            min="0"
                            name="nrInterno"
                            value={values.nrInterno}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setNrInternoPedidoInfo(values.nrInterno);
                            }}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="8" controlId="pedido">
                        <Form.Label>
                            Pedidos de Venda
                        </Form.Label>
                        <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe os pedidos..."
                            name="pedido"
                            options={pedidos}
                            value={pedidosParam}
                            isMulti
                            onChange={(selected) => {
                                setPedidosParam(selected);
                                props.setPedidosSelected(selected);
                            }}
                        />
                    </Form.Group>
                </Form.Row>
            </div>
        </Form>
    );
}

AbaPlanejamento.propTypes = {
    setPerDemInico1Info: PropTypes.func,
    setPerDemInico2Info: PropTypes.func,
    setPerDemInico3Info: PropTypes.func,
    setPerDemInico4Info: PropTypes.func,
    setPerDemInico5Info: PropTypes.func,
    setPerDemInico6Info: PropTypes.func,
    setPerDemInico7Info: PropTypes.func,
    setPerDemInico8Info: PropTypes.func,
    setPerDemFim1Info: PropTypes.func,
    setPerDemFim2Info: PropTypes.func,
    setPerDemFim3Info: PropTypes.func,
    setPerDemFim4Info: PropTypes.func,
    setPerDemFim5Info: PropTypes.func,
    setPerDemFim6Info: PropTypes.func,
    setPerDemFim7Info: PropTypes.func,
    setPerDemFim8Info: PropTypes.func,
    setPerProcInico1Info: PropTypes.func,
    setPerProcInico2Info: PropTypes.func,
    setPerProcInico3Info: PropTypes.func,
    setPerProcInico4Info: PropTypes.func,
    setPerProcInico5Info: PropTypes.func,
    setPerProcInico6Info: PropTypes.func,
    setPerProcInico7Info: PropTypes.func,
    setPerProcInico8Info: PropTypes.func,
    setPerProcFim1Info: PropTypes.func,
    setPerProcFim2Info: PropTypes.func,
    setPerProcFim3Info: PropTypes.func,
    setPerProcFim4Info: PropTypes.func,
    setPerProcFim5Info: PropTypes.func,
    setPerProcFim6Info: PropTypes.func,
    setPerProcFim7Info: PropTypes.func,
    setPerProcFim8Info: PropTypes.func,
    setConsideraDepositoSelected: PropTypes.func,
    setMostraProdSemDepoSelected: PropTypes.func,
    setMostraProdSemProcSelected: PropTypes.func,
    setConsideraPedBloquSelected: PropTypes.func,
    setMostraProdSemPediSelected: PropTypes.func,
    setDepositosSelected: PropTypes.func,
    setNrInternoPedidoInfo: PropTypes.func,
    setPedidosSelected: PropTypes.func
};

AbaPlanejamento.defaultProps = {
    setPerDemInico1Info: () => { },
    setPerDemInico2Info: () => { },
    setPerDemInico3Info: () => { },
    setPerDemInico4Info: () => { },
    setPerDemInico5Info: () => { },
    setPerDemInico6Info: () => { },
    setPerDemInico7Info: () => { },
    setPerDemInico8Info: () => { },
    setPerDemFim1Info: () => { },
    setPerDemFim2Info: () => { },
    setPerDemFim3Info: () => { },
    setPerDemFim4Info: () => { },
    setPerDemFim5Info: () => { },
    setPerDemFim6Info: () => { },
    setPerDemFim7Info: () => { },
    setPerDemFim8Info: () => { },
    setPerProcInico1Info: () => { },
    setPerProcInico2Info: () => { },
    setPerProcInico3Info: () => { },
    setPerProcInico4Info: () => { },
    setPerProcInico5Info: () => { },
    setPerProcInico6Info: () => { },
    setPerProcInico7Info: () => { },
    setPerProcInico8Info: () => { },
    setPerProcFim1Info: () => { },
    setPerProcFim2Info: () => { },
    setPerProcFim3Info: () => { },
    setPerProcFim4Info: () => { },
    setPerProcFim5Info: () => { },
    setPerProcFim6Info: () => { },
    setPerProcFim7Info: () => { },
    setPerProcFim8Info: () => { },
    setConsideraDepositoSelected: () => { },
    setMostraProdSemDepoSelected: () => { },
    setMostraProdSemProcSelected: () => { },
    setConsideraPedBloquSelected: () => { },
    setMostraProdSemPediSelected: () => { },
    setDepositosSelected: () => { },
    setNrInternoPedidoInfo: () => { },
    setPedidosSelected: () => { }
};

export default AbaPlanejamento;