import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import api from '../../services/api';
import DeleteDialog from '../../components/Alert/DeleteDialog';
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
    const [idPrevisaoVendas, setIdPrevisaoVendas] = useState(0);
    const [desabilitaBotoes, setDesabilitaBotoes] = useState(true);
    const [showFormPrevisaoVendasItens, setShowFormPrevisaoVendasItens] = useState(false);
    const [edit, setEdit] = useState(false);
    const [waitConexao, setWaitConexao] = useState(false); 
    const [showDeleteAlert, setShowDeleteAlert] = useState(false); 
    const [msgDelete, setMsgDelete] = useState('');

    const { currPage } = useState(0);

    const options = {
        defaultSortName: 'id',
        defaultSortOrder: 'desc',
        sizePerPageList: [5, 10, 20, 40, 100],
        sizePerPage: 10,
        page: currPage,
        onRowClick: function (row) {
            setIdPrevisaoVendas(row.id);
            setDesabilitaBotoes(false);
        },
        onPageChange: function () {
            setIdPrevisaoVendas(0);
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
                setColecoes(normalizeColecoes(responseColecoes.data));
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
        setMsgDelete(`Deletar previsão de vendas: ${idPrevisaoVendas}?`);
    }, [idPrevisaoVendas]);

    const onClickAdd = () => {
        setEdit(false);
        setIdPrevisaoVendas(0);
        setShowFormPrevisaoVendasItens(true);
    }

    const onClickEdit = () => {
        setEdit(true);
        setShowFormPrevisaoVendasItens(true);
    }
    
    const onDeletePrevisao = async event => {
        setEdit(false);
        setWaitConexao(true);

        try {
            const response = await api.delete(`previsao-vendas/${idPrevisaoVendas}`);
            setPrevisoes(response.data);
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }

        setWaitConexao(false);
        setShowDeleteAlert(false);
    }

    return (
        <div style={formStyle}>

            <h2><b>Previsão de Vendas</b></h2>
            <br></br>

            <Button variant="success" onClick={() => { onClickAdd() }}>
                Novo
            </Button>

            <Button disabled={desabilitaBotoes} onClick={() => { onClickEdit() }}>
                Editar
            </Button>

            <Button variant="danger" disabled={desabilitaBotoes} onClick={() => {setShowDeleteAlert(true)}}>
                Excluir
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
                idPrevisaoVendas={idPrevisaoVendas}                
                onClose={() => {                    
                    setShowFormPrevisaoVendasItens(false);
                    setDesabilitaBotoes(true);
                    setEdit(false);                    
                    load();
                }}
            />

            {showDeleteAlert && (
                <DeleteDialog
                    title={msgDelete}
                    handleCancel={() => setShowDeleteAlert(false)}
                    handleDelete={onDeletePrevisao}
                    desabledButtons={waitConexao}
                    showSpinner={waitConexao}
                />
            )}

        </div>
    );
}

export default PrevisaoVendas;