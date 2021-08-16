import React, { useEffect, useState } from 'react';
import { Modal, Form, Col, Button, Container, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner'
import api from '../../../services/api';

const initialValues = {
    id: 0,
    descricao: '',
    help: ''
}

const CadastroHelpForm = (props) => {

    const [idProgramaAux, setIdProgramaAux] = useState(0);

    const [loading, setLoading] = useState(false);
    const [desabilitarBotoes, setDesabilitarBotoes] = useState(false);

    const { idPrograma } = props;
    const { editMode } = props;

    const {
        handleChange,
        values,
        setFieldValue
    } = useFormik({
        initialValues: initialValues
    });

    const obterDadosProgramas = async event => {
        try {
            const response = await api.get(`programas/${idPrograma}`)
            setFieldValue('descricao', response.data.descricao);
            setFieldValue('help', response.data.help);
            
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }
    }

    useEffect(() => {

        setIdProgramaAux(idPrograma);

        obterDadosProgramas()

    }, [idPrograma, editMode, setFieldValue]);

    useEffect(() => {
        setDesabilitarBotoes(true);
        if ((values.help !== '')) setDesabilitarBotoes(false);
    }, [values, idProgramaAux]);

    const salvarHelp = async event => {

        setLoading(true);

        const body = ({
            id: idProgramaAux,
            help: values.help,
        });

        try {
            const response = await api.post('programas', body);
            setIdProgramaAux(response.data.id);
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }
        setLoading(false);
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
                                    value={idProgramaAux}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="2" controlId="nomePrograma">
                                <Form.Label>
                                    Programa
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="descricao"
                                    disabled={true}
                                    value={values.descricao}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group md="2" controlId="helpTextArea">
                                <Form.Label>Help</Form.Label>
                                <Form.Control as="textarea" rows={10} cols={150} name="help" value={values.help} onChange={handleChange} required/>
                            </Form.Group>
                        </Form.Row>
                    </Col>
                </Row>
            </Container>

            <br></br>

            <Button variant="success" onClick={salvarHelp} disabled={desabilitarBotoes}
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

        </div>
    );
}

const FormModal = (props) => {

    return (
        <Modal dialogClassName="modal-full" show={props.show} onHide={props.onClose} animation={true}>
            <Modal.Header>
                <Modal.Title>{`Help: ${props.editMode ? 'Edição' : 'Inserção'}`}</Modal.Title>
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
                <CadastroHelpForm
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