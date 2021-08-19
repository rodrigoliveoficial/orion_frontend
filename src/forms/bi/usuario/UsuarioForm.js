import React, { useEffect, useState } from 'react';
import { Form, Col, Button, Container, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner'
import api from '../../../services/api';
import UsuarioFormTable from './UsuarioFormTable';
import Select from 'react-select';
import DefinirProgramas from './DefinirProgramas';
import TiposEmailsTable from './TiposEmailsTable';
import normalizeProgramas from '../programa/NormalizeProgramas';

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

const normalizeDadosRetorno = (dados) => {
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
}

const arraySituacao = [
    { value: 0, label: 'Inativo' },
    { value: 1, label: 'Ativo' }
]

const arrayAdmin = [
    { value: 0, label: 'Não' },
    { value: 1, label: 'Sim' }
]

const initialValues = {
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    situacao: 1,
    administrador: 0,
    email: ''
}

const UsuarioForm = (props) => {

    const [idUsuarioAux, setidUsuarioAux] = useState(0);
    const [situacao, setSituacao] = useState([]);
    const [admin, setAdmin] = useState([]);

    const [loading, setLoading] = useState(false);
    const [desabilitarBotoes, setDesabilitarBotoes] = useState(false);
    const [itensSelected, setItensSelected] = useState([]);

    const [showDefinirProgramas, setShowDefinirprogramas] = useState(false);
    const [programasUser, setProgramasUser] = useState([]);
    const [idPrograma, setIdPrograma] = useState('');
    const [tiposEmails, setTiposEmails] = useState([]);

    const { idUsuario } = props;
    const { editMode } = props;

    const options = {
        sizePerPageList: [5, 10, 20, 100, 10000],
        sizePerPage: 5,
        page: 1,
        onRowClick: function (row) {
            setIdPrograma(row.id);
        },
        onPageChange: function () {
            setIdPrograma('');
        }
    };

    const optionsTiposEmail = {
        sizePerPageList: [5, 10, 20, 50],
        sizePerPage: 5,
        page: 1,
    };

    const {
        handleChange,
        values,
        setFieldValue
    } = useFormik({
        initialValues: initialValues
    });

    const obterProgramasUsuario = async event => {
        try {
            const response = await api.get(`usuarios-bi/${idUsuario}`)
            setFieldValue('nome', response.data.nome);
            setFieldValue('usuario', response.data.usuario);
            setFieldValue('senha', response.data.senha);
            setFieldValue('email', response.data.email);
            setSituacao(arraySituacao.find(o => o.value === response.data.situacao))
            setAdmin(arrayAdmin.find(o => o.value === response.data.administrador))

            const responseProgramas = await api.get(`usuarios-bi/programas-por-usuario/${idUsuario}`)
            setProgramasUser(normalizeProgramas(responseProgramas.data));

        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }
    }

    const obterTiposEmailPrograma = async event => {
        try {
            const responseTipoEmail = await api.get(`programas-bi/tipos-email/${idPrograma}`)
            const responseSelect = await api.get(`usuarios-bi/tiposEmail-por-usuario/${idUsuario}/${idPrograma}`)
            setTiposEmails(responseTipoEmail.data)
            setItensSelected(responseSelect.data)
        } catch (e) {
            setItensSelected([])
            setTiposEmails([])
            console.log('ocorreu algum erro!');
            console.error(e);
        }
    }

    useEffect(() => {

        setidUsuarioAux(idUsuario);

        if (editMode) {
            obterProgramasUsuario();
        } else {
            setSituacao(arraySituacao.find(o => o.value === 1))
            setAdmin(arrayAdmin.find(o => o.value === 0))
        }

    }, [idUsuario, editMode, setFieldValue]);

    useEffect(() => {
        setDesabilitarBotoes(true);
        if ((values.senha !== '') && (values.nome !== '') && (values.email !== '') && (values.usuario !== '') && (idUsuarioAux !== '')) setDesabilitarBotoes(false);
    }, [values, idUsuarioAux]);

    useEffect(() => {
        if (idPrograma !== '') {
            obterTiposEmailPrograma()
        }
    }, [idPrograma]);

    const salvarUsuario = async event => {

        setLoading(true);

        const body = ({
            id: idUsuarioAux,
            nome: values.nome,
            usuario: values.usuario,
            senha: values.senha,
            situacao: values.situacao,
            administrador: values.admin,
            email: values.email
        });

        try {
            const responseUser = await api.post('usuarios-bi', body);
            const responseAll = await api.get('usuarios-bi')

            setidUsuarioAux(responseUser.data.codUsuario);
            props.setUsuarios(normalizeDadosRetorno(responseAll.data));
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }
        setLoading(false);
    };

    const cancelarAcao = () => {
        props.setShowFormCadastroUsuario(false);
    }

    const definirPrograma = () => {
        setShowDefinirprogramas(true);
    }

    const onRowSelect = ({ id }, isSelected) => {

        const body = ({
            id: idUsuarioAux,
            idPrograma: idPrograma,
            idTipoEmail: id,
        });

        if (isSelected) {
            setItensSelected([...itensSelected, id].sort());
            api.post('usuarios-bi/insere-tipo-email', body);
        } else {
            setItensSelected(itensSelected.filter(it => it !== id));
            api.post('usuarios-bi/excluir-tipo-email', body);
        }
        return false;
    };

    const onSelectAll = (isSelected) => {

        const body = ({
            id: idUsuarioAux,
            idPrograma: idPrograma,
        });

        if (!isSelected) {
            setItensSelected([]);
            api.post('usuarios-bi/excluir-all-tipo-email', body);
        } else {
            setItensSelected(tiposEmails.map(d => d.id));
            api.post('usuarios-bi/insere-all-tipo-email', body);
        }
        return isSelected;
    }

    const selectRowPropAux = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: onRowSelect,
        onSelectAll: onSelectAll,
        selected: itensSelected,
        bgColor: 'rgb(193, 219, 238)'
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
                                    value={idUsuarioAux}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="5" controlId="nome">
                                <Form.Label>
                                    Nome
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength="100"
                                    name="nome"
                                    autoComplete="off"
                                    value={values.nome}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="5" controlId="email">
                                <Form.Label>
                                    E-mail
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength="100"
                                    name="email"
                                    autoComplete="off"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="5" controlId="Usuario">
                                <Form.Label>
                                    Usuário
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength="100"
                                    name="usuario"
                                    autoComplete="off"
                                    value={values.usuario}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="5" controlId="situacao">
                                <Form.Label>
                                    Situação
                                </Form.Label>
                                <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe a situação do Usuário."
                                    name="situacao"
                                    options={arraySituacao}
                                    value={situacao}
                                    onChange={(selected) => {
                                        setFieldValue('situacao', selected.value);
                                        setSituacao(selected)
                                    }}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="5" controlId="Password">
                                <Form.Label>
                                    Senha
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    maxLength="100"
                                    name="senha"
                                    autoComplete="off"
                                    value={values.senha}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="5" controlId="admin">
                                <Form.Label>
                                    Administrador
                                </Form.Label>
                                <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o tipo do Usuário."
                                    name="admin"
                                    options={arrayAdmin}
                                    value={admin}
                                    onChange={(selected) => {
                                        setFieldValue('admin', selected.value);
                                        setAdmin(selected)
                                    }}
                                />
                            </Form.Group>
                        </Form.Row>

                    </Col>
                </Row>
            </Container>

            <br></br>

            <Button variant="success" onClick={salvarUsuario} disabled={desabilitarBotoes}
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

            <Button variant="danger" onClick={cancelarAcao}>
                Cancelar
            </Button>

            {(idUsuarioAux > 0) && (

                <div>
                    <DefinirProgramas
                        {...props}
                        show={showDefinirProgramas}
                        idUsuario={idUsuarioAux}
                        setProgramasUser={setProgramasUser}
                        onClose={() => {
                            setShowDefinirprogramas(false);
                            setIdPrograma('');
                        }}
                    />

                    <br></br>
                    <br></br>

                    <h5><b>Programas Liberados</b></h5>

                    <UsuarioFormTable
                        {...props}
                        options={options}
                        programas={programasUser}
                    />

                    <br></br>

                    <Button variant="info" onClick={definirPrograma}>
                        Definir Programas
                    </Button>

                    <br></br>
                    <br></br>


                    {(idPrograma !== '') && (
                        <div>

                            <h5><b>Tipos de E-mail</b></h5>

                            <TiposEmailsTable
                                {...props}
                                options={optionsTiposEmail}
                                tiposEmails={tiposEmails}
                                selectRowPropAux={selectRowPropAux}
                            />
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}

UsuarioForm.propTypes = {
    setShowFormCadastroUsuario: PropTypes.func.isRequired,
    setUsuarios: PropTypes.func.isRequired
};

export default UsuarioForm;