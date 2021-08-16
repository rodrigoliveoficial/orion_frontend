import React, { useEffect, useState } from 'react';
import { Container, Form, Row, Col, Tabs, Tab, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import Select from 'react-select';
import api from '../../../../services/api';
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
                <h5> {dado.artigo} - {dado.descArtigo} </h5>
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
                            value={dado.qtdeCapacidadePecas}
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
                            value={dado.qtdePecasPlano}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="2" >
                        <Form.Label>
                            Quantidade Programado
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="pecasPlano"
                            disabled
                            value={dado.qtdePecasProgramado}
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
                            value={dado.qtdeSobraFaltaPecas}
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
                <h5> {dado.artigo} - {dado.descArtigo} </h5>
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
                            value={dado.qtdeCapacidadeMinutos}
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
                            value={dado.qtdeMinutosPlano}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="2" >
                        <Form.Label>
                            Quantidade Programado
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="pecasPlano"
                            disabled
                            value={dado.qtdeMinutosProgramado}
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
                            value={dado.qtdeSobraFaltaMinutos}
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
    const [qtdePecasPlano, setQtdePecasPlano] = useState(0);
    const [qtdePecasProgramado, setQtdePecasProgramado] = useState(0);
    const [percOcupacaoPecas, setPercOcupacaoPecas] = useState(0);
    const [sobraFaltaPecas, setSobraFaltaPecas] = useState(0);
    const [capacidadeMinutos, setCapacidadeMinutos] = useState(0);
    const [qtdeMinutosPlano, setQtdeMinutosPlano] = useState(0);
    const [qtdeMinutosProgramado, setQtdeMinutosProgramado] = useState(0);
    const [percOcupacaoMinutos, setPercOcupacaoMinutos] = useState(0);
    const [sobraFaltaMinutos, setSobraFaltaMinutos] = useState(0);

    const [dataPecas, setDataPecas] = useState([]);
    const [dataMinutos, setDataMinutos] = useState([]);

    const [periodoInicial, setPeriodoInicial] = useState([]);
    const [periodoFinal, setPeriodoFinal] = useState([]);

    const [periodoInicialInfo, setPeriodoInicialInfo] = useState(0);
    const [periodoFinalInfo, setPeriodoFinalInfo] = useState(0);
    const [estagioInfo, setEstagioInfo] = useState(0);

    const [desabilitarCalculo, setDesabilitarCalculo] = useState(true);
    const [waitConexao, setWaitConexao] = useState(false);

    const { idPlanoMestre } = props;
    const { sitPlanoMestre } = props;
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

    useEffect(() => {

        const loadParametros = () => {
            api.get(`plano-mestre/parametros/${idPlanoMestre}`).then((response) => {
                setPeriodoInicial(periodosProducao.find(o => o.value === response.data.periodoInicioOcupacao));
                setPeriodoFinal(periodosProducao.find(o => o.value === response.data.periodoFimOcupacao));
                setPeriodoInicialInfo(response.data.periodoFimOcupacao);
                setPeriodoFinalInfo(response.data.periodoFimOcupacao);
            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
                setPeriodoInicial([]);
                setPeriodoFinal([]);
            });
        };

        loadParametros();

    }, [idPlanoMestre, periodosProducao]);

    useEffect(() => {

        setDesabilitarCalculo(true);

        if  (sitPlanoMestre === 0 && estagioInfo > 0 && periodoInicialInfo > 0 && periodoFinalInfo > 0) setDesabilitarCalculo(false);

    }, [sitPlanoMestre, estagioInfo, periodoInicialInfo, periodoFinalInfo]);

    const loadOcupacaoEstagio = (codEstagio) => {
        
        api.get(`plano-mestre/ocupacao-estagio/${idPlanoMestre}/${codEstagio}`).then((response) => {
            setCapacidadePecas(response.data.qtdeCapacidadePecas);
            setQtdePecasPlano(response.data.qtdePecasPlano);
            setQtdePecasProgramado(response.data.qtdePecasProgramado);
            setPercOcupacaoPecas(response.data.percOcupacaoPecas);
            setSobraFaltaPecas(response.data.qtdeSobraFaltaPecas);
            setCapacidadeMinutos(response.data.qtdeCapacidadeMinutos);
            setQtdeMinutosPlano(response.data.qtdeMinutosPlano);
            setQtdeMinutosProgramado(response.data.qtdeMinutosProgramado);
            setPercOcupacaoMinutos(response.data.percOcupacaoMinutos);
            setSobraFaltaMinutos(response.data.qtdeSobraFaltaMinutos);

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
            setQtdePecasPlano(0);
            setQtdePecasProgramado(0);
            setPercOcupacaoPecas(0);
            setSobraFaltaPecas(0);
            setCapacidadeMinutos(0);
            setQtdeMinutosPlano(0);
            setQtdeMinutosProgramado(0);
            setPercOcupacaoMinutos(0);
            setSobraFaltaMinutos(0);
        });

        api.get(`plano-mestre/ocupacao-artigos/${idPlanoMestre}/${codEstagio}`).then((responseArtigos) => {                        
            setArtigos(responseArtigos.data);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setArtigos([]);
        });
    };

    const calcularOcupacaoPeriodo = async event => {

        setWaitConexao(true);

        const body = ({
            idPlanoMestre: idPlanoMestre,
            periodoOcupacaoInicio: periodoInicial.value,
            periodoOcupacaoFim: periodoFinal.value
        });

        try {
            await api.post('plano-mestre/ocupacao/calcular', body);
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }

        setWaitConexao(false);

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
                        value={periodoInicial}
                        onChange={(selected) => {
                            setPeriodoInicial(selected);
                            setPeriodoInicialInfo(selected.value);
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
                        value={periodoFinal}
                        onChange={(selected) => {
                            setPeriodoFinal(selected);
                            setPeriodoFinalInfo(selected.value);
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
                            setEstagioInfo(selected.value);                            
                            loadOcupacaoEstagio(selected.value);                            
                        }}
                    />
                </Form.Group>
            </Form.Row>

            <Button
                variant="primary"
                onClick={calcularOcupacaoPeriodo}
                disabled={desabilitarCalculo}
            >
                {waitConexao ?
                    <Spinner
                        show="false"
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    /> : ''}

                Atualizar Ocupação
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
                                            value={qtdePecasPlano}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="2" >
                                        <Form.Label>
                                            Quantidade Programado
                                    </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="pecasPlano"
                                            disabled
                                            value={qtdePecasProgramado}
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
                                            value={qtdeMinutosPlano}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="2" >
                                        <Form.Label>
                                            Quantidade Programado
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="minutosPlano"
                                            disabled
                                            value={qtdeMinutosProgramado}
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