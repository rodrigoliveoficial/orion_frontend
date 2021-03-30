import React, { useEffect, useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import Select from 'react-select';
import api from '../../services/api';
import ItensTable from './ItensTable';
import ConfirmDialog from '../../components/Alert/ConfirmDialog';

const formStyle = { marginLeft: '20px', marginTop: '20px', marginRight: '20px' };

const loadColecoes = () => api.get('colecoes');
const loadColecoesPermanentes = () => api.get('colecoes-permanentes');

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

const normalizeDadosConsulta = (dados) => {
    return dados.map((c) => {
        return {
            id: `${c.grupo}.${c.item}`,
            descricao: c.descricao,
            situacao: c.sugCancelProducao ? "Sugerido cancelamento" : "Disponível para planejamento"
        };
    });
};

const SugestaoCancelamento = (props) => {

    const [colecoes, setColecoes] = useState([]);
    const [colecoesPermanentes, setColecoesPermanentes] = useState([]);
    const [colecoesParam, setColecoesParam] = useState([]);
    const [colecoesPermParam, setColecoesPermParam] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [produtosParam, setProdutosParam] = useState([]);
    const [cores, setCores] = useState([]);
    const [coresParam, setCoresParam] = useState([]);
    const [bodyParamAgrupadores, setBodyParamAgrupadores] = useState([]);

    const [dadosConsulta, setDadosConsulta] = useState([]);
    const [itensSelected, setItensSelected] = useState([]);

    const [showConfirmaSugestaoAlert, setShowConfirmaSugestaoAlert] = useState(false);
    const [showConfirmaRemoverSugestaoAlert, setShowConfirmaRemoverSugestaoAlert] = useState(false);

    const [disabledButtons, setDisabledButtons] = useState(true);
    const [bodyParametros, setbodyParametros] = useState([]);

    const [loading, setLoading] = useState(false);

    const load = () => {

        Promise.all([
            loadColecoes(),
            loadColecoesPermanentes()
        ])
            .then(([
                responseColecoes,
                responseColecoesPermanentes
            ]) => {
                setColecoes(normalizeDados(responseColecoes.data));
                setColecoesPermanentes(normalizeDados(responseColecoesPermanentes.data));
            })
            .catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
            });
    };

    useEffect(() => {
        const obterParamAgrupadores = () => {
            setBodyParamAgrupadores({
                colecoes: colecoesParam,
                colecoesPermanentes: colecoesPermParam,
                referencias: produtosParam,
                cores: coresParam
            });
        };
        obterParamAgrupadores();
    }, [colecoesParam, colecoesPermParam, produtosParam, coresParam]);

    useEffect(() => {

        const getProdutos = () => {
            api.post('produtos/produtos-colecoes', bodyParamAgrupadores).then((response) => {
                setProdutos(normalizeProduto(response.data));
            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
                setProdutos([]);
            }).finally();
        };

        const getCores = () => {
            api.post('produtos/cores-colecoes', bodyParamAgrupadores).then((response) => {
                setCores(normalizeCores(response.data));
            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
                setProdutos([]);
            }).finally();
        };

        getProdutos();
        getCores();

    }, [bodyParamAgrupadores]);

    useEffect(() => {

        const obterParametros = () => {
            setbodyParametros({
                selecionados: itensSelected
            });
        };

        obterParametros();

        if (itensSelected.length > 0) {
            setDisabledButtons(false);
        }
        else {
            setDisabledButtons(true);
        }

    }, [itensSelected]);

    useEffect(() => {
        load();
        setProdutos([]);
    }, []);

    const consultarItens = async event => {

        setLoading(true);
        setItensSelected([]);

        console.log(bodyParamAgrupadores);

        try {
            const response = await api.post('produtos/itens-colecoes', bodyParamAgrupadores);
            setDadosConsulta(normalizeDadosConsulta(response.data));
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
            setDadosConsulta([]);
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
            setItensSelected(dadosConsulta.map(d => d.id));
        }

        return isSelected;
    }

    const handleConfirmaSugCancelamento = () => {
        api.post('item-sugestao-cancel/sugerir', bodyParametros).then(() => {

            setItensSelected([]);

            api.post('produtos/itens-colecoes', bodyParamAgrupadores).then((response) => {
                console.log(response.data);
                setDadosConsulta(normalizeDadosConsulta(response.data));
            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
                setDadosConsulta([]);
            }).finally();

        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
        }).finally(() => setShowConfirmaSugestaoAlert(false));

    };

    const handleConfirmaRemoverSugCancelamento = () => {
        api.post('item-sugestao-cancel/remover', bodyParametros).then(() => {

            setItensSelected([]);

            api.post('produtos/itens-colecoes', bodyParamAgrupadores).then((response) => {
                console.log(response.data);
                setDadosConsulta(normalizeDadosConsulta(response.data));
            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
                setDadosConsulta([]);
            }).finally();

        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
        }).finally(() => setShowConfirmaRemoverSugestaoAlert(false));

    };

    const selectRowPropAux = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: onRowSelect,
        onSelectAll: onSelectAll,
        selected: itensSelected,
        bgColor: 'rgb(193, 219, 238)'
    };

    return (
        <div style={formStyle}>

            <h2><b>Sugestão de Cancelamento</b></h2>
            <br></br>

            <Form.Row>
                <Form.Group as={Col} md="5" controlId="colecao">
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
                        }}
                    />
                </Form.Group>

                <Form.Group as={Col} md="5" controlId="colecao-permanente">
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
                        }}
                    />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="5" controlId="referencia">
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
                        }}
                    />
                </Form.Group>

                <Form.Group as={Col} md="5" controlId="cor">
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
                        }}
                    />
                </Form.Group>
            </Form.Row>

            <br></br>

            <Button onClick={consultarItens} disabled={loading}
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
                            Consultar

            </Button>
            <Button onClick={() => { setShowConfirmaSugestaoAlert(true) }} variant="success" disabled={disabledButtons}>
                Sugerir Cancelamento
            </Button>
            <Button onClick={() => { setShowConfirmaRemoverSugestaoAlert(true) }} variant="danger" disabled={disabledButtons}>
                Remover Sugestão
            </Button>

            <br></br>
            <br></br>

            <ItensTable
                {...props}
                dadosConsulta={dadosConsulta}
                selectRowPropAux={selectRowPropAux}
            />

            {showConfirmaSugestaoAlert && (
                <ConfirmDialog
                    title="Confirma a sugestão de cancelamento para os itens selecionados?"
                    content=""
                    handleCancel={() => setShowConfirmaSugestaoAlert(false)}
                    handleConfirm={handleConfirmaSugCancelamento}
                />
            )}

            {showConfirmaRemoverSugestaoAlert && (
                <ConfirmDialog
                    title="Confirma a remoção da sugestão de cancelamento dos itens selecionados?"
                    content=""
                    handleCancel={() => setShowConfirmaRemoverSugestaoAlert(false)}
                    handleConfirm={handleConfirmaRemoverSugCancelamento}
                />
            )}

        </div>
    );
}

export default SugestaoCancelamento;