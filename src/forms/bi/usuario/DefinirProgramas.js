import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner'
import api from '../../../services/api';
import DefinirProgramasTable from './DefinirProgramasTable';
import normalizeProgramas from '../programa/NormalizeProgramas';
import { useFormik } from 'formik';

const loadProgramas = () => api.get('programas-bi');

const initialValues = {
    pesquisar: ''
}

const DefinirProgramas = (props) => {

    const [loading, setLoading] = useState(false);
    const [itensSelected, setItensSelected] = useState([]);
    const [programas, setProgramas] = useState([]);

    const { idUsuario } = props;

    const options = {
        sizePerPageList: [5, 10, 20, 100, 10000],
        sizePerPage: 5,
        page: 1,
    };


    const load = () => {

        Promise.all([
            loadProgramas(),
        ])
            .then(([
                responseProgramas,
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

    const {
        handleChange,
        values,
    } = useFormik({
        initialValues: initialValues
    });

    const obterProgramasUsuario = async event => {
        try {
            const responseProgramas = await api.get(`usuarios-bi/programas-usuario/${idUsuario}`)
            setItensSelected(responseProgramas.data);

        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }
    }

    useEffect(() => {

        if (idUsuario > 0) {
            obterProgramasUsuario();
        }

    }, [idUsuario]);

    useEffect(() => {
        filtrarProgramas(values.pesquisar);
    }, [values]);

    const salvarUsuario = async event => {

        setLoading(true);

        const body = ({
            id: idUsuario,
            listaIdsProgramas: itensSelected,
        });

        try {
            const response = await api.post('usuarios-bi/programas-usuario', body);
            props.setProgramasUser(normalizeProgramas(response.data));
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }
        setLoading(false);

        props.onClose();

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

    const filtrarProgramas = (pesquisar) => {

        if ((pesquisar === '') || (pesquisar === undefined) || (pesquisar === ' ')) {
            api.get('programas-bi').then((response) => {
                setProgramas(normalizeProgramas(response.data));
            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
                setProgramas([]);
            });
        } else {
            api.get(`usuarios-bi/programas-usuario/filtrar/${pesquisar}`).then((response) => {
                setProgramas(normalizeProgramas(response.data));
            }).catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
                setProgramas([]);
            });
        }
    }

    return (
        <div >
            <br></br>

            <Form.Row>
                <Form.Group as={Col} md="2" controlId="pesquisar">
                    <Form.Label>
                        Pesquisar
                    </Form.Label>
                    <Form.Control
                        placeholder='Informe um código ou nome de programa...'
                        type="text"
                        name="pesquisar"
                        value={values.pesquisar}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Form.Row>

            <Button variant="success" onClick={salvarUsuario}
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

            <DefinirProgramasTable
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
                <Modal.Title>{`Definir Programas`}</Modal.Title>
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
                <DefinirProgramas
                    {...props}
                />
            </Modal.Body>
        </Modal>
    );
};

FormModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    setProgramasUser: PropTypes.func.isRequired,
};

export default FormModal;