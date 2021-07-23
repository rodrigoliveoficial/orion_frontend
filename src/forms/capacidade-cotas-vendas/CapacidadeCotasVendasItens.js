import React, { useEffect, useState } from 'react';
import { Modal, Form, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import Spinner from 'react-bootstrap/Spinner'
import api from '../../services/api';
import PropTypes from 'prop-types';
import CapacidadeProducaoItensTable from './CapacidadeCotasVendasItensTable';
import { useFormik } from 'formik';

const formStyle = { marginLeft: '20px', marginTop: '20px', marginRight: '20px' };

const linhas = [
    { value: 52, label: '52 - LIVE FITNESS' },
    { value: 53, label: '53 - LIVE BEACH' }
]

const initialValues = {
    periodo: 0,
    linha: 0,
    categoria: 0,
}

const CapacidadeProducaoItens = (props) => {

    const [periodo, setPeriodo] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [capacidadesItens, setCapacidadesItens] = useState([]);
    const [linha, setLinha] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listarComQtde, setListarComQtde] = useState(false);

    const { idCapacidade } = props;
    const { editMode } = props;
    const { periodos } = props;
    const { categorias } = props;

    const { currPage } = useState(1);

    const options = {
        sizePerPageList: [5, 10, 20, 40, 1000],
        sizePerPage: 10,
        page: currPage,
        defaultSortName: 'modelo',
        defaultSortOrder: 'asc'
    };

    const {
        handleChange,
        values,
        setFieldValue
    } = useFormik({
        initialValues: initialValues
    });

    const obterItens = (linha, categoria, periodo, listarComQtde) => {
        api.get(`cotas-vendas/itens/${categoria}/${linha}/${periodo}/${listarComQtde}`).then((response) => {
            setCapacidadesItens(response.data);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setCapacidadesItens([]);
        });
    }

    useEffect(() => {
        if ((values.periodo > 0) && (values.linha > 0) && (values.categoria > 0)) {
            obterItens(values.linha, values.categoria, values.periodo, listarComQtde);
        }
    }, [values,listarComQtde]);

    const obterCapacidades = async event => {
        try {
            const response = await api.get(`cotas-vendas/id-cotas/capa/${idCapacidade}`)

            setPeriodo(periodos.find(o => o.value === response.data.periodo))
            setLinha(linhas.find(o => o.value === response.data.linha))
            setCategoria(categorias.find(o => o.value === response.data.categoria))

            setFieldValue('periodo', response.data.periodo)
            setFieldValue('linha', response.data.linha)
            setFieldValue('categoria', response.data.categoria)

            const responseCapacidades = await api.get(`cotas-vendas/itens/${response.data.categoria}/${response.data.linha}/${response.data.periodo}/${listarComQtde}`)
            setCapacidadesItens(responseCapacidades.data);

        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }
    }

    useEffect(() => {
        if (editMode) {
            obterCapacidades();
        }
    }, [idCapacidade, editMode]);

    const onClickSalvar = async event => {

        setLoading(true);

        const body = ({
            periodo: values.periodo,
            categoria: values.categoria,
            linha: values.linha,
            modelos: capacidadesItens,
            listarComQtde: listarComQtde
        });

        try {
            console.log(body)
            const response = await api.post('cotas-vendas', body);
            setCapacidadesItens(response.data);
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
            setCapacidadesItens();
        }

        setLoading(false);  
    };

    const onChecked = (isChecked) => {

        if (isChecked) setListarComQtde(false);
        else setListarComQtde(true);

    }

    return (
        <div style={formStyle}>

            <Form.Row>
                <Form.Group as={Col} md="2" controlId="periodo">
                    <Form.Label>
                        Período
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o período."
                        name="periodo"
                        options={periodos}
                        value={periodo}
                        isDisabled={editMode}
                        onChange={(selected) => {
                            setPeriodo(selected);
                            setFieldValue('periodo', selected.value);

                        }}
                    />
                </Form.Group>

                <Form.Group as={Col} md="2" controlId="linha">
                    <Form.Label>
                        Linha
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe a linha."
                        name="linha"
                        options={linhas}
                        value={linha}
                        isDisabled={editMode}
                        onChange={(selected) => {
                            setLinha(selected);
                            setFieldValue('linha', selected.value);
                        }}
                    />
                </Form.Group>

                <Form.Group as={Col} md="2" controlId="categoria">
                    <Form.Label>
                        Categoria
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe a categoria."
                        name="categoria"
                        options={categorias}
                        value={categoria}
                        isDisabled={editMode}
                        onChange={(selected) => {
                            setCategoria(selected);
                            setFieldValue('categoria', selected.value);
                        }}
                    />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group className="mb-3" md="2" controlId="listarComQtde">
                    <Form.Check type="checkbox" label="Listar apenas com capacidades informadas"
                        name="listarComQtde"
                        checked={listarComQtde}
                        onChange={() => { onChecked(listarComQtde) }}
                    />
                </Form.Group>
            </Form.Row>

            <br></br>

            <Button onClick={onClickSalvar} variant="success" disabled={loading}
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

            <CapacidadeProducaoItensTable
                {...props}
                capacidadesItens={capacidadesItens}
                options={options}
            />

        </div>
    );
}

const FormModal = (props) => {

    return (
        <Modal dialogClassName="modal-full" show={props.show} onHide={props.onClose} animation={true}>
            <Modal.Header>
                <Modal.Title>{`Capacidade de Cotas de Vendas: ${props.editMode ? 'Edição' : 'Inserção'}`}</Modal.Title>
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
                <CapacidadeProducaoItens
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