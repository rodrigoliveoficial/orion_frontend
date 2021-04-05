import React, { useEffect, useState } from "react";
import { Modal, Button, Container, Form, Row, Col, Tabs, Tab } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import { useFormik } from 'formik';
import Select from 'react-select';
import PropTypes from 'prop-types';
import api from '../../../services/api';
import Figure from 'react-bootstrap/Figure'
import Accordion from 'react-bootstrap/Accordion';
import OcupacaoEstagio from './OcupacaoEstagio';
import PreOrdens from './PreOrdens';
import ItensPlanoTable from './ItensPlanoTable';
import TamanhosPlanoTable from './TamanhosPlanoTable';

const normalizeTamanhos = (dados) => {
    return dados.map((d) => {
        return {
            idPlanoMestre: d.idPlanoMestre,
            ordem: d.ordem,
            grupo: d.grupo,
            sub: d.sub,
            item: d.item,
            qtdeEstoque: d.qtdeEstoque,
            qtdeDemanda: d.qtdeDemanda,
            qtdeProcesso: d.qtdeProcesso,
            qtdeSaldo: d.qtdeSaldo,
            qtdeSugestao: d.qtdeSugestao,
            qtdeEqualizado: d.qtdeEqualizado,
            qtdeDiferenca: d.qtdeDiferenca,
            qtdeProgramada: d.qtdeProgramada
        };
    });
};

const normalizeAlternativas = (dados) => {
    return dados.map((d) => {
        return {
            value: d.alternativa,
            label: `${d.alternativa} - ${d.descricao}`
        };
    });
};

const normalizeRoteiros = (dados) => {
    return dados.map((d) => {
        return {
            value: d.codigo,
            label: d.codigo
        };
    });
};

const normalizeDados = (dados) => {
    return dados.map((d) => {
        return {
            idPlanoMestre: d.idPlanoMestre,
            codigo: d.codigo,
            grupo: d.grupo,
            item: d.item,
            embarque: d.embarque,
            rank: d.rank,
            sugCancelProducao: d.sugCancelProducao,
            qtdePrevisao: d.qtdePrevisao,
            qtdeEstoque: d.qtdeEstoque,
            qtdeDemPlano1: d.qtdeDemPlano1,
            qtdeProcPlano1: d.qtdeProcPlano1,
            qtdeSaldoPlano1: d.qtdeSaldoPlano1,
            qtdeDemPlano2: d.qtdeDemPlano2,
            qtdeProcPlano2: d.qtdeProcPlano2,
            qtdeSaldoPlano2: d.qtdeSaldoPlano2,
            qtdeDemPlano3: d.qtdeDemPlano3,
            qtdeProcPlano3: d.qtdeProcPlano3,
            qtdeSaldoPlano3: d.qtdeSaldoPlano3,
            qtdeDemPlano4: d.qtdeDemPlano4,
            qtdeProcPlano4: d.qtdeProcPlano4,
            qtdeSaldoPlano4: d.qtdeSaldoPlano4,
            qtdeDemPlano5: d.qtdeDemPlano5,
            qtdeProcPlano5: d.qtdeProcPlano5,
            qtdeSaldoPlano5: d.qtdeSaldoPlano5,
            qtdeDemPlano6: d.qtdeDemPlano6,
            qtdeProcPlano6: d.qtdeProcPlano6,
            qtdeSaldoPlano6: d.qtdeSaldoPlano6,
            qtdeDemPlano7: d.qtdeDemPlano7,
            qtdeProcPlano7: d.qtdeProcPlano7,
            qtdeSaldoPlano7: d.qtdeSaldoPlano7,
            qtdeDemPlano8: d.qtdeDemPlano8,
            qtdeProcPlano8: d.qtdeProcPlano8,
            qtdeSaldoPlano8: d.qtdeSaldoPlano8,
            qtdeDemAcumulado: d.qtdeDemAcumulado,
            qtdeProcAcumulado: d.qtdeProcAcumulado,
            qtdeSaldoAcumulado: d.qtdeSaldoAcumulado,
            qtdeSugestao: d.qtdeSugestao,
            qtdeEqualizadoSugestao: d.qtdeEqualizadoSugestao,
            qtdeDiferencaSugestao: d.qtdeDiferencaSugestao,
            qtdeProgramada: d.qtdeProgramada
        };
    });
};

const initialValues = {
    alternativaItem: 0,
    roteiroItem: 0,
    periodoPadraoItem: 0,
    multiplicadorItem: 0
};

const ItensPlanoMestre = (props) => {

    const [itens, setItens] = useState([]);
    const [plano1, setPlano1] = useState('');
    const [plano2, setPlano2] = useState('');
    const [plano3, setPlano3] = useState('');
    const [plano4, setPlano4] = useState('');
    const [plano5, setPlano5] = useState('');
    const [plano6, setPlano6] = useState('');
    const [plano7, setPlano7] = useState('');
    const [plano8, setPlano8] = useState('');

    const [tipoDistribuicaoParam, setTipoDistribuicaoParam] = useState('');
    const [multiplicadorParam, setMultiplicadorParam] = useState('');
    const [periodoPadraoParam, setPeriodoPadraoParam] = useState('');
    const [colecoesParam, setColecoesParam] = useState('');
    const [colecoesPermanentesParam, setColecoesPermanentesParam] = useState('');
    const [linhasProdutosParam, setLinhasProdutosParam] = useState('');
    const [artigosProdutosParam, setArtigosProdutosParam] = useState('');
    const [artigosCotasParam, setArtigosCotasParam] = useState('');
    const [publicosAlvosParam, setPublicosAlvosParam] = useState('');
    const [embarquesParam, setEmbarquesParam] = useState('');
    const [referenciasParam, setReferenciasParam] = useState('');
    const [coresParam, setCoresParam] = useState('');
    const [origensParam, setOrigensParam] = useState('');
    const [consideraDepositosParam, setConsideraDepositosParam] = useState('');
    const [consideraProdSemEstqParam, setConsideraProdSemEstqParam] = useState('');
    const [depositosParam, setDepositosParam] = useState('');
    const [consideraProdSemProcParam, setConsideraProdSemProcParam] = useState('');
    const [consideraPedBloqueadoParam, setConsideraPedBloqueadoParam] = useState('');
    const [consideraProdSemPediParam, setConsideraProdSemPediParam] = useState('');
    const [numeroInternoParam, setNumeroInternoParam] = useState('');
    const [pedidosParam, setPedidosParam] = useState('');

    const [imagem, setImagem] = useState('');
    const [itemSelecionado, setItemSelecionado] = useState('');
    const [descItemSelecionado, setDescItemSelecionado] = useState('');
    const [tamanhosItem, setTamanhosItem] = useState([]);

    const [alternativasItem, setAlternativasItem] = useState([]);
    const [alternativaItem, setAlternativaItem] = useState([]);
    const [roteirosItem, setRoteirosItem] = useState([]);
    const [roteiroItem, setRoteiroItem] = useState([]);

    const [alternativaGravada, setAlternativaGravada] = useState(0);
    const [roteiroGravado, setRoteiroGravado] = useState(0);

    const [showImgTamanhos, setShowImgTamanhos] = useState(false);

    const [bodyItens, setBodyItens] = useState([]);
    const [bodyGradeItem, setBodyGradeItem] = useState([]);

    const [loadingSalvarItem, setLoadingSalvarItem] = useState(false);
    const [loadingSalvarGrade, setLoadingSalvarGrade] = useState(false);
    const [loadingAplicarMulti, setLoadingAplicarMulti] = useState(false);

    const { currPage } = useState(1);
    const { idPlanoMestre } = props;

    const options = {
        sizePerPageList: [5, 10, 20, 100, 10000],
        sizePerPage: 10,
        page: currPage,
        onRowClick: function (row) {
            setItemSelecionado(row.codigo);
        }
    };

    const {
        handleChange,
        setFieldValue,
        values
    } = useFormik({
        initialValues: initialValues
    });

    useEffect(() => {

        const loadItensPlanoMestre = () => {
            api.get(`plano-mestre/produtos/${idPlanoMestre}`).then((response) => {
                setItens(normalizeDados(response.data));
            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
                setItens([]);
            });
        };

        const loadParametros = () => {
            api.get(`plano-mestre/parametros/${idPlanoMestre}`).then((response) => {
                setTipoDistribuicaoParam(response.data.descTipoDistribuicao);
                setMultiplicadorParam(response.data.multiplicador);
                setPeriodoPadraoParam(response.data.periodoPadrao);
                setColecoesParam(response.data.colecoes);
                setColecoesPermanentesParam(response.data.colecoes_permanentes);
                setLinhasProdutosParam(response.data.linhas_produtos);
                setArtigosProdutosParam(response.data.artigos_produtos);
                setArtigosCotasParam(response.data.artigos_cotas);
                setPublicosAlvosParam(response.data.publicos_alvos);
                setEmbarquesParam(response.data.embarques);
                setReferenciasParam(response.data.referencias);
                setCoresParam(response.data.cores);
                setOrigensParam(response.data.origens_produtos);
                setConsideraDepositosParam(response.data.considera_deposito ? 'Sim' : 'Não');
                setConsideraProdSemEstqParam(response.data.considera_prod_sem_estq ? 'Sim' : 'Não');
                setDepositosParam(response.data.depositos);
                setConsideraProdSemProcParam(response.data.considera_prod_sem_proc ? 'Sim' : 'Não');
                setConsideraPedBloqueadoParam(response.data.considera_pedido_bloq ? 'Sim' : 'Não');
                setConsideraProdSemPediParam(response.data.considera_prod_sem_pedi ? 'Sim' : 'Não');
                setNumeroInternoParam(response.data.numero_interno);
                setPedidosParam(response.data.pedidos);
                setPlano1(`${response.data.plano1_dem_inicio} - ${response.data.plano1_dem_fim}`);
                setPlano2(`${response.data.plano2_dem_inicio} - ${response.data.plano2_dem_fim}`);
                setPlano3(`${response.data.plano3_dem_inicio} - ${response.data.plano3_dem_fim}`);
                setPlano4(`${response.data.plano4_dem_inicio} - ${response.data.plano4_dem_fim}`);
                setPlano5(`${response.data.plano5_dem_inicio} - ${response.data.plano5_dem_fim}`);
                setPlano6(`${response.data.plano6_dem_inicio} - ${response.data.plano6_dem_fim}`);
                setPlano7(`${response.data.plano7_dem_inicio} - ${response.data.plano7_dem_fim}`);
                setPlano8(`${response.data.plano8_dem_inicio} - ${response.data.plano8_dem_fim}`);
            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
            });
        };

        loadItensPlanoMestre();
        loadParametros();

    }, [idPlanoMestre]);

    useEffect(() => {

        const loadImagem = () => {
            let conteudo = "";
            let referencia = "";
            let cor = "";

            conteudo = itemSelecionado.split(".");
            referencia = conteudo[0];
            cor = conteudo[1];

            setImagem(`/images/${referencia}_${cor}_1.jpg`);
        };

        const loadDescricaoItem = () => {
            api.get(`produtos/item/${itemSelecionado}`).then((response) => {
                setDescItemSelecionado(`${itemSelecionado} - ${response.data.descricao}`);
            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
                setDescItemSelecionado('');
            });
        };

        const loadTamanhosItem = () => {
            api.get(`plano-mestre/tamanhos/${idPlanoMestre}/${itemSelecionado}`).then((response) => {
                setTamanhosItem(normalizeTamanhos(response.data));
            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
                setTamanhosItem([]);
            });
        };

        const loadAlternativasItem = () => {
            api.get(`produtos/alternativas/${itemSelecionado}`).then((response) => {
                setAlternativasItem(normalizeAlternativas(response.data));
            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
                setAlternativasItem([]);
            });
        };


        const loadParamProgItem = () => {
            api.get(`plano-mestre/param-prog-item/${idPlanoMestre}/${itemSelecionado}`).then((response) => {
                setAlternativaGravada(response.data.alternativa);
                setFieldValue('periodoPadraoItem', response.data.periodo);
                setFieldValue('multiplicadorItem', response.data.multiplicador);
                api.get(`produtos/roteiros/${itemSelecionado}/${response.data.alternativa}`).then((responseRot) => {
                    setRoteirosItem(normalizeRoteiros(responseRot.data));
                    setRoteiroGravado(response.data.roteiro);
                }).catch((e) => {
                    console.log('ocorreu algum erro!');
                    console.error(e);
                    setRoteirosItem([]);
                    setRoteiroGravado(0)
                });

            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
                setAlternativaGravada(0);
                setRoteiroGravado(0);
            });
        };

        if (itemSelecionado !== null && itemSelecionado !== undefined && itemSelecionado !== '') {
            loadImagem();
            loadDescricaoItem();
            loadTamanhosItem();
            loadAlternativasItem();
            loadParamProgItem();
            setShowImgTamanhos(true);
        } else {
            setShowImgTamanhos(false);
        }

    }, [idPlanoMestre, itemSelecionado, setFieldValue]);

    useEffect(() => {
        setAlternativaItem(alternativasItem.find(o => o.value === alternativaGravada));
    }, [alternativaGravada, alternativasItem]);

    useEffect(() => {
        setRoteiroItem(roteirosItem.find(o => o.value === roteiroGravado));
    }, [roteiroGravado, roteirosItem]);

    useEffect(() => {

        const obterBodyItens = () => {
            setBodyItens({
                idPlanoMestre: idPlanoMestre,
                itensPlanoMestre: itens
            });
        };

        obterBodyItens();

    }, [idPlanoMestre, itens]);

    useEffect(() => {
        const obterBodyGradeTamanhos = () => {
            setBodyGradeItem({
                idPlanoMestre: idPlanoMestre,
                codigoGrupoCor: itemSelecionado,
                gradeTamanhosItem: tamanhosItem
            });
        };

        obterBodyGradeTamanhos();

    }, [idPlanoMestre, itemSelecionado, tamanhosItem]);

    const loadRoteirosAlternativa = (nrAlternativa) => {
        api.get(`produtos/roteiros/${itemSelecionado}/${nrAlternativa}`).then((responseRot) => {
            setRoteirosItem(normalizeRoteiros(responseRot.data));
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setRoteirosItem([]);
        });
    }

    const salvarParametrosProgramacao = async event => {

        setLoadingAplicarMulti(true);

        const body = ({
            idPlanoMestre: idPlanoMestre,
            codGrupoItemProg: itemSelecionado,
            alternativaProg: alternativaItem.value,
            roteiroProg: roteiroItem.value,
            periodoProg: values.periodoPadraoItem,
            multiplicadorProg: values.multiplicadorItem
        });

        try {
            const response = await api.post('plano-mestre/salvar-param-programacao', body);
            setTamanhosItem(normalizeTamanhos(response.data));

            try {
                const responseProdutos = await api.get(`plano-mestre/produtos/${idPlanoMestre}`);
                setItens(normalizeDados(responseProdutos.data));
            } catch (e) {
                console.log('ocorreu algum erro!');
                console.error(e);
                setItens([]);
            }
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
            setTamanhosItem([]);
        }

        setLoadingAplicarMulti(false);
    };

    const onSalvarAlteracaoItens = async event => {

        setLoadingSalvarItem(true);

        try {
            const response = await api.post('plano-mestre/salvar-itens', bodyItens);
            setItens(normalizeDados(response.data));

            try {
                const responseTamanhos = await api.get(`plano-mestre/tamanhos/${idPlanoMestre}/${itemSelecionado}`);
                setTamanhosItem(normalizeTamanhos(responseTamanhos.data));
            } catch (e) {
                console.log('ocorreu algum erro!');
                console.error(e);
                setTamanhosItem([]);
            }

        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
            setItens([]);
        }

        setLoadingSalvarItem(false);
    };

    const onCancelarAlteracaoItens = () => {
        api.get(`plano-mestre/produtos/${idPlanoMestre}`).then((response) => {
            setItens(normalizeDados(response.data));
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setItens([]);
        });
    };

    const onSalvarAlteracaoGrade = async event => {

        setLoadingSalvarGrade(true);

        try {
            const response = await api.post('plano-mestre/salvar-grade', bodyGradeItem);
            setTamanhosItem(normalizeTamanhos(response.data));

            try {
                const responseProdutos = await api.get(`plano-mestre/produtos/${idPlanoMestre}`);
                setItens(normalizeDados(responseProdutos.data));
            } catch (e) {
                console.log('ocorreu algum erro!');
                console.error(e);
                setItens([]);
            }

        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
            setTamanhosItem([]);
        }

        setLoadingSalvarGrade(false);
    };

    const onCancelarAlteracaoGrade = () => {
        api.get(`plano-mestre/tamanhos/${idPlanoMestre}/${itemSelecionado}`).then((response) => {
            setTamanhosItem(normalizeTamanhos(response.data));
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setTamanhosItem([]);
        });
    };

    return (
        <div>
            <Accordion >
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
                    <>
                        <h3>
                            Parâmetros:
                        </h3>
                        <br></br>

                        <h4>
                            Global
                        </h4>

                        <Form.Row>
                            <Form.Group as={Col} md="3" controlId="tipo-distribuicao">
                                <Form.Label>
                                    Tipo de Distribuição
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tipo-distribuicao"
                                    disabled
                                    value={tipoDistribuicaoParam}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="1" controlId="multiplicador">
                                <Form.Label>
                                    Multiplicador
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="multiplicador"
                                    disabled
                                    value={multiplicadorParam}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="2" controlId="periodo-padrao">
                                <Form.Label>
                                    Período de Produção (Padrão)
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="periodo-padrao"
                                    disabled
                                    value={periodoPadraoParam}
                                />
                            </Form.Group>
                        </Form.Row>

                        <h4>
                            Análise de Produtos
                        </h4>

                        <Form.Row>
                            <Form.Group as={Col} md="3" controlId="colecoes">
                                <Form.Label>
                                    Coleções
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="colecoes"
                                    disabled
                                    value={colecoesParam}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="3" controlId="colecoes-permanentes">
                                <Form.Label>
                                    Coleções Permanentes
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="colecoes-permanentes"
                                    disabled
                                    value={colecoesPermanentesParam}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="3" controlId="linhas_produtos">
                                <Form.Label>
                                    Linhas de Produto
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="linhas_produtos"
                                    disabled
                                    value={linhasProdutosParam}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="3" controlId="artigos_produtos">
                                <Form.Label>
                                    Artigos de Produto
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="artigos_produtos"
                                    disabled
                                    value={artigosProdutosParam}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="3" controlId="artigos_cotas">
                                <Form.Label>
                                    Artigo de Cotas
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="artigos_cotas"
                                    disabled
                                    value={artigosCotasParam}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="3" controlId="publicos_alvos">
                                <Form.Label>
                                    Publico Alvo
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="publicos_alvos"
                                    disabled
                                    value={publicosAlvosParam}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="embarques">
                                <Form.Label>
                                    Embarques
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="embarques"
                                    disabled
                                    value={embarquesParam}
                                />
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="referencias">
                                <Form.Label>
                                    Referências
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="referencias"
                                    disabled
                                    value={referenciasParam}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="cores">
                                <Form.Label>
                                    Cores
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cores"
                                    disabled
                                    value={coresParam}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="3" controlId="origens_produtos">
                                <Form.Label>
                                    Origem Produto
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="origens_produtos"
                                    disabled
                                    value={origensParam}
                                />
                            </Form.Group>
                        </Form.Row>

                        <h4>
                            Planejamento
                            </h4>

                        <Form.Row>
                            <Form.Group as={Col} md="2" controlId="considera_deposito">
                                <Form.Label>
                                    Considera Depósitos?
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="considera_deposito"
                                    disabled
                                    value={consideraDepositosParam}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="2" controlId="considera_prod_sem_estq">
                                <Form.Label>
                                    Considera Produto Sem Estoque?
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="considera_prod_sem_estq"
                                    disabled
                                    value={consideraProdSemEstqParam}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="2" controlId="depositos">
                                <Form.Label>
                                    Depósitos
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="depositos"
                                    disabled
                                    value={depositosParam}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="2" controlId="considera_prod_sem_proc">
                                <Form.Label>
                                    Considera Produto Sem Processo?
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="considera_prod_sem_proc"
                                    disabled
                                    value={consideraProdSemProcParam}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="2" controlId="considera_pedido_bloq">
                                <Form.Label>
                                    Pedidos Bloqueados?
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="considera_pedido_bloq"
                                    disabled
                                    value={consideraPedBloqueadoParam}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="2" controlId="considera_prod_sem_pedi">
                                <Form.Label>
                                    Considera Produto Sem Pedido?
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="considera_prod_sem_pedi"
                                    disabled
                                    value={consideraProdSemPediParam}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="2" controlId="numero_interno">
                                <Form.Label>
                                    Numero Interno
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="numero_interno"
                                    disabled
                                    value={numeroInternoParam}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="pedidos">
                                <Form.Label>
                                    Pedidos
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="pedidos"
                                    disabled
                                    value={pedidosParam}
                                />
                            </Form.Group>
                        </Form.Row>
                    </>
                </Accordion.Collapse>

            </Accordion>

            <Button variant="success" onClick={onSalvarAlteracaoItens} disabled={loadingSalvarItem}>
                {loadingSalvarItem ?
                    <Spinner
                        show="false"
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    /> : ''}
                Salvar
            </Button>

            <Button variant="danger" onClick={onCancelarAlteracaoItens} hidden={true}>
                Cancelar
            </Button>

            <ItensPlanoTable
                {...props}
                itens={itens}
                options={options}
                plano1={plano1}
                plano2={plano2}
                plano3={plano3}
                plano4={plano4}
                plano5={plano5}
                plano6={plano6}
                plano7={plano7}
                plano8={plano8}
            />

            {showImgTamanhos && (
                <Container fluid>
                    <Row>
                        <Col xl={1} md={1}>
                            <Figure>
                                <Figure.Image
                                    width={171}
                                    height={180}
                                    alt="171x180"
                                    src={imagem}
                                />
                            </Figure>
                        </Col>
                        <Col xl={5} md={3}>

                            <h4>
                                <b>PRODUTO:</b> <i>{descItemSelecionado}</i>
                            </h4>

                            <Form id="param-programacao-item" noValidate>
                                <Form.Row>
                                    <Form.Group as={Col} md="8" controlId="alternativaItem">
                                        <Form.Label>
                                            Alternativa
                                        </Form.Label>
                                        <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe a alternativa"
                                            name="alternativaItem"
                                            options={alternativasItem}
                                            value={alternativaItem}
                                            onChange={(selected) => {
                                                setAlternativaItem(selected);
                                                loadRoteirosAlternativa(selected.value);
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="2" controlId="roteiroItem">
                                        <Form.Label>
                                            Roteiro
                                        </Form.Label>
                                        <Select className="basic-multi-select" classNamePrefix="select" placeholder=""
                                            name="roteiroItem"
                                            options={roteirosItem}
                                            value={roteiroItem}
                                            onChange={(selected) => {
                                                setRoteiroItem(selected);
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="2" controlId="periodoPadraoItem">
                                        <Form.Label>
                                            Período de Produção
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            maxLength="9999"
                                            name="periodoPadraoItem"
                                            value={values.periodoPadraoItem}
                                            onChange={handleChange}
                                            onBlur={() => {
                                                //props.setPeriodoPadraoInfo(values.periodoPadrao);
                                            }}
                                        />
                                    </Form.Group>

                                </Form.Row>

                                <Form.Row>

                                    <Form.Group as={Col} md="2" controlId="multiplicadorItem">
                                        <Form.Label>
                                            Multiplicador
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            maxLength="9999"
                                            name="multiplicadorItem"
                                            value={values.multiplicadorItem}
                                            onChange={handleChange}
                                            onBlur={() => {
                                                //props.setPeriodoPadraoInfo(values.periodoPadrao);
                                            }}
                                        />
                                    </Form.Group>

                                </Form.Row>

                                <Button
                                    variant="success"
                                    onClick={salvarParametrosProgramacao}
                                    disabled={loadingAplicarMulti}
                                >
                                    {loadingAplicarMulti ?
                                        <Spinner
                                            show="false"
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        /> : ''}
                                    Salvar
                                </Button>
                            </Form>
                        </Col>

                        <Col>

                            <Button variant="success" onClick={onSalvarAlteracaoGrade} disabled={loadingSalvarGrade}>
                                {loadingSalvarGrade ?
                                    <Spinner
                                        show="false"
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    /> : ''}
                                Salvar
                            </Button>

                            <Button variant="danger" onClick={onCancelarAlteracaoGrade} hidden={true}>
                                Cancelar
                            </Button>

                            <TamanhosPlanoTable
                                {...props}
                                tamanhosItem={tamanhosItem}
                            />
                        </Col>

                    </Row>
                </Container>
            )}
        </div>
    );
}

const FormModal = (props) => {

    return (
        <Modal dialogClassName="modal-full" show={props.show} onHide={props.onClose} animation={true}>
            <Modal.Header>
                <Modal.Title>{`Plano Mestre de Produção: ${props.idPlanoMestre} - ${props.descPlanoMestre}`}</Modal.Title>
                <div>
                    <Button
                        variant="secondary"
                        onClick={props.onClose}
                        style={{ marginLeft: '10px' }}
                    >
                        Voltar
                    </Button>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="aba1" transition={false} id="abas-plano-mestre-gerado">
                    <Tab eventKey="aba1" title="Plano" >
                        <ItensPlanoMestre
                            {...props}
                        />
                    </Tab>
                    <Tab eventKey="aba2" title="Ocupação" >
                        <OcupacaoEstagio
                            {...props}
                        />
                    </Tab>
                    <Tab eventKey="aba3" title="Pré-Ordens" >
                        <PreOrdens
                            {...props}
                        />
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    );
};

FormModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    idPlanoMestre: PropTypes.number.isRequired,
    descPlanoMestre: PropTypes.string
};

export default FormModal;