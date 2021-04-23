import React, { useEffect, useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import Select from 'react-select';
import api from '../../services/api';
import Figure from 'react-bootstrap/Figure'
import PrevisaoVendasItensTable from './PrevisaoVendasItensTable';

const formStyle = { marginLeft: '20px', marginTop: '20px', marginRight: '20px' };

const loadColecoes = () => api.get('colecoes');
const loadTabelasPreco = () => api.get('tabelas-preco');

const normalizeDados = (dados) => {
    return dados.map((c) => {
        return {
            value: c.id,
            label: `${c.id} - ${c.descricao}`
        };
    });
};

const normalizeTabelasPreco = (dados) => {
    return dados.map((c) => {
        return {
            value: c.id,
            label: `${c.colecao} . ${c.mes} . ${c.sequencia} - ${c.descricao}`
        };
    });
};

const PrevisaoVendasItens = (props) => {

    const [colecoes, setColecoes] = useState([]);
    const [tabelasPreco, setTabelasPreco] = useState([]);
    const [previsaoVendas, setPrevisaoVendas] = useState([]);

    const [colecao, setColecao] = useState([]);
    const [tabelaSellIn, setTabelaSellIn] = useState([]);
    const [tabelaSellOut, setTabelaSellOut] = useState([]);

    const [colecaoInfo, setColecaoInfo] = useState(0);
    const [tabelaSellInInfo, setTabelaSellInInfo] = useState('');
    const [tabelaSellOutInfo, setTabelaSellOutInfo] = useState('');

    const [loading, setLoading] = useState(false);
    const [desabilitarBotoes, setDesabilitarBotoes] = useState(true);

    const [imagem, setImagem] = useState('');
    const [showImagem, setShowImagem] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState('');

    const [currPage, setCurrPage] = useState(1);

    const options = {
        sizePerPageList: [5, 10, 20, 100, 10000],
        sizePerPage: 10,
        page: currPage,
        onRowClick: function (row) {
            setItemSelecionado(`${row.grupo}.${row.item}`);
        },
        onPageChange: function (page) {
            setCurrPage(page);
            setItemSelecionado('');
        }
    };

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

        if (itemSelecionado !== null && itemSelecionado !== undefined && itemSelecionado !== '') {
            loadImagem();
            setShowImagem(true);
        } else {
            setShowImagem(false);
        }

    }, [itemSelecionado]);

    const load = () => {

        Promise.all([
            loadColecoes(),
            loadTabelasPreco()
        ])
            .then(([
                responseColecoes,
                responseTabelasPreco
            ]) => {
                setColecoes(normalizeDados(responseColecoes.data));
                setTabelasPreco(normalizeTabelasPreco(responseTabelasPreco.data));
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
        setDesabilitarBotoes(true);
        if ((colecaoInfo !== 0) && (tabelaSellInInfo !== '') && (tabelaSellOutInfo !== '')) setDesabilitarBotoes(false);
    }, [colecaoInfo, tabelaSellInInfo, tabelaSellOutInfo]);

    const consultaPrevisaoVendasColecao = (colecao) => {
        api.get(`previsao-vendas/${colecao}`).then((response) => {
            setPrevisaoVendas(response.data);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setPrevisaoVendas([]);
        });
    }

    const obterIdTabelaSellIn = (colecao) => {
        api.get(`previsao-vendas/id-tabela-sell-in/${colecao}`).then((response) => {
            setTabelaSellIn(tabelasPreco.find(o => o.value === response.data));
            setTabelaSellInInfo(response.data);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setTabelaSellIn([])
        });
    }

    const obterIdTabelaSellOut = (colecao) => {
        api.get(`previsao-vendas/id-tabela-sell-out/${colecao}`).then((response) => {
            setTabelaSellOut(tabelasPreco.find(o => o.value === response.data));
            setTabelaSellOutInfo(response.data);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setTabelaSellOut([])
        });
    }

    const salvarPrevisaoVendas = async event => {

        setLoading(true);

        const body = ({
            colecao: colecaoInfo,
            idTabelaPrecoSellIn: tabelaSellInInfo,
            idTabelaPrecoSellOut: tabelaSellOutInfo,
            previsoesVendas: previsaoVendas
        });

        try {
            const response = await api.post('previsao-vendas', body);
            setPrevisaoVendas(response.data);
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
            setPrevisaoVendas([]);
        }

        setLoading(false);
    };

    return (
        <div style={formStyle}>

            <h2><b>Previsão de Vendas</b></h2>
            <br></br>

            <Form.Row>
                <Form.Group as={Col} md="4" controlId="colecao">
                    <Form.Label>
                        Coleção
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe a coleção."
                        name="colecao"
                        options={colecoes}
                        value={colecao}
                        onChange={(selected) => {
                            setColecao(selected);
                            setColecaoInfo(selected.value);
                            obterIdTabelaSellIn(selected.value);
                            obterIdTabelaSellOut(selected.value);
                            consultaPrevisaoVendasColecao(selected.value);
                        }}
                    />
                </Form.Group>

            </Form.Row>
            <Form.Row>

                <Form.Group as={Col} md="4" controlId="tabelaSellIn">
                    <Form.Label>
                        Tabela de Preço (Sell IN)
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe a tabela Sell IN"
                        name="tabelaSellIn"
                        options={tabelasPreco}
                        value={tabelaSellIn}
                        onChange={(selected) => {
                            setTabelaSellIn(selected);
                            setTabelaSellInInfo(selected.value);
                        }}
                    />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="tabelaSellOut">
                    <Form.Label>
                        Tabela de Preço (Sell OUT)
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe a tabela Sell OUT"
                        name="tabelaSellOut"
                        options={tabelasPreco}
                        value={tabelaSellOut}
                        onChange={(selected) => {
                            setTabelaSellOut(selected);
                            setTabelaSellOutInfo(selected.value);
                        }}
                    />
                </Form.Group>
            </Form.Row>

            <br></br>

            <Button variant="success" onClick={salvarPrevisaoVendas} disabled={desabilitarBotoes}
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
                            Salvar

            </Button>
            <Button variant="danger" disabled={desabilitarBotoes} hidden={true}>
                Cancelar
            </Button>

            <br></br>
            <br></br>

            <PrevisaoVendasItensTable
                {...props}
                options={options}
                previsaoVendas={previsaoVendas}
            />

            {showImagem && (
                <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src={imagem}
                    />
                </Figure>
            )}
        </div>
    );
}

const FormModal = (props) => {

    return (
        <Modal dialogClassName="modal-full" show={props.show} onHide={props.onClose} animation={true}>
            <Modal.Header>
                <Modal.Title>{`Previsão de Vendas: ${props.editMode ? 'Edição' : 'Inserção'}`}</Modal.Title>
                <div>
                    <Button
                        variant="primary"
                        type="submit"
                        form="previsao-vendas-form-salvar"
                    >
                        Salvar
                    </Button>

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
                <PrevisaoVendasItens
                    {...props}
                />
            </Modal.Body>
        </Modal>
    );
};

FormModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default FormModal;