import React, { useEffect, useState } from 'react';
import { Container, Form, Row, Col, Tabs, Tab, Button } from 'react-bootstrap';
import Select from 'react-select';
import api from '../../../services/api';
import { Chart } from "react-google-charts";

const optionsAgruparReferencia = [
    { value: 0, label: 'Não' },
    { value: 1, label: 'Sim' }
]

const FormPreOrdens = (props) => {

    const [agruparPorRefer, setAgruparPorRefer] = useState(1);
    const [loading, setLoading] = useState(false);

    const { idPlanoMestre } = props;

    return (
        <div>
            <br></br>
            <Form.Row>
                <Form.Group as={Col} md="1" controlId="cor">
                    <Form.Label>
                        Agrupar por Referência
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select"
                        name="agruparPorRefer"
                        options={optionsAgruparReferencia}
                        value={agruparPorRefer}
                        onChange={(selected) => {
                            setAgruparPorRefer(selected);
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
                        //value={values.multiplicador}
                        //onChange={handleChange}
                        onBlur={() => {
                            //props.setMultiplicadorInfo(values.multiplicador);
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
                        //value={values.multiplicador}
                        //onChange={handleChange}
                        onBlur={() => {
                            //props.setMultiplicadorInfo(values.multiplicador);
                        }}
                    />
                </Form.Group>

                <Form.Group as={Col} md="1" controlId="periodo">
                    <Form.Label>
                        Período de Produção
                        </Form.Label>

                    <Form.Control
                        type="number"
                        maxLength="9999"
                        name="periodo"
                        //value={values.multiplicador}
                        //onChange={handleChange}
                        onBlur={() => {
                            //props.setMultiplicadorInfo(values.multiplicador);
                        }}
                    />
                </Form.Group>

            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="4" controlId="observacao">
                    <Form.Label>
                        Observação das Ordens
                        </Form.Label>

                    <Form.Control
                        type="text"
                        maxLength="60"
                        name="observacao"
                        autoComplete="off"
                        //value={values.multiplicador}
                        //onChange={handleChange}
                        onBlur={() => {
                            //props.setMultiplicadorInfo(values.multiplicador);
                        }}
                    />
                </Form.Group>
            </Form.Row>

            <Button
                variant="primary" disabled={loading}
            //onClick={consultarOcupacaoEstagio}
            >
                Gerar Pré-Ordens
            </Button>

        </div >
    );

}

export default FormPreOrdens;