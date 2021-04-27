import React, { useEffect, useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import api from '../../services/api';
import PrevisaoVendasTable from './PrevisaoVendasTable';
import PrevisaoVendasItens from './PrevisaoVendasItens';

const formStyle = { marginLeft: '20px', marginTop: '20px', marginRight: '20px' };

const loadPrevisoes = () => api.get('previsao-vendas');
const loadColecoes = () => api.get('colecoes');
const loadTabelasPreco = () => api.get('tabelas-preco');

const normalizeColecoes = (dados) => {
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

    const [previsoes, setPrevisoes] = useState([]);
    const [colecoes, setColecoes] = useState([]);
    const [tabelasPreco, setTabelasPreco] = useState([]);
    const [previsaoSelecionada, setPrevisaoSelecionada] = useState(0);
    const [desabilitaBotoes, setDesabilitaBotoes] = useState(true);
    const [showFormPrevisaoVendasItens, setShowFormPrevisaoVendasItens] = useState(false);
    const [edit, setEdit] = useState(false);

    const { currPage } = useState(0);

    const options = {
        sizePerPageList: [10, 20, 40, 100],
        sizePerPage: 10,
        page: currPage,
        onRowClick: function (row) {
            setPrevisaoSelecionada(row.id);
            setDesabilitaBotoes(false);
        },
        onPageChange: function () {
            setPrevisaoSelecionada(0);
            setDesabilitaBotoes(true);
        }
    };

    const load = () => {

        Promise.all([
            loadPrevisoes(),
            loadColecoes(),
            loadTabelasPreco()
        ])
            .then(([
                responsePrevisoes,
                responseColecoes,
                responseTabelasPreco
            ]) => {
                setPrevisoes(responsePrevisoes.data);
                setColecoes(normalizeColecoes(responseColecoes));
                setTabelasPreco(normalizeTabelasPreco(responseTabelasPreco));
            })
            .catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
            });
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div style={formStyle}>

            <h2><b>Previsão de Vendas (Rotina em construção - Não Utilizar)</b></h2>
            <br></br>

            <Button variant="success" onClick={() => { setShowFormPrevisaoVendasItens(true) }}>
                + Novo
            </Button>

            <Button disabled={desabilitaBotoes}>
                Editar
            </Button>

            <Button variant="danger" disabled={desabilitaBotoes}>
                - Excluir
            </Button>

            <PrevisaoVendasTable
                {...props}
                options={options}
                previsoes={previsoes}
            />

            <PrevisaoVendasItens
                {...props}
                show={showFormPrevisaoVendasItens}
                editMode={edit}
                colecoes={colecoes}
                tabelasPreco={tabelasPreco}
                previsaoSelecionada={previsaoSelecionada}                
                onClose={() => {
                    setShowFormPrevisaoVendasItens(false);
                    load();
                }}
            />

        </div>
    );
}

export default PrevisaoVendas;