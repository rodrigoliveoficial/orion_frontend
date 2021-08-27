import React, { useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import api from '../../../services/api';
import DeleteDialog from '../../../components/alert/DeleteDialog';
import ProgramaTable from './ProgramaTable';
import ProgramaForm from './ProgramaForm';
import normalizeProgramas from './NormalizeProgramas';

const formStyle = { marginLeft: '20px', marginTop: '20px', marginRight: '20px' };

const loadProgramas = () => api.get('programas-bi');

const Programa = (props) => {
    const [programas, setProgramas] = useState([]);
    const [idPrograma, setidPrograma] = useState("");
    const [desabilitaBotoes, setDesabilitaBotoes] = useState(true);
    const [showFormPrograma, setShowFormPrograma] = useState(false);
    const [edit, setEdit] = useState(false);
    const [waitConexao, setWaitConexao] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [msgDelete, setMsgDelete] = useState('');
    const { currPage } = useState(0);

    const options = {
        defaultSortName: 'id',
        defaultSortOrder: 'desc',
        sizePerPageList: [5, 10, 20, 50, 100],
        sizePerPage: 10,
        page: currPage,
        onRowClick: function (row) {
            setidPrograma(row.id);
            setDesabilitaBotoes(false);
        },
        onPageChange: function () {
            setidPrograma("");
            setDesabilitaBotoes(true);
        }
    };

    const load = () => {

        Promise.all([
            loadProgramas()
        ])
            .then(([
                responseProgramas
            ]) => {
                setProgramas(normalizeProgramas(responseProgramas.data));
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
        setMsgDelete(`Deletar Programa: ${idPrograma}?`);
    }, [idPrograma]);

    const onClickAdd = () => {
        setEdit(false);
        setidPrograma("");
        setShowFormPrograma(true);
    }

    const onClickEdit = () => {
        setEdit(true);
        setShowFormPrograma(true);
    }

    const onDeletePrograma = async event => {
        setEdit(false);
        setWaitConexao(true);

        try {
            const response = await api.delete(`programas-bi/${idPrograma}`);
            setProgramas(normalizeProgramas(response.data));
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }

        setWaitConexao(false);
        setShowDeleteAlert(false);
    }

    return (
        <div style={formStyle}>

            <h2><b>Cadastro de Programas - B.I</b></h2>

            {!showFormPrograma && (
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


            {showFormPrograma && (
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
                            <ProgramaForm
                                {...props}
                                editMode={edit}
                                idPrograma={idPrograma}
                                setShowFormPrograma={setShowFormPrograma}
                                setProgramas={setProgramas}
                            />
                        </Accordion.Collapse>
                    </Accordion>

                </div>
            )}

            {!showFormPrograma && (
                <div>
                    <ProgramaTable
                        {...props}
                        options={options}
                        programas={programas}
                    />
                </div>
            )}


            {showDeleteAlert && (
                <DeleteDialog
                    title={msgDelete}
                    handleCancel={() => setShowDeleteAlert(false)}
                    handleDelete={onDeletePrograma}
                    desabledButtons={waitConexao}
                    showSpinner={waitConexao}
                />
            )}

        </div>
    );
}

export default Programa;