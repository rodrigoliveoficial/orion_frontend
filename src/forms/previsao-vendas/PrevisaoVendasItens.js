import React, { useEffect, useState } from 'react';
import { Modal, Form, Col, Button, Container, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner'
import Accordion from 'react-bootstrap/Accordion';
import Select from 'react-select';
import api from '../../services/api';
import Figure from 'react-bootstrap/Figure'
import PrevisaoVendasItensTable from './PrevisaoVendasItensTable';
import PrevisaoVendasItensTamTable from './PrevisaoVendasItensTamTable';

const initialValues = {
    id: 0,
    descricao: '',
    colecao: 0,
    tabelaSellIn: '',
    tabelaSellOut: ''
}

const PrevisaoVendasItens = (props) => {

    const [idPrevisaoVendasAux, setIdPrevisaoVendasAux] = useState(0);
    const [itensColecao, setItensColecao] = useState([]);
    const [tamanhosItem, setTamanhosItem] = useState([]);

    const [colecao, setColecao] = useState([]);
    const [tabelaSellIn, setTabelaSellIn] = useState([]);
    const [tabelaSellOut, setTabelaSellOut] = useState([]);

    const [colecaoInfo, setColecaoInfo] = useState(0);
    const [tabelaSellInInfo, setTabelaSellInInfo] = useState('');
    const [tabelaSellOutInfo, setTabelaSellOutInfo] = useState('');

    const [loading, setLoading] = useState(false);
    const [desabilitarBotoes, setDesabilitarBotoes] = useState(true);

    const [imagem, setImagem] = useState('');
    const [showImagemTam, setShowImagemTam] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState('');
    const [descItemSelecionado, setDescItemSelecionado] = useState('');

    const [currPage, setCurrPage] = useState(1);

    const { idPrevisaoVendas } = props;
    const { colecoes } = props;
    const { tabelasPreco } = props;
    const { editMode } = props;

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

    const {
        handleChange,
        values,
        setFieldValue
    } = useFormik({
        initialValues: initialValues
    });

    useEffect(() => {

        let tabSellIn = 0;
        let tabSellOut = 0;

        setIdPrevisaoVendasAux(idPrevisaoVendas);

        if (editMode) {
            api.get(`previsao-vendas/${idPrevisaoVendas}`).then((response) => {

                tabSellIn = `${response.data.colTabPrecoSellIn}.${response.data.mesTabPrecoSellIn}.${response.data.seqTabPrecoSellIn}`;
                tabSellOut = `${response.data.colTabPrecoSellOut}.${response.data.mesTabPrecoSellOut}.${response.data.seqTabPrecoSellOut}`;

                setFieldValue('descricao', response.data.descricao);
                setFieldValue('colecao', response.data.colecao);
                setFieldValue('tabelaSellIn', tabSellIn);
                setFieldValue('tabelaSellOut', tabSellOut);
                setColecaoInfo(response.data.colecao);
                setTabelaSellInInfo(tabSellIn);
                setTabelaSellOutInfo(tabSellOut);
                setColecao(colecoes.find(o => o.value === response.data.colecao));
                setTabelaSellIn(tabelasPreco.find(o => o.value === tabSellIn));
                setTabelaSellOut(tabelasPreco.find(o => o.value === tabSellOut));

                consultaItensColecao(idPrevisaoVendas, response.data.colecao);

            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
            });
        }

    }, [idPrevisaoVendas, editMode, colecoes, tabelasPreco, setFieldValue]);

    const loadImagem = (itemSelecionado) => {
        let conteudo = "";
        let referencia = "";
        let cor = "";

        conteudo = itemSelecionado.split(".");
        referencia = conteudo[0];
        cor = conteudo[1];

        setImagem(`/images/${referencia}_${cor}_1.jpg`);
    };

    const loadTamanhosItem = (idPrevisaoVendas, itemSelecionado) => {
        api.get(`previsao-vendas/tamanhos/${idPrevisaoVendas}/${itemSelecionado}`).then((response) => {
            setTamanhosItem(response.data);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setTamanhosItem([]);
        });
    };

    const loadDescricaoItem = (itemSelecionado) => {
        api.get(`produtos/item/${itemSelecionado}`).then((response) => {
            setDescItemSelecionado(`${itemSelecionado} - ${response.data.descricao}`);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setDescItemSelecionado('');
        });
    };

    useEffect(() => {
        if (itemSelecionado !== null && itemSelecionado !== undefined && itemSelecionado !== '') {
            loadImagem(itemSelecionado);
            setShowImagemTam(true);
        } else {
            setShowImagemTam(false);
        }

    }, [itemSelecionado]);

    useEffect(() => {
        loadTamanhosItem(idPrevisaoVendas, itemSelecionado);
        loadDescricaoItem(itemSelecionado);
    }, [idPrevisaoVendas, itemSelecionado]);

    useEffect(() => {
        setDesabilitarBotoes(true);
        if ((colecaoInfo !== 0) && (tabelaSellInInfo !== '') && (tabelaSellOutInfo !== '')) setDesabilitarBotoes(false);
    }, [colecaoInfo, tabelaSellInInfo, tabelaSellOutInfo]);

    const consultaItensColecao = (idPrevisao, colecao) => {
        api.get(`previsao-vendas/${idPrevisao}/${colecao}`).then((response) => {
            setItensColecao(response.data);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setItensColecao([]);
        });
    }

    const salvarPrevisaoVendas = async event => {

        setLoading(true);

        const body = ({
            id: idPrevisaoVendasAux,
            descricao: values.descricao,
            colecao: colecaoInfo,
            idTabelaPrecoSellIn: tabelaSellInInfo,
            idTabelaPrecoSellOut: tabelaSellOutInfo,
            previsaoVendasItens: itensColecao
        });

        console.log('salvarPrevisaoVendas');
        console.log(body);

        try {
            const response = await api.post('previsao-vendas', body);
            setIdPrevisaoVendasAux(response.data.id);
            consultaItensColecao(response.data.id, colecaoInfo);
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }

        setLoading(false);
    };

    const salvarTamanhosItem = async event => {

        setLoading(true);

        const body = ({
            id: idPrevisaoVendasAux,
            codigoGrupoItem: itemSelecionado,            
            previsaoVendasItemTamanhos: tamanhosItem
        });

        try {
            const response = await api.post('previsao-vendas/tamanhos', body);
            setTamanhosItem(response.data);
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
            setTamanhosItem([]);
        }

        setLoading(false);
    };

    return (
        <div >
            <Container fluid>
                <Row>
                    <Col>
                        <Form.Row>
                            <Form.Group as={Col} md="1" controlId="id">
                                <Form.Label>
                                    Código
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="id"
                                    disabled={true}
                                    value={idPrevisaoVendasAux}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="5" controlId="descricao">
                                <Form.Label>
                                    Descrição
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength="100"
                                    name="descricao"
                                    autoComplete="off"
                                    value={values.descricao}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="5" controlId="colecao">
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
                                        consultaItensColecao(idPrevisaoVendasAux, selected.value);
                                    }}
                                />
                            </Form.Group>

                        </Form.Row>
                        <Form.Row>

                            <Form.Group as={Col} md="5" controlId="tabelaSellIn">
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

                            <Form.Group as={Col} md="5" controlId="tabelaSellOut">
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
                    </Col>

                    <Col>
                        {showImagemTam && (
                            <Figure>
                                <Figure.Image
                                    width={171}
                                    height={180}
                                    alt="171x180"
                                    src={imagem}
                                />
                            </Figure>
                        )}
                    </Col>
                </Row>
            </Container>

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

            <br></br>
            <br></br>

            <PrevisaoVendasItensTable
                {...props}
                options={options}
                itensColecao={itensColecao}
            />

            {showImagemTam && (
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
                            <Container fluid>
                                <Row>
                                    <Col>
                                        <h4>
                                            <b>PRODUTO:</b> <i>{descItemSelecionado}</i>
                                        </h4>
                                        <br></br>
                                        <Button variant="success" onClick={salvarTamanhosItem}>
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
                                        <br></br>
                                        <br></br>
                                        <PrevisaoVendasItensTamTable
                                            {...props}
                                            tamanhosItem={tamanhosItem}
                                        />
                                    </Col>
                                    <Col></Col>
                                    <Col></Col>
                                </Row>
                            </Container>
                        </>
                    </Accordion.Collapse>
                </Accordion>
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