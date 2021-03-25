import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Form, Col
} from 'react-bootstrap';
import Select from 'react-select';
import api from '../../../services/api';

const loadColecoes = () => api.get('colecoes');
const loadColecoesPermanentes = () => api.get('colecoes-permanentes');
const loadLinhasProduto = () => api.get('linhasproduto');
const loadArtigosProduto = () => api.get('artigosproduto');
const loadArtigosCotas = () => api.get('artigoscotas');
const loadPublicos = () => api.get('publicos');
const loadEmbarques = () => api.get('produtos/embarques');

const normalizeDados = (dados) => {
    return dados.map((c) => {
        return {
            value: c.id,
            label: `${c.id} - ${c.descricao}`
        };
    });
};

const normalizeProduto = (dados) => {
    return dados.map((c) => {
        return {
            value: c.grupo,
            label: `${c.grupo} - ${c.descricao}`
        };
    });
};

const normalizeCores = (dados) => {
    return dados.map((c) => {
        return {
            value: c.item,
            label: `${c.item} - ${c.descricao}`
        };
    });
};

const normalizeEmbarques = (dados) => {
    return dados.map((c) => {
        return {
            value: c.id,
            label: c.descricao
        };
    });
};

const optionsOrigProduto = [
    { value: 1, label: 'NACIONAL' },
    { value: 2, label: 'IMPORTADO' },
    { value: 3, label: 'SEM CLASSIFICACAO' }
]

const AbaAnalise = (props) => {

    const [colecoes, setColecoes] = useState([]);
    const [colecoesPermanentes, setColecoesPermanentes] = useState([]);
    const [linhasProduto, setLinhasProduto] = useState([]);
    const [artigosProduto, setArtigosProduto] = useState([]);
    const [artigosCotas, setArtigosCotas] = useState([]);
    const [publicos, setPublicos] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [cores, setCores] = useState([]);
    const [embarques, setEmbarques] = useState([]);
    const [bodyParamAgrupadores, setBodyParamAgrupadores] = useState([]);

    const [colecoesParam, setColecoesParam] = useState([]);
    const [colecoesPermParam, setColecoesPermParam] = useState([]);
    const [linhasProdutoParam, setLinhasProdutoParam] = useState([]);
    const [artigosProdutoParam, setArtigosProdutoParam] = useState([]);
    const [artigoCotasParam, setArtigosCotasParam] = useState([]);
    const [publicosParam, setPublicosParam] = useState([]);
    const [embarquesParam, setEmbarquesParam] = useState([]);

    const [produtosParam, setProdutosParam] = useState([]);
    const [coresParam, setCoresParam] = useState([]);
    const [origProdutoParam, setOrigProdutoParam] = useState([]);

    const load = () => {

        Promise.all([
            loadColecoes(),
            loadColecoesPermanentes(),
            loadLinhasProduto(),
            loadArtigosProduto(),
            loadArtigosCotas(),
            loadPublicos(),
            loadEmbarques()
        ])
            .then(([
                responseColecoes,
                responseColecoesPermanentes,
                responseLinhasProduto,
                responseArtigosProduto,
                responseArtigosCotas,
                responsePublicos,
                responseEmbarques
            ]) => {
                setColecoes(normalizeDados(responseColecoes.data));
                setColecoesPermanentes(normalizeDados(responseColecoesPermanentes.data));
                setLinhasProduto(normalizeDados(responseLinhasProduto.data));
                setArtigosProduto(normalizeDados(responseArtigosProduto.data));
                setArtigosCotas(normalizeDados(responseArtigosCotas.data));
                setPublicos(normalizeDados(responsePublicos.data));
                setEmbarques(normalizeEmbarques(responseEmbarques.data));
            })
            .catch((e) => {
                console.log('ocorreu algum erro (1)!');
                console.error(e);
            });
    };

    useEffect(() => {
        const obterParamAgrupadores = () => {
            setBodyParamAgrupadores({
                colecoes: colecoesParam,
                colecoesPermanentes: colecoesPermParam
            });
        };
        obterParamAgrupadores();
    }, [colecoesParam, colecoesPermParam]);

    useEffect(() => {

        const getProdutos = () => {
            api.post('produtos/produtos-colecoes', bodyParamAgrupadores).then((response) => {
                setProdutos(normalizeProduto(response.data));
            }).catch((e) => {
                console.log('ocorreu algum erro (2)!');
                console.error(e);
                setProdutos([]);
            }).finally();
        };

        const getCores = () => {
            api.post('produtos/cores-colecoes', bodyParamAgrupadores).then((response) => {
                setCores(normalizeCores(response.data));
            }).catch((e) => {
                console.log('ocorreu algum erro (3)!');
                console.error(e);
                setCores([]);
            }).finally();
        };

        if ((bodyParamAgrupadores.colecoes !== undefined && bodyParamAgrupadores.colecoes !== null) || 
            (bodyParamAgrupadores.colecoesPermanentes !== undefined && bodyParamAgrupadores.colecoesPermanentes !== null)) {
            getProdutos();
            getCores();
        }

    }, [bodyParamAgrupadores]);

    useEffect(() => {
        load();
        setProdutos([]);
    }, []);

    return (

        <div>
            <br></br>
            <h4>
                Parâmetros Agrupadores
            </h4>

            <Form.Row>
                <Form.Group as={Col} md="8" controlId="colecao">
                    <Form.Label>
                        Coleções
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe as coleções..."
                        name="colecoesParam"
                        options={colecoes}
                        value={colecoesParam}
                        isMulti
                        onChange={(selected) => {
                            setColecoesParam(selected);
                            props.setColecoesSelected(selected);
                        }}
                    />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="8" controlId="colecao-permanente">
                    <Form.Label>
                        Coleções Permanentes
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe as coleções permanentes..."
                        name="colecoesPermParam"
                        options={colecoesPermanentes}
                        value={colecoesPermParam}
                        isMulti
                        onChange={(selected) => {
                            setColecoesPermParam(selected);
                            props.setColecoesPermSelected(selected);
                        }}
                    />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="8" controlId="linha-produto">
                    <Form.Label>
                        Linhas de Produto
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe as linhas de produto..."
                        name="linhasProdutoParam"
                        options={linhasProduto}
                        value={linhasProdutoParam}
                        isMulti
                        onChange={(selected) => {
                            setLinhasProdutoParam(selected);
                            props.setLinhasProdutoSelected(selected);
                        }}
                    />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="8" controlId="artigo-produto">
                    <Form.Label>
                        Artigos de Produto
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe os artigos de produto..."
                        name="artigosProdutoParam"
                        options={artigosProduto}
                        value={artigosProdutoParam}
                        isMulti
                        onChange={(selected) => {
                            setArtigosProdutoParam(selected);
                            props.setArtigosProdutoSelected(selected);
                        }}
                    />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="8" controlId="artigo-cota">
                    <Form.Label>
                        Artigos de Cotas
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe os artigos de cotas..."
                        name="artigosCotasParam"
                        options={artigosCotas}
                        value={artigoCotasParam}
                        isMulti
                        onChange={(selected) => {
                            setArtigosCotasParam(selected);
                            props.setArtigosCotasSelected(selected);
                        }}
                    />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="8" controlId="publico-alvo">
                    <Form.Label>
                        Publico Alvo
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe os publicos alvo..."
                        name="publicosParam"
                        options={publicos}
                        value={publicosParam}
                        isMulti
                        onChange={(selected) => {
                            setPublicosParam(selected);
                            props.setPublicoAlvoSelected(selected);
                        }}
                    />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="8" controlId="embarque">
                    <Form.Label>
                        Embarques
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe os embarques..."
                        name="embarquesParam"
                        options={embarques}
                        value={embarquesParam}
                        isMulti
                        onChange={(selected) => {
                            setEmbarquesParam(selected);
                            props.setEmbarquesSelected(selected);
                        }}
                    />
                </Form.Group>
            </Form.Row>

            <h4>
                Produtos Específicos
            </h4>

            <Form.Row>
                <Form.Group as={Col} md="8" controlId="referencia">
                    <Form.Label>
                        Referências
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe as referências..."
                        name="referenciasParam"
                        options={produtos}
                        value={produtosParam}
                        isMulti
                        onChange={(selected) => {
                            setProdutosParam(selected);
                            props.setProdutosSelected(selected);
                        }}
                    />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="8" controlId="cor">
                    <Form.Label>
                        Cores
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe as cores..."
                        name="coresParam"
                        options={cores}
                        value={coresParam}
                        isMulti
                        onChange={(selected) => {
                            setCoresParam(selected);
                            props.setCoresSelected(selected);
                        }}
                    />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="8" controlId="origem">
                    <Form.Label>
                        Origem Produto
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe as origens..."
                        name="origensParam"
                        options={optionsOrigProduto}
                        value={origProdutoParam}
                        isMulti
                        onChange={(selected) => {
                            setOrigProdutoParam(selected);
                            props.setOrigProdutoSelected(selected);
                        }}
                    />
                </Form.Group>
            </Form.Row>

        </div>
    );

}

AbaAnalise.propTypes = {
    setColecoesSelected: PropTypes.func,
    setColecoesPermSelected: PropTypes.func,
    setLinhasProdutoSelected: PropTypes.func,
    setArtigosProdutoSelected: PropTypes.func,
    setArtigosCotasSelected: PropTypes.func,
    setPublicoAlvoSelected: PropTypes.func,
    setProdutosSelected: PropTypes.func,
    setCoresSelected: PropTypes.func,
    setOrigProdutoSelected: PropTypes.func,
    setEmbarquesSelected: PropTypes.func
};

AbaAnalise.defaultProps = {
    setColecoesSelected: () => { },
    setColecoesPermSelected: () => { },
    setLinhasProdutoSelected: () => { },
    setArtigosProdutoSelected: () => { },
    setArtigosCotasSelected: () => { },
    setPublicoAlvoSelected: () => { },
    setProdutosSelected: () => { },
    setCoresSelected: () => { },
    setOrigProdutoSelected: () => { },
    setEmbarquesSelected: () => { }
};

export default AbaAnalise;