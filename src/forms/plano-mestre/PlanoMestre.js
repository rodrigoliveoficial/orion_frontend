import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DataGrid from 'react-data-grid';
import { Button } from 'react-bootstrap';
import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';
import api from '../../services/api';
import DeleteDialog from '../../components/Alert/DeleteDialog';
import GerarPlanoMestre from './geracao/GerarPlanoMestre';
import ItensPlanoMestre from './itens/ItensPlanoMestre';


const formStyle = { marginLeft: '20px', marginTop: '20px', marginRight: '20px' };

const loadDepositos = () => api.get('depositos');
const loadPlanoMestre = () => api.get('plano-mestre');

const getDescSituacao = (situacao) => {

    let descricao = "Em Análise";

    if (situacao === 1)  descricao = "Plano Confirmado"
    if (situacao === 2)  descricao = "Ordens Geradas"

    return descricao;
}

const getCodSituacao = (situacao) => {

    let conteudo = "";
    let codSituacaoPlano = 0;

    conteudo = situacao.split("-");
    codSituacaoPlano = parseInt(conteudo[0]);

    return codSituacaoPlano;
}

const normalizeDados = (dados) => {
    return dados.map((c) => {
        return {
            id: c.id,
            descricao: c.descricao,
            data: format(parseISO(c.data), 'dd/MM/yyyy HH:mm:ss'),
            situacao: `${c.situacao}-${getDescSituacao(c.situacao)}`
        };
    });
};

const normalizeDepositos = (dados) => {
    return dados.map((c) => {
        return {
            value: c.id,
            label: `${c.id} - ${c.descricao}`
        };
    });
};

const columns = [
    { key: 'id', name: 'Numero' },
    { key: 'descricao', name: 'Descrição' },
    { key: 'data', name: 'Data Geração' },
    { key: 'situacao', name: 'Situação' }
];

const PlanoMestre = (props) => {

    const [planosMestre, setPlanosMestre] = useState([]);
    const [depositos, setDepositos] = useState([]);

    const [showFormGerar, setShowFormGerar] = useState(false);
    const [showFormItens, setShowFormItens] = useState(false);
    const handleShowFormGerar = () => setShowFormGerar(true);
    const handleShowFormItens = () => setShowFormItens(true);

    const [disabledButton, setDisabledButton] = useState(true);
    const [idPlanoMestre, setIdPlanoMestre] = useState(0);
    const [descPlanoMestre, setDescPlanoMestre] = useState('');
    const [sitPlanoMestre, setSitPlanoMestre] = useState(0);
    const [msgDelete, setMsgDelete] = useState('');
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const load = () => {

        Promise.all([
            loadDepositos(),
            loadPlanoMestre()
        ])
            .then(([
                responseDepositos,
                responsePlanoMestre
            ]) => {
                setDepositos(normalizeDepositos(responseDepositos.data));
                setPlanosMestre(normalizeDados(responsePlanoMestre.data));
            })
            .catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
            });
    };

    useEffect(() => {
        setMsgDelete(`Deletar plano mestre de produção: ${idPlanoMestre}?`);
    }, [idPlanoMestre]);

    useEffect(() => {
        load();
    }, []);

    const handleDeletePlanoMestre = () => {

        api.delete(`plano-mestre/${idPlanoMestre}`).then((response) => {
            setPlanosMestre(normalizeDados(response.data));
            setIdPlanoMestre(0);
            setDescPlanoMestre('');
            setDisabledButton(true);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
        }).finally(() => setShowDeleteAlert(false));

    };

    const onRowClick = (id, data) => {        
        setIdPlanoMestre(data.id);
        setDescPlanoMestre(data.descricao);
        setSitPlanoMestre(getCodSituacao(data.situacao));
        setDisabledButton(false);
    };

    const onSelectedCellChange = (id) => {
        console.log(id);
        setDisabledButton(true);
    };

    return (
        <div style={formStyle}>

            <h2><b>Plano Mestre de Produção</b></h2>
            <br></br>

            <Button onClick={handleShowFormGerar} >
                Gerar
            </Button>
            <Button onClick={handleShowFormItens} variant="secondary" disabled={disabledButton}>
                Plano 
            </Button>
            <Button onClick={() => { setShowDeleteAlert(true) }} variant="danger" disabled={disabledButton}>
                Excluir
            </Button>

            <h2><b></b></h2>

            <DataGrid
                columns={columns}
                rows={planosMestre}
                onRowClick={onRowClick}
                onSelectedCellChange={onSelectedCellChange}
                enableCellSelect={true}
            />

            <GerarPlanoMestre
                {...props}
                onSubmit={planos => setPlanosMestre(normalizeDados(planos))}
                show={showFormGerar}
                onClose={() => {
                    setShowFormGerar(false);
                }}
            />

            <ItensPlanoMestre
                {...props}
                show={showFormItens}
                idPlanoMestre={idPlanoMestre}
                descPlanoMestre={descPlanoMestre}
                sitPlanoMestre={sitPlanoMestre}
                depositos={depositos}
                onClose={() => {
                    setShowFormItens(false);
                    load();
                }}
            />

            {showDeleteAlert && (
                <DeleteDialog                    
                    title={msgDelete}
                    handleCancel={() => setShowDeleteAlert(false)}
                    handleDelete={handleDeletePlanoMestre}
                />
            )}

        </div>
    );
}

PlanoMestre.propTypes = {
    showLoading: PropTypes.func,
    addErrorMessage: PropTypes.func,
    addSuccessMessage: PropTypes.func,
    closeLoading: PropTypes.func
};

PlanoMestre.defaultProps = {
    showLoading: () => { },
    addErrorMessage: () => { },
    addSuccessMessage: () => { },
    closeLoading: () => { }
};

export default PlanoMestre;