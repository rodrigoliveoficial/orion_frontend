import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import api from '../../services/api';
import DeleteDialog from '../../components/alert/DeleteDialog';
import Ajuda from '../../components/ajuda/Ajuda'
import CapacidadeProducaoItens from './CapacidadeCotasVendasItens';
import CapacidadeProducaoTable from './CapacidadeCotasVendasTable';
import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';

const formStyle = { marginLeft: '20px', marginTop: '20px', marginRight: '20px' };

const loadCapacidadeCapa = () => api.get('cotas-vendas/all');
const loadPeriodos = () => api.get('periodos-producao/producao');
const loadColecoes = () => api.get('colecoes');

const normalizeColecoes = (dados) => {
    return dados.map((c) => {
        return {
            value: c.id,
            label: `${c.id} - ${c.descricao}`
        };
    });
};

const normalizePeriodos = (dados) => {
    return dados.map((c) => {
        return {
            value: c.periodo,
            label: `${c.periodo} - ${c.dataIniPeriodo} até ${c.dataFimPeriodo}`
        };
    });
};

const normalizeDados = (dados) => {
    return dados.map((c) => {
        return {
            id: c.id,
            periodo: `${c.periodo} - ${format(parseISO(c.dataInicial), 'dd/MM/yyyy')} até ${format(parseISO(c.dataFinal), 'dd/MM/yyyy')}`,
            linha: `${c.linha} - ${c.descLinha}`,
            colecao: `${c.colecao} - ${c.descColecao}`,
            minutos: `${c.minutos.toFixed(4)}`,
            pecas: c.pecas
        };
    });
};

const CapacidadeCotasVendas = (props) => {

    const [capacidades, setCapacidades] = useState([]);
    const [idCapacidade, setIdCapacidade] = useState(0);
    const [desabilitaBotoes, setDesabilitaBotoes] = useState(true);
    const [showFormCapacidadeProd, setShowFormCapacidadeProd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [waitConexao, setWaitConexao] = useState(false); 
    const [showDeleteAlert, setShowDeleteAlert] = useState(false); 
    const [msgDelete, setMsgDelete] = useState('');
    const [periodos, setPeriodos] = useState([]);
    const [colecoes, setColecoes] = useState([]);
     
    const { currPage } = useState(0);

    const options = {
        defaultSortName: 'periodo',
        defaultSortOrder: 'desc',
        sizePerPageList: [5, 10, 20, 40, 100],
        sizePerPage: 10,
        page: currPage,
        onRowClick: function (row) {
            setIdCapacidade(row.id)
            setDesabilitaBotoes(false);
        },
        onPageChange: function () {
            setIdCapacidade(0)
            setDesabilitaBotoes(true);
        }
    };

    const load = () => {

        Promise.all([
            loadCapacidadeCapa(),
            loadPeriodos(),
            loadColecoes()
        ])
            .then(([
                responseCapacidade,
                responsePeriodos,
                responseColecoes
            ]) => {
                setCapacidades(normalizeDados(responseCapacidade.data));
                setPeriodos(normalizePeriodos(responsePeriodos.data));
                setColecoes(normalizeColecoes(responseColecoes.data));
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
        setMsgDelete(`Excluir Capacidade: ${idCapacidade}?`);
    }, [idCapacidade]);

    const onClickAdd = () => {
        setEdit(false);
        setIdCapacidade(0);
        setShowFormCapacidadeProd(true);
    }

    const onClickEdit = () => {
        setEdit(true);
        setShowFormCapacidadeProd(true);
    }
    
    const onDeleteCapacidade = async event => {
        setEdit(false);
        setWaitConexao(true);

        try {
            const response = await api.delete(`cotas-vendas/${idCapacidade}`);
            setCapacidades(normalizeDados(response.data));
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }

        setWaitConexao(false);
        setShowDeleteAlert(false);
    }

    return (
        <div style={formStyle}>
            
            <h2><b>Cotas de Vendas</b></h2>
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

            <Ajuda
                {...props}
                path="capacidade-cotas-vendas"
            />

            <br></br>

            <CapacidadeProducaoTable
                {...props}
                options={options}
                capacidades={capacidades}
            />

            <CapacidadeProducaoItens
                {...props}
                show={showFormCapacidadeProd}
                editMode={edit}
                periodos={periodos}
                idCapacidade={idCapacidade}
                colecoes={colecoes}
                onClose={() => {                    
                    setShowFormCapacidadeProd(false);
                    setDesabilitaBotoes(true);
                    setEdit(false);                    
                    load();
                }}
            />

            {showDeleteAlert && (
                <DeleteDialog
                    title={msgDelete}
                    handleCancel={() => setShowDeleteAlert(false)}
                    handleDelete={onDeleteCapacidade}
                    desabledButtons={waitConexao}
                    showSpinner={waitConexao}
                />
            )}

        </div>
    );
}

export default CapacidadeCotasVendas;