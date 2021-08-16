import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import api from '../../../services/api';
import CadastroHelpTable from './CadastroHelpTable';
import CadastroHelpForm from './CadastroHelpForm';

const formStyle = { marginLeft: '20px', marginTop: '20px', marginRight: '20px' };

const loadProgramas = () => api.get('programas');

const CadastroHelp = (props) => {

    const [programas, setProgramas] = useState([]);
    const [idPrograma, setPrograma] = useState(0);
    const [desabilitaBotoes, setDesabilitaBotoes] = useState(true);
    const [showFormCadastroHelp, setShowFormCadastroHelp] = useState(false);
    const [edit, setEdit] = useState(false);

    const { currPage } = useState(0);

    const options = {
        defaultSortName: 'id',
        defaultSortOrder: 'desc',
        sizePerPageList: [5, 10, 20, 40, 100],
        sizePerPage: 10,
        page: currPage,
        onRowClick: function (row) {
            setPrograma(row.id);
            setDesabilitaBotoes(false);
        },
        onPageChange: function () {
            setPrograma(0);
            setDesabilitaBotoes(true);
        }
    };

    const load = () => {

        Promise.all([
            loadProgramas(),
        ])
            .then(([
                responseProgramas,
            ]) => {
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
        if (idPrograma === 0) setDesabilitaBotoes(true);
    }, [idPrograma]);

    const onClickEdit = () => {
        setEdit(true);
        setShowFormCadastroHelp(true);
    }

    return (
        <div style={formStyle}>

            <h2><b>Cadastro de Helps</b></h2>
            <br></br>

            <Button disabled={desabilitaBotoes} onClick={() => { onClickEdit() }}>
                Editar
            </Button>

            <br></br>

            <CadastroHelpTable
                {...props}
                options={options}
                programas={programas}
            />

            <CadastroHelpForm
                {...props}
                show={showFormCadastroHelp}
                editMode={edit}
                idPrograma={idPrograma}
                onClose={() => {
                    setShowFormCadastroHelp(false);
                    setDesabilitaBotoes(true);
                    setEdit(false);
                    load();
                }}
            />

        </div>
    );
}

export default CadastroHelp;