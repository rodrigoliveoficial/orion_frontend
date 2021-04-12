import React, { useEffect, useState } from "react";
import { Form, Col } from 'react-bootstrap';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

const optionsTipoDistribuicao = [
    { value: 1, label: 'POR GRADE PADRÃO' },
    { value: 2, label: 'POR GRADE DE VENDA' },
    { value: 3, label: 'POR GRADE NEGATIVA' },
    { value: 4, label: 'POR PREVISÃO DE VENDAS' }
]

const initialValues = {
    descricao: '',
    tipoDistribuicao: 1,
    multiplicador: 0,
    periodoPadrao: 0
}

const AbaGlobal = (props) => {

    const [tipoDistribuicaoParam, setTipoDistribuicaoParam] = useState([]);    
    const [periodoPadraoParam, setPeriodoPadraoParam] = useState([]);
    const { periodosProducao } = props;

    const setParametrosGlobalDefault = () => {
        props.setTipoDistribuicaoSelected(1);
        props.setMultiplicadorInfo(0);
        props.setPeriodoPadraoInfo(0);
    };

    useEffect(() => {
        setTipoDistribuicaoParam(optionsTipoDistribuicao.find(o => o.value === 1));
        setParametrosGlobalDefault();
    }, []);

    const {
        handleChange,
        setFieldValue,
        values
    } = useFormik({
        initialValues: initialValues
    });

    return (
        <div>
            <br></br>
            <Form id="aba-global-form" noValidate>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="descricao">
                        <Form.Label>
                            Descrição do Plano Mestre
                        </Form.Label>
                        <Form.Control
                            type="text"
                            maxLength="100"
                            name="descricao"
                            autoComplete="off"
                            value={values.descricao}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setDescricaoInfo(values.descricao);
                            }}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="2" controlId="tipoDistribuicao">
                        <Form.Label>
                            Tipo de Distribuição
                        </Form.Label>
                        <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o tipo de distribuição"
                            name="tipoDistribuicao"
                            options={optionsTipoDistribuicao}
                            value={tipoDistribuicaoParam}
                            onChange={(selected) => {
                                setTipoDistribuicaoParam(selected);                                
                                props.setTipoDistribuicaoSelected(selected.value);
                            }}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="1" controlId="multiplicador">
                        <Form.Label>
                            Multiplicador
                        </Form.Label>

                        <Form.Control
                            type="number"
                            maxLength="9999"
                            name="multiplicador"
                            value={values.multiplicador}
                            onChange={handleChange}
                            onBlur={() => {
                                props.setMultiplicadorInfo(values.multiplicador);
                            }}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="2" controlId="periodoPadrao">
                        <Form.Label>
                            Período de Produção (Padrão)
                        </Form.Label>
                        <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo padrão"
                            name="periodoPadrao"
                            options={periodosProducao}
                            value={periodoPadraoParam}
                            onChange={(selected) => {
                                setPeriodoPadraoParam(selected);                                
                                props.setPeriodoPadraoInfo(selected.value);
                            }}
                        />
                    </Form.Group>
                </Form.Row>

            </Form>
        </div>
    );
}

AbaGlobal.propTypes = {
    setDescricaoInfo: PropTypes.func,
    setTipoDistribuicaoSelected: PropTypes.func,
    setMultiplicadorInfo: PropTypes.func,
    setPeriodoPadraoInfo: PropTypes.func,    
    periodosProducao: PropTypes.object
};

AbaGlobal.defaultProps = {
    setDescricaoInfo: () => { },
    setTipoDistribuicaoSelected: () => { },
    setMultiplicadorInfo: () => { },
    setPeriodoPadraoInfo: () => { }
};

export default AbaGlobal;