import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import api from '../../services/api';
import DeleteDialog from '../../components/alert/DeleteDialog';
import CadastroUsuarioTable from './CadastroUsuarioTable';
import CadastroUsuarioForm from './CadastroUsuarioForm';

const formStyle = { marginLeft: '20px', marginTop: '20px', marginRight: '20px' };

const loadUsuarios = () => api.get('usuarios');
const loadProgramas = () => api.get('programas');


const getDescSituacao = (situacao) => {

    let descricao = "Inativo"

    if (situacao === 1) descricao = "Ativo"

    return descricao;
}

const normalizeDados = (dados) => {
    return dados.map((c) => {
        return {
            id: c.id,
            nome: c.nome,
            usuario: c.usuario,
            senha: c.senha,
            situacao: `${getDescSituacao(c.situacao)}`
        };
    });
};

const CadastroUsuario = (props) => {

    const [usuarios, setUsuarios] = useState([]);
    const [programas, setProgramas] = useState([]);
    const [idUsuario, setIdUsuario] = useState(0);
    const [desabilitaBotoes, setDesabilitaBotoes] = useState(true);
    const [showFormCadastroUsuario, setShowFormCadastroUsuario] = useState(false);
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
            setIdUsuario(row.id);
            setDesabilitaBotoes(false);
        },
        onPageChange: function () {
            setIdUsuario(0);
            setDesabilitaBotoes(true);
        }
    };

    const load = () => {

        Promise.all([
            loadUsuarios(),
            loadProgramas(),
        ])
            .then(([
                responseUsuarios,
                responseProgramas,
            ]) => {
                setUsuarios(normalizeDados(responseUsuarios.data));
                setProgramas(responseProgramas.data);
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
        setMsgDelete(`Deletar Usuário: ${idUsuario}?`);
    }, [idUsuario]);

    const onClickAdd = () => {
        setEdit(false);
        setIdUsuario(0);
        setShowFormCadastroUsuario(true);
    }

    const onClickEdit = () => {
        setEdit(true);
        setShowFormCadastroUsuario(true);
    }
    
    const onDeleteUsuario = async event => {
        setEdit(false);
        setWaitConexao(true);

        try {
            const response = await api.delete(`usuarios/${idUsuario}`);
            setUsuarios(response.data);
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }

        setWaitConexao(false);
        setShowDeleteAlert(false);
    }

    return (
        <div style={formStyle}>
            
            <h2><b>Cadastro de Usuários</b></h2>
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

            <br></br>

            <CadastroUsuarioTable
                {...props}
                options={options}
                usuarios={usuarios}
            />

            <CadastroUsuarioForm
                {...props}
                show={showFormCadastroUsuario}
                editMode={edit}
                programas={programas}
                idUsuario={idUsuario}            
                onClose={() => {                    
                    setShowFormCadastroUsuario(false);
                    setDesabilitaBotoes(true);
                    setEdit(false);                    
                    load();
                }}
            />

            {showDeleteAlert && (
                <DeleteDialog
                    title={msgDelete}
                    handleCancel={() => setShowDeleteAlert(false)}
                    handleDelete={onDeleteUsuario}
                    desabledButtons={waitConexao}
                    showSpinner={waitConexao}
                />
            )}

        </div>
    );
}

export default CadastroUsuario;