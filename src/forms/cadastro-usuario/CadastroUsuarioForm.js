import React, { useEffect, useState } from 'react';
import { Modal, Form, Col, Button, Container, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner'
import api from '../../services/api';
import CadastroUsuarioFormTable from './CadastroUsuarioFormTable';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Select from 'react-select';

const arraySituacao = [
    { value: 0, label: 'Inativo' },
    { value: 1, label: 'Ativo' }
]

const initialValues = {
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    situacao: 1,
}

const CadastroUsuarioForm = (props) => {

    const [idUsuarioAux, setidUsuarioAux] = useState(0);
    const [situacao, setSituacao] = useState([]);

    const [loading, setLoading] = useState(false);
    const [desabilitarBotoes, setDesabilitarBotoes] = useState(false);
    const [itensSelected, setItensSelected] = useState([]);

    const { idUsuario } = props;
    const { programas } = props;
    const { editMode } = props;

    const options = {
        sizePerPageList: [5, 10, 20, 100, 10000],
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
            const response = await api.get(`usuarios/${idUsuario}`)
                setFieldValue('nome', response.data.nome);
                setFieldValue('usuario', response.data.usuario);
                setFieldValue('senha', response.data.senha);
                setSituacao(arraySituacao.find(o => o.value === response.data.situacao))
            
            const responseProgramas = await api.get(`usuarios/programas-usuario/${idUsuario}`)
                setItensSelected(responseProgramas.data);

        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }
    }

    useEffect(() => {

        setidUsuarioAux(idUsuario);
        
        if (editMode) {
            obterProgramasUsuario();
        } else{
            setSituacao(arraySituacao.find(o => o.value === 1))
        }

    }, [idUsuario, editMode, setFieldValue]);

    useEffect(() => {
        setDesabilitarBotoes(true);
        if ((values.senha !== '') && (values.nome !== '') && (values.usuario !== '') && (idUsuarioAux !== '')) setDesabilitarBotoes(false);
    }, [values,idUsuarioAux]);

    const salvarUsuario = async event => {

        setLoading(true);

        const body = ({
            id: idUsuarioAux,
            nome: values.nome,
            usuario: values.usuario,
            senha: values.senha,
            listaIdsProgramas: itensSelected,
            situacao: values.situacao,
        });

        try {
            console.log(body)
            const response = await api.post('usuarios', body);
            setidUsuarioAux(response.data.id);
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }
        setLoading(false);

        if (editMode) props.onClose();

    };

    const onRowSelect = ({ id }, isSelected) => {

        if (isSelected) {
            setItensSelected([...itensSelected, id].sort());
        } else {
            setItensSelected(itensSelected.filter(it => it !== id));
        }
        return false;
    };

    const onSelectAll = (isSelected) => {
        if (!isSelected) {
            setItensSelected([]);
        } else {
            setItensSelected(programas.map(d => d.id));
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

    const helpNome = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Nome</Popover.Title>
            <Popover.Content>
                <strong> Campo Nome: </strong> é utilizado apenas como descrição para o usuário cadastrado.
            </Popover.Content>
        </Popover>
    );

    const helpUsuario = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Usuário</Popover.Title>
            <Popover.Content>
                <strong> Campo Usuário: </strong> é utilizado para realização do Login no <strong>ORION</strong>.
            </Popover.Content>
        </Popover>
    );

    const helpSenha = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Senha</Popover.Title>
            <Popover.Content>
                <strong> Campo Senha: </strong> é utilizada assegurar seu dados dentro do <strong>ORION</strong>.
            </Popover.Content>
        </Popover>
    );

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
                                <OverlayTrigger placement="right" overlay={helpNome}>
                                    <Form.Control
                                        type="text"
                                        maxLength="100"
                                        name="nome"
                                        autoComplete="off"
                                        value={values.nome}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="5" controlId="Usuario">
                                <Form.Label>
                                    Usuário
                                </Form.Label>
                                <OverlayTrigger placement="right" overlay={helpUsuario}>
                                    <Form.Control
                                        type="text"
                                        maxLength="100"
                                        name="usuario"
                                        autoComplete="off"
                                        value={values.usuario}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="5" controlId="Password">
                                <Form.Label>
                                    Senha
                                </Form.Label>
                                <OverlayTrigger placement="right" overlay={helpSenha}>
                                    <Form.Control
                                        type="password"
                                        maxLength="100"
                                        name="senha"
                                        autoComplete="off"
                                        value={values.senha}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="2" controlId="periodo">
                                <Form.Label>
                                    Situação
                                </Form.Label>
                                <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe a situação do Usuário."
                                    name="situacao"
                                    options={arraySituacao}
                                    value={situacao}
                                    onChange={(selected) => {
                                        setFieldValue('situacao',selected.value);
                                        setSituacao(selected)
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

            <br></br>
            <br></br>

            <CadastroUsuarioFormTable
                {...props}
                options={options}
                programas={programas}
                selectRowPropAux={selectRowPropAux}
            />

        </div>
    );
}

const FormModal = (props) => {

    return (
        <Modal dialogClassName="modal-full" show={props.show} onHide={props.onClose} animation={true}>
            <Modal.Header>
                <Modal.Title>{`Usuário: ${props.editMode ? 'Edição' : 'Inserção'}`}</Modal.Title>
                <div>
                    <Button
                        variant="secondary"
                        onClick={props.onClose}
                        style={{ marginLeft: '10px' }}
                    >
                        Voltar
                    </Button>
                </div>
            </Modal.Header>
            <Modal.Body>
                <CadastroUsuarioForm
                    {...props}
                />
            </Modal.Body>
        </Modal>
    );
};

FormModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default FormModal;