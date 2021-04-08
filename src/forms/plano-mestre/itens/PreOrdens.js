import React, { useEffect, useState } from 'react';
import { Form, Col, Tabs, Tab, Button } from 'react-bootstrap';
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
    qtdeMaximaOP: 999999,
    qtdeMinimaOP: 0,
    periodoOP: 0,
    depositoOP: 0,
    observacaoOP: ''
}

const FormPreOrdens = (props) => {

    const [agrupaOpPorRefer, setAgrupaOpPorRefer] = useState(1);
    const [loading, setLoading] = useState(false);
    const [dadosPreOrdens, setDadosPreOrdens] = useState([]);
    const [itensSelected, setItensSelected] = useState([]);

    const [depositoOP, setDepositoOP] = useState([]);

    const [agruparInfo, setAgruparInfo] = useState([]);
    const [qtdeMaxInfo, setQtdeMaxInfo] = useState(999999);
    const [qtdeMinInfo, setQtdeMinInfo] = useState(0);
    const [periodoInfo, setPeriodoInfo] = useState(0);
    const [depositoInfo, setDepositoInfo] = useState([]);
    const [observacaoInfo, setObservacaoInfo] = useState('');

    const [qtdePecasProg, setQtdePecasProg] = useState(0);
    const [qtdeMinutosProg, setQtdeMinutosProg] = useState(0);
    const [qtdeReferenciasProg, setQtdeReferenciasProg] = useState(0);
    const [qtdeSKUsProg, setQtdeSKUsProg] = useState(0);
    const [qtdeLoteMedioProg, setQtdeLoteMedioProg] = useState(0);
    const [detMaiorOrdemProg, setDetMaiorOrdemProg] = useState(0);
    const [detMenorOrdemProg, setDetMenorOrdemProg] = useState(0);

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
                setQtdeMaxInfo(999999);
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

    const validarPeriodoExiste = (periodo) => {

        let periodoExiste = false

        console.log("validar periodo");

        api.get(`periodos-producao/existe/${periodo}`).then((response) => {

            console.log(response.data);

            periodoExiste = response.data;
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
        });

        return periodoExiste;
    }

    const validarParametros = () => {

        let parametrosValidos = true;

        if (qtdeMaxInfo > 999999) {
            alert('Qtde Máxima por Ordem: Quantidade não pode exceder 999999');
            parametrosValidos = false;
        }
        if (qtdeMaxInfo < 0) {
            alert('Qtde Máxima por Ordem: Não pode ser menor que 0');
            parametrosValidos = false;
        }
        if (qtdeMinInfo > 999999) {
            alert('Qtde Mínima por Ordem: Quantidade não pode exceder 999999');
            parametrosValidos = false;
        }
        if (qtdeMinInfo < 0) {
            alert('Qtde Mínima por Ordem: Não pode ser menor que 0');
            parametrosValidos = false;
        }

        //if (!validarPeriodoExiste(periodoInfo)) {
        //    alert('Período de produção informado não existe!');
        //    parametrosValidos = false;
        //}

        return parametrosValidos
    };

    const gerarPreOrdens = async event => {

        setLoading(true);
        setItensSelected([]);

        if (validarParametros()) {

            const body = ({
                idPlanoMestre: idPlanoMestre,
                agrupaOpPorRefer: agruparInfo,
                qtdeMaximaOP: qtdeMaxInfo,
                qtdeMinimaOP: qtdeMinInfo,
                periodoOP: periodoInfo,
                depositoOP: depositoInfo,
                observacaoOP: observacaoInfo
            });

            try {
                const response = await api.post('plano-mestre/pre-ordens/gerar', body);
                setDadosPreOrdens(response.data);
            } catch (e) {
                console.log('ocorreu algum erro!');
                console.error(e);
                setDadosPreOrdens([]);
            }
        }

        setLoading(false);
    };

    useEffect(() => {
        const obterIndicadoresPreOrdens = () => {

            const body = ({
                idPlanoMestre: idPlanoMestre,
                preOrdensSelected: itensSelected
            });

            api.post('plano-mestre/pre-ordens/indicadores/selecionados', body).then((response) => {                                                           
                setQtdePecasProg(response.data.qtdePecasProgramadas);
                setQtdeMinutosProg(response.data.qtdeMinutosProgramados);
                setQtdeReferenciasProg(response.data.qtdeReferencias);
                setQtdeSKUsProg(response.data.qtdeSKUs);
                setQtdeLoteMedioProg(response.data.qtdeLoteMedio);
                setDetMaiorOrdemProg(response.data.detMaiorOrdem);
                setDetMenorOrdemProg(response.data.detMenorOrdem);                            
            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);            

                setQtdePecasProg(0);
                setQtdeMinutosProg(0);
                setQtdeReferenciasProg(0);
                setQtdeSKUsProg(0);
                setQtdeLoteMedioProg(0);
                setDetMaiorOrdemProg('');
                setDetMenorOrdemProg('');
            });
        }

        obterIndicadoresPreOrdens();
        
    }, [idPlanoMestre, itensSelected]);

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
                            maxLength="999999"
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
                            maxLength="999999"
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

                    <Form.Group as={Col} md="3" controlId="deposito">
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

                    <Form.Group as={Col} md="3" controlId="observacaoOP">
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

            <Tabs defaultActiveKey="aba1" transition={false} id="abas-pre-ordens">
                <Tab eventKey="aba1" title="Pré-Ordens Geradas" >

                    <br></br>

                    <PreOrdensTable
                        {...props}
                        dadosPreOrdens={dadosPreOrdens}
                        selectRowPropAux={selectRowPropAux}
                    />
                </Tab>
                <Tab eventKey="aba2" title="Indicadores" >

                    <br></br>

                    <Form.Row>
                        <Form.Group as={Col} md="1">
                            <Form.Label>
                                Qtde Peças Programadas
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="qtdePecasProg"
                                disabled
                                value={qtdePecasProg}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="1">
                            <Form.Label>
                                Qtde Minutos Programados
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="qtdeMinutosProg"
                                disabled
                                value={qtdeMinutosProg}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="3">
                            <Form.Label>
                                Maior Ordem
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="maiorPreOrdem"
                                disabled
                                value={detMaiorOrdemProg}
                            />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md="1">
                            <Form.Label>
                                Qtde. Referências
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="qtdeReferencias"
                                disabled
                                value={qtdeReferenciasProg}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="1">
                            <Form.Label>
                                Qtde. SKUs
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="qtdeSkus"
                                disabled
                                value={qtdeSKUsProg}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="3">
                            <Form.Label>
                                Menor Ordem
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="menorPreOrdem"
                                disabled
                                value={detMenorOrdemProg}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md="1">
                            <Form.Label>
                                Lote Médio
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="qtdeLoteMedio"
                                disabled
                                value={qtdeLoteMedioProg}
                            />
                        </Form.Group>

                    </Form.Row>



                </Tab>
            </Tabs>

        </div >
    );

}

export default FormPreOrdens;