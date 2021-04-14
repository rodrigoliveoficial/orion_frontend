import React, { useEffect, useState } from 'react';
import { Container, Form, Row, Col, Tabs, Tab, Button } from 'react-bootstrap';
import Select from 'react-select';
import api from '../../../services/api';
import { Chart } from "react-google-charts";

const loadEstagios = () => api.get('capacidade-producao/estagios-configurados');

const normalizeEstagios = (dados) => {
    return dados.map((c) => {
        return {
            value: c.estagio,
            label: `${c.estagio} - ${c.descricao}`
        };
    });
};

const renderArtigos = (dado, index) => {
    return (
        <Row>
            <Col>
                <h5> {dado.artigo} - {dado.descricao} </h5>
                <br></br>

                <Form.Row>
                    <Form.Group as={Col} md="2" >
                        <Form.Label>
                            Capacidade
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="pecasCapacidade"
                            disabled
                            value={dado.capacidadePecas}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="2" >
                        <Form.Label>
                            Quantidade do Plano
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="pecasPlano"
                            disabled
                            value={dado.qtdePecas}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="2" >
                        <Form.Label>
                            % Ocupação
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="pecasOcupacao"
                            disabled
                            value={dado.percOcupacaoPecas}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="2" >
                        <Form.Label>
                            Falta / Sobra
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="pecasFaltaSobra"
                            disabled
                            value={dado.sobraFaltaPecas}
                        />
                    </Form.Group>

                    <Chart
                        chartType="Gauge"
                        data={[
                            ['', ''],
                            ['', dado.percOcupacaoPecas]
                        ]}
                    />
                </Form.Row>

            </Col>

            <Col>
                <h5> {dado.artigo} - {dado.descricao} </h5>
                <br></br>

                <Form.Row>
                    <Form.Group as={Col} md="2" >
                        <Form.Label>
                            Capacidade
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="pecasCapacidade"
                            disabled
                            value={dado.capacidadeMinutos}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="2" >
                        <Form.Label>
                            Quantidade do Plano
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="pecasPlano"
                            disabled
                            value={dado.qtdeMinutos}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="2" >
                        <Form.Label>
                            % Ocupação
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="pecasOcupacao"
                            disabled
                            value={dado.percOcupacaoMinutos}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="2" >
                        <Form.Label>
                            Falta / Sobra
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="pecasFaltaSobra"
                            disabled
                            value={dado.sobraFaltaMinutos}
                        />
                    </Form.Group>

                    <Chart
                        chartType="Gauge"
                        data={[
                            ['', ''],
                            ['', dado.percOcupacaoMinutos]
                        ]}
                    />
                </Form.Row>

            </Col>
        </Row>
    )
}

const FormOcupacaoEstagios = (props) => {

    const [estagios, setEstagios] = useState([]);
    const [estagio, setEstagio] = useState(null);

    const [artigos, setArtigos] = useState([]);

    const [capacidadePecas, setCapacidadePecas] = useState(0);
    const [qtdePecas, setQtdePecas] = useState(0);
    const [percOcupacaoPecas, setPercOcupacaoPecas] = useState(0);
    const [sobraFaltaPecas, setSobraFaltaPecas] = useState(0);
    const [capacidadeMinutos, setCapacidadeMinutos] = useState(0);
    const [qtdeMinutos, setQtdeMinutos] = useState(0);
    const [percOcupacaoMinutos, setPercOcupacaoMinutos] = useState(0);
    const [sobraFaltaMinutos, setSobraFaltaMinutos] = useState(0);

    const [dataPecas, setDataPecas] = useState([]);
    const [dataMinutos, setDataMinutos] = useState([]);

    const { idPlanoMestre } = props;
    const { periodosProducao } = props;

    const load = () => {

        Promise.all([
            loadEstagios()
        ])
            .then(([
                response
            ]) => {
                setEstagios(normalizeEstagios(response.data));
            })
            .catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
            });
    };

    useEffect(() => {
        load();
    }, []);

    const loadOcupacaoEstagio = (codEstagio) => {
        api.get(`plano-mestre/ocupacao-estagio/${idPlanoMestre}/${codEstagio}`).then((response) => {
            setCapacidadePecas(response.data.capacidadePecas);
            setQtdePecas(response.data.qtdePecas);
            setPercOcupacaoPecas(response.data.percOcupacaoPecas);
            setSobraFaltaPecas(response.data.sobraFaltaPecas);
            setCapacidadeMinutos(response.data.capacidadeMinutos);
            setQtdeMinutos(response.data.qtdeMinutos);
            setPercOcupacaoMinutos(response.data.percOcupacaoMinutos);
            setSobraFaltaMinutos(response.data.sobraFaltaMinutos);

            setDataPecas([
                ['', ''],
                ['', response.data.percOcupacaoPecas]]);

            setDataMinutos([
                ['', ''],
                ['', response.data.percOcupacaoMinutos]]);

        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setCapacidadePecas(0);
            setQtdePecas(0);
            setPercOcupacaoPecas(0);
            setSobraFaltaPecas(0);
            setCapacidadeMinutos(0);
            setQtdeMinutos(0);
            setPercOcupacaoMinutos(0);
            setSobraFaltaMinutos(0);
        });

        api.get(`plano-mestre/ocupacao-artigos/${idPlanoMestre}/${codEstagio}`).then((response) => {
            setArtigos(response.data);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setArtigos([]);
        });
    };

    const calcularOcupacaoPeriodo = () => {
       
        
       
        loadOcupacaoEstagio(estagio.value);
    };

    return (
        <div>
            <br></br>

            <Form.Row>
                <Form.Group as={Col} md="2" controlId="periodoInicial">
                    <Form.Label>
                        Período Inicial (Ocupação)
                        </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo inicial"
                        name="periodoInicial"
                        options={periodosProducao}
                        //value={periodoPadraoParam}
                        onChange={(selected) => {
                            //setPeriodoPadraoParam(selected);
                            //props.setPeriodoPadraoInfo(selected.value);
                        }}
                    />
                </Form.Group>

                <Form.Group as={Col} md="2" controlId="periodoFinal">
                    <Form.Label>
                        Período Final (Ocupação)
                        </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o periodo final"
                        name="periodoFinal"
                        options={periodosProducao}
                        //value={periodoPadraoParam}
                        onChange={(selected) => {
                            //setPeriodoPadraoParam(selected);
                            //props.setPeriodoPadraoInfo(selected.value);
                        }}
                    />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="4" controlId="cor">
                    <Form.Label>
                        Estágio
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Selecione o Estagio."
                        name="estagio"
                        options={estagios}
                        value={estagio}
                        onChange={(selected) => {
                            setEstagio(selected);
                            loadOcupacaoEstagio(selected.value);
                        }}
                    />
                </Form.Group>
            </Form.Row>

            <Button
                variant="primary"
                onClick={calcularOcupacaoPeriodo}
            >
                Calcular Ocupação do Período
            </Button>

            <br></br>
            <br></br>

            <Tabs defaultActiveKey="aba1" transition={false} id="abas-ocupacao">
                <Tab eventKey="aba1" title="Por Estágio" >
                    <Container fluid>
                        <Row>
                            <Col>
                                <br></br>
                                <h5>
                                    Capacidade em Peças:
                                </h5>
                                <br></br>
                                <Form.Row>
                                    <Form.Group as={Col} md="2" >
                                        <Form.Label>
                                            Capacidade
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="pecasCapacidade"
                                            disabled
                                            value={capacidadePecas}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="2" >
                                        <Form.Label>
                                            Quantidade do Plano
                                    </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="pecasPlano"
                                            disabled
                                            value={qtdePecas}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="2" >
                                        <Form.Label>
                                            % Ocupação
                                    </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="pecasOcupacao"
                                            disabled
                                            value={percOcupacaoPecas}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="2" >
                                        <Form.Label>
                                            Falta / Sobra
                                    </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="pecasFaltaSobra"
                                            disabled
                                            value={sobraFaltaPecas}
                                        />
                                    </Form.Group>
                                </Form.Row>

                                <br></br>

                                <Chart
                                    chartType="Gauge"
                                    data={dataPecas}
                                />

                            </Col>
                            <Col>
                                <br></br>
                                <h5>
                                    Capacidade em Minutos:
                                </h5>
                                <br></br>

                                <Form.Row>
                                    <Form.Group as={Col} md="2" >
                                        <Form.Label>
                                            Capacidade
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="minutosCapacidade"
                                            disabled
                                            value={capacidadeMinutos}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="2" >
                                        <Form.Label>
                                            Quantidade do Plano
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="minutosPlano"
                                            disabled
                                            value={qtdeMinutos}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="2" >
                                        <Form.Label>
                                            % Ocupação
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="minutosOcupacao"
                                            disabled
                                            value={percOcupacaoMinutos}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="2" >
                                        <Form.Label>
                                            Falta / Sobra
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="minutosFaltaSobra"
                                            disabled
                                            value={sobraFaltaMinutos}
                                        />
                                    </Form.Group>
                                </Form.Row>

                                <br></br>

                                <Chart
                                    chartType="Gauge"
                                    data={dataMinutos}
                                />

                            </Col>
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey="aba2" title="Por Artigo" >

                    <br></br>

                    <Container fluid>
                        <Row>
                            <Col>
                                <br></br>
                                <h5>
                                    Capacidade em Peças:
                                </h5>
                                <br></br>
                            </Col>
                            <Col>
                                <br></br>
                                <h5>
                                    Capacidade em Minutos:
                                </h5>
                                <br></br>
                            </Col>
                        </Row>

                        {artigos.map(renderArtigos)}

                    </Container>

                </Tab>
            </Tabs>
        </div >
    );

}

export default FormOcupacaoEstagios;