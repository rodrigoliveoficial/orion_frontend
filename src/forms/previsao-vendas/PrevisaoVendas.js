import React, { useEffect, useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import Select from 'react-select';
import api from '../../services/api';
import PrevisaoTable from './PrevisaoTable';
import ConfirmDialog from '../../components/Alert/ConfirmDialog';

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

const PrevisaoVendas = (props) => {

    const [colecoes, setColecoes] = useState([]);
    const [tabelasPreco, setTabelasPreco] = useState([]);
    const [previsaoVendas, setPrevisaoVendas] = useState([]);

    const [colecao, setColecao] = useState([]);
    const [tabelaSellIn, setTabelaSellIn] = useState([]);
    const [tabelaSellOut, setTabelaSellOut] = useState([]);

    const [colecaoInfo, setColecaoInfo] = useState(0);
    const [tabelaSellInInfo, setTabelaSellInInfo] = useState(0);
    const [tabelaSellOutInfo, setTabelaSellOutInfo] = useState(0);

    const [loading, setLoading] = useState(false);

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

    const consultaPrevisaoVendasColecao = (colecao) => {        
        api.get(`previsao-vendas/${colecao}`).then((response) => {
            setPrevisaoVendas(response.data);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setPrevisaoVendas([]);
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

        //try {
        //    const response = await api.get(`plano-mestre/multiplicador/${idPlanoMestre}/${itemSelecionado}/${values.multiplicadorItem}`);
        //    setTamanhosItem(normalizeTamanhos(response.data));
        //} catch (e) {
        //    console.log('ocorreu algum erro!');
        //    console.error(e);
        //    setTamanhosItem([]);
        //}

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

            </Form.Row>
            <Form.Row>

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

            <Button disabled={loading} variant="success" onClick={salvarPrevisaoVendas}
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
            <Button variant="danger">
                Cancelar
            </Button>

            <br></br>
            <br></br>

            <PrevisaoTable
                {...props}
                previsaoVendas={previsaoVendas}
            />

        </div>
    );
}

export default PrevisaoVendas;