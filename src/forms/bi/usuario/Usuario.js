import React, { useEffect, useState } from 'react';
import { Button, Accordion } from 'react-bootstrap';
import api from '../../../services/api';
import DeleteDialog from '../../../components/alert/DeleteDialog';
import UsuarioTable from './UsuarioTable';
import UsuarioForm from './UsuarioForm';

const formStyle = { marginLeft: '20px', marginTop: '20px', marginRight: '20px' };

const loadUsuarios = () => api.get('usuarios-bi');

const getDescSituacao = (situacao) => {

    let descricao = "Inativo"

    if (situacao === 1) descricao = "Ativo"

    return descricao;
}

const getDescAdmin = (administrador) => {

    let descricao = "Não"

    if (administrador === 1) descricao = "Sim"

    return descricao;
}

const normalizeDados = (dados) => {
    return dados.map((c) => {
        return {
            id: c.codUsuario,
            nome: c.nome,
            usuario: c.usuario,
            senha: c.senha,
            email: c.email,
            situacao: `${getDescSituacao(c.situacao)}`,
            administrador: `${getDescAdmin(c.administrador)}`,
        };
    });
};

const CadastroUsuario = (props) => {

    const [usuarios, setUsuarios] = useState([]);
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
            loadUsuarios()
        ])
            .then(([
                responseUsuarios
            ]) => {
                setUsuarios(normalizeDados(responseUsuarios.data));
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
            const response = await api.delete(`usuarios-bi/${idUsuario}`);
            setUsuarios(normalizeDados(response.data));
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }

        setWaitConexao(false);
        setShowDeleteAlert(false);
    }

    return (
        <div style={formStyle}>

            <h2><b>Cadastro de Usuários - B.I</b></h2>
            
            {!showFormCadastroUsuario && (
                <div>
                    <Button variant="success" onClick={() => { onClickAdd() }}>
                        Novo
                    </Button>

                    <Button disabled={desabilitaBotoes} onClick={() => { onClickEdit() }}>
                        Editar
                    </Button>

                    <Button variant="danger" disabled={desabilitaBotoes} onClick={() => { setShowDeleteAlert(true) }}>
                        Excluir
                    </Button>
                </div>
            )}

            <br></br>

            {showFormCadastroUsuario && (
                <div>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Toggle
                            eventKey="0"

                            as={(p) => {
                                return (
                                    <div style={{ display: 'inline-flex', width: '100%' }}>
                                        <i
                                            style={{ lineHeight: '3.4em' }}
                                            onClick={p.onClick}
                                        />
                                    </div>
                                );
                            }}
                        />
                        <Accordion.Collapse eventKey="0">
                            <UsuarioForm
                                {...props}
                                setShowFormCadastroUsuario={setShowFormCadastroUsuario}
                                setUsuarios={setUsuarios}
                                editMode={edit}
                                idUsuario={idUsuario}
                            />
                        </Accordion.Collapse>
                    </Accordion>

                </div>
            )}

            {!showFormCadastroUsuario && (

                <div>
                    <UsuarioTable
                        {...props}
                        options={options}
                        usuarios={usuarios}
                    />
                </div>

            )}

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