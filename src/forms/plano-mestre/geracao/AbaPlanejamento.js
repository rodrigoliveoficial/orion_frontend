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
            value: c.id,
            label: c.id
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
    demInicio1: 2001,
    demInicio2: 2052,
    demInicio3: 2053,
    demInicio4: 2101,
    demInicio5: 2102,
    demInicio6: 2103,
    demInicio7: 2104,
    demInicio8: 2105,
    demFim1: 2051,
    demFim2: 2052,
    demFim3: 2053,
    demFim4: 2101,
    demFim5: 2102,
    demFim6: 2103,
    demFim7: 2104,
    demFim8: 2140,
    procInicio1: 5001,
    procInicio2: 5052,
    procInicio3: 5053,
    procInicio4: 5101,
    procInicio5: 5102,
    procInicio6: 5103,
    procInicio7: 5104,
    procInicio8: 5105,
    procFim1: 5051,
    procFim2: 5052,
    procFim3: 5053,
    procFim4: 5101,
    procFim5: 5102,
    procFim6: 5103,
    procFim7: 5104,
    procFim8: 5140,
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
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: schema,
        validateOnChange: true,
        validateOnBlur: true,
        initialValues: initialValues
    });

    const getPedidos = (parametros) => {
        api.get(`pedidos/${parametros.demInicio1}/${parametros.demFim8}`).then((response) => {
            setPedidos(normalizePedidos(response.data));
        }).catch((e) => {
            setPedidos(null);
            console.log('ocorreu algum erro!');
            console.error(e);
        }).finally();
    }

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
                        <Form.Control
                            name="demInicio1"
                            type="number"
                            rows="1"
                            placeholder="Inicio"
                            value={values.demInicio1}
                            onChange={handleChange}
                            onBlur={() => {
                                console.log("valor demInicio01");
                                console.log(values.demInicio1);
                                props.setPerDemInico1Info(values.demInicio1);
                                setFieldValue("procInicio1", values.demInicio1);
                            }}
                            isInvalid={errors.demInicio1 && touched.demInicio1}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.demInicio1}
                        </Form.Control.Feedback>

                        <InputGroup.Text>até</InputGroup.Text>
                        <Form.Control
                            name="demFim1"
                            type="number"
                            rows="1"
                            placeholder="Fim"
                            value={values.demFim1}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerDemFim1Info(values.demFim1);
                                setFieldValue("procFim1", values.demFim1);
                            }}
                        />
                        <InputGroup.Text>Processo</InputGroup.Text>
                        <Form.Control
                            name="procInicio1"
                            type="number"
                            rows="1"
                            placeholder="Inicio"
                            value={values.procInicio1}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerProcInico1Info(values.procInicio1);
                            }}
                        />
                        <InputGroup.Text>até</InputGroup.Text>
                        <Form.Control
                            name="procFim1"
                            type="number"
                            rows="1"
                            placeholder="Fim"
                            value={values.procFim1}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerProcFim1Info(values.procFim1);
                            }}
                        />
                    </InputGroup>
                </Form.Row>
                <Form.Row>
                    <InputGroup >
                        <InputGroup.Text>Plano 2</InputGroup.Text>
                        <InputGroup.Text>Demanda</InputGroup.Text>
                        <Form.Control
                            name="demInicio2"
                            type="number"
                            rows="1"
                            placeholder="Inicio"
                            value={values.demInicio2}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerDemInico2Info(values.demInicio2);
                                setFieldValue("procInicio2", values.demInicio2);
                            }}
                        />
                        <InputGroup.Text>até</InputGroup.Text>
                        <Form.Control
                            name="demFim2"
                            type="number"
                            rows="1"
                            placeholder="Fim"
                            value={values.demFim2}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerDemFim2Info(values.demFim2);
                                setFieldValue("procFim2", values.demFim2);
                            }}
                        />
                        <InputGroup.Text>Processo</InputGroup.Text>
                        <Form.Control
                            name="procInicio2"
                            type="number"
                            rows="1"
                            placeholder="Inicio"
                            value={values.procInicio2}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerProcInico2Info(values.procInicio2);
                            }}
                        />
                        <InputGroup.Text>até</InputGroup.Text>
                        <Form.Control
                            name="procFim2"
                            type="number"
                            rows="1"
                            placeholder="Fim"
                            value={values.procFim2}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerProcFim2Info(values.procFim2);
                            }}
                        />
                    </InputGroup>
                </Form.Row>
                <Form.Row>
                    <InputGroup >
                        <InputGroup.Text>Plano 3</InputGroup.Text>
                        <InputGroup.Text>Demanda</InputGroup.Text>
                        <Form.Control
                            name="demInicio3"
                            type="number"
                            rows="1"
                            placeholder="Inicio"
                            value={values.demInicio3}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerDemInico3Info(values.demInicio3);
                                setFieldValue("procInicio3", values.demInicio3);
                            }}
                        />
                        <InputGroup.Text>até</InputGroup.Text>
                        <Form.Control
                            name="demFim3"
                            type="number"
                            rows="1"
                            placeholder="Fim"
                            value={values.demFim3}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerDemFim3Info(values.demFim3);
                                setFieldValue("procFim3", values.demFim3);
                            }}
                        />
                        <InputGroup.Text>Processo</InputGroup.Text>
                        <Form.Control
                            name="procInicio3"
                            type="number"
                            rows="1"
                            placeholder="Inicio"
                            value={values.procInicio3}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerProcInico3Info(values.procInicio3);
                            }}
                        />
                        <InputGroup.Text>até</InputGroup.Text>
                        <Form.Control
                            name="procFim3"
                            type="number"
                            rows="1"
                            placeholder="Fim"
                            value={values.procFim3}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerProcFim3Info(values.procFim3);
                            }}
                        />
                    </InputGroup>
                </Form.Row>
                <Form.Row>
                    <InputGroup >
                        <InputGroup.Text>Plano 4</InputGroup.Text>
                        <InputGroup.Text>Demanda</InputGroup.Text>
                        <Form.Control
                            name="demInicio4"
                            type="number"
                            rows="1"
                            placeholder="Inicio"
                            value={values.demInicio4}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerDemInico4Info(values.demInicio4);
                                setFieldValue("procInicio4", values.demInicio4);
                            }}
                        />
                        <InputGroup.Text>até</InputGroup.Text>
                        <Form.Control
                            name="demFim4"
                            type="number"
                            rows="1"
                            placeholder="Fim"
                            value={values.demFim4}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerDemFim4Info(values.demFim4);
                                setFieldValue("procFim4", values.demFim4);
                            }}
                        />
                        <InputGroup.Text>Processo</InputGroup.Text>
                        <Form.Control
                            name="procInicio4"
                            type="number"
                            rows="1"
                            placeholder="Inicio"
                            value={values.procInicio4}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerProcInico4Info(values.procInicio4);
                            }}
                        />
                        <InputGroup.Text>até</InputGroup.Text>
                        <Form.Control
                            name="procFim4"
                            type="number"
                            rows="1"
                            placeholder="Fim"
                            value={values.procFim4}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerProcFim4Info(values.procFim4);
                            }}
                        />
                    </InputGroup>
                </Form.Row>
                <Form.Row>
                    <InputGroup >
                        <InputGroup.Text>Plano 5</InputGroup.Text>
                        <InputGroup.Text>Demanda</InputGroup.Text>
                        <Form.Control
                            name="demInicio5"
                            type="number"
                            rows="1"
                            placeholder="Inicio"
                            value={values.demInicio5}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerDemInico5Info(values.demInicio5);
                                setFieldValue("procInicio5", values.demInicio5);
                            }}
                        />
                        <InputGroup.Text>até</InputGroup.Text>
                        <Form.Control
                            name="demFim5"
                            type="number"
                            rows="1"
                            placeholder="Fim"
                            value={values.demFim5}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerDemFim5Info(values.demFim5);
                                setFieldValue("procFim5", values.demFim5);
                            }}
                        />
                        <InputGroup.Text>Processo</InputGroup.Text>
                        <Form.Control
                            name="procInicio5"
                            type="number"
                            rows="1"
                            placeholder="Inicio"
                            value={values.procInicio5}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerProcInico5Info(values.procInicio5);
                            }}
                        />
                        <InputGroup.Text>até</InputGroup.Text>
                        <Form.Control
                            name="procFim5"
                            type="number"
                            rows="1"
                            placeholder="Fim"
                            value={values.procFim5}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerProcFim5Info(values.procFim5);
                            }}
                        />
                    </InputGroup>
                </Form.Row>
                <Form.Row>
                    <InputGroup >
                        <InputGroup.Text>Plano 6</InputGroup.Text>
                        <InputGroup.Text>Demanda</InputGroup.Text>
                        <Form.Control
                            name="demInicio6"
                            type="number"
                            rows="1"
                            placeholder="Inicio"
                            value={values.demInicio6}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerDemInico6Info(values.demInicio6);
                                setFieldValue("procInicio6", values.demInicio6);
                            }}
                        />
                        <InputGroup.Text>até</InputGroup.Text>
                        <Form.Control
                            name="demFim6"
                            type="number"
                            rows="1"
                            placeholder="Fim"
                            value={values.demFim6}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerDemFim6Info(values.demFim6);
                                setFieldValue("procFim6", values.demFim6);
                            }}
                        />
                        <InputGroup.Text>Processo</InputGroup.Text>
                        <Form.Control
                            name="procInicio6"
                            type="number"
                            rows="1"
                            placeholder="Inicio"
                            value={values.procInicio6}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerProcInico6Info(values.procInicio6);
                            }}
                        />
                        <InputGroup.Text>até</InputGroup.Text>
                        <Form.Control
                            name="procFim6"
                            type="number"
                            rows="1"
                            placeholder="Fim"
                            value={values.procFim6}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerProcFim6Info(values.procFim6);
                            }}
                        />
                    </InputGroup>
                </Form.Row>
                <Form.Row>
                    <InputGroup >
                        <InputGroup.Text>Plano 7</InputGroup.Text>
                        <InputGroup.Text>Demanda</InputGroup.Text>
                        <Form.Control
                            name="demInicio7"
                            type="number"
                            rows="1"
                            placeholder="Inicio"
                            value={values.demInicio7}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerDemInico7Info(values.demInicio7);
                                setFieldValue("procInicio7", values.demInicio7);
                            }}
                        />
                        <InputGroup.Text>até</InputGroup.Text>
                        <Form.Control
                            name="demFim7"
                            type="number"
                            rows="1"
                            placeholder="Fim"
                            value={values.demFim7}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerDemFim7Info(values.demFim7);
                                setFieldValue("procFim7", values.demFim7);
                            }}
                        />
                        <InputGroup.Text>Processo</InputGroup.Text>
                        <Form.Control
                            name="procInicio7"
                            type="number"
                            rows="1"
                            placeholder="Inicio"
                            value={values.procInicio7}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerProcInico7Info(values.procInicio7);
                            }}
                        />
                        <InputGroup.Text>até</InputGroup.Text>
                        <Form.Control
                            name="procFim7"
                            type="number"
                            rows="1"
                            placeholder="Fim"
                            value={values.procFim7}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerProcFim7Info(values.procFim7);
                            }}
                        />
                    </InputGroup>
                </Form.Row>
                <Form.Row>
                    <InputGroup >
                        <InputGroup.Text>Plano 8</InputGroup.Text>
                        <InputGroup.Text>Demanda</InputGroup.Text>
                        <Form.Control
                            name="demInicio8"
                            type="number"
                            rows="1"
                            placeholder="Inicio"
                            value={values.demInicio8}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerDemInico8Info(values.demInicio8);
                                setFieldValue("procInicio8", values.demInicio8);
                            }}
                        />
                        <InputGroup.Text>até</InputGroup.Text>
                        <Form.Control
                            name="demFim8"
                            type="number"
                            rows="1"
                            placeholder="Fim"
                            value={values.demFim8}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerDemFim8Info(values.demFim8);
                                setFieldValue("procFim8", values.demFim8);
                                getPedidos(values);
                            }}
                        />
                        <InputGroup.Text>Processo</InputGroup.Text>
                        <Form.Control
                            name="procInicio8"
                            type="number"
                            rows="1"
                            placeholder="Inicio"
                            value={values.procInicio8}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerProcInico8Info(values.procInicio8);
                            }}
                        />
                        <InputGroup.Text>até</InputGroup.Text>
                        <Form.Control
                            name="procFim8"
                            type="number"
                            rows="1"
                            placeholder="Fim"
                            value={values.procFim8}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setPerProcFim8Info(values.procFim8);
                            }}
                        />
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