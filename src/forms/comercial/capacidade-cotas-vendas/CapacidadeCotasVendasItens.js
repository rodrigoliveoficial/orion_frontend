import React, { useEffect, useState } from 'react';
import { Modal, Form, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import Spinner from 'react-bootstrap/Spinner'
import api from '../../../services/api';
import PropTypes from 'prop-types';
import CapacidadeProducaoItensTable from './CapacidadeCotasVendasItensTable';
import { useFormik } from 'formik';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const formStyle = { marginLeft: '20px', marginTop: '20px', marginRight: '20px' };

const linhas = [
    { value: 52, label: '52 - LIVE FITNESS' },
    { value: 53, label: '53 - LIVE BEACH' }
]

const initialValues = {
    periodo: 0,
    linha: 0,
    colecao: 0,
    minutos: 0
}

const normalizeGrid = (dados) => {
    return dados.map((c) => {
        return {
            modelo: c.modelo,
            descricao: c.descricao,
            categoria: c.categoria,
            colecao: `${c.colecao} - ${c.descColecao}`,
            tempoUnitario: `${c.tempoUnitario.toFixed(4)}`,
            minutos: `${c.minutos.toFixed(4)}`,
            pecas: c.pecas
        };
    });
};

const CapacidadeProducaoItens = (props) => {

    const [periodo, setPeriodo] = useState([]);
    const [colecao, setColecao] = useState([]);
    const [capacidadesItens, setCapacidadesItens] = useState([]);
    const [linha, setLinha] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listarComQtde, setListarComQtde] = useState(false);
    const [listarTempUnit, setListarTempUnit] = useState(false);
    const [desabilitarCampos, setDesabilitarCampos] = useState(false);
    const [disableSalvar, setDisableSalvar] = useState(true);

    const { idCapacidade } = props;
    const { editMode } = props;
    const { periodos } = props;
    const { colecoes } = props;

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

    const obterItens = (linha, colecao, periodo, listarComQtde, listarTempUnit) => {
        api.get(`cotas-vendas/itens/${colecao}/${linha}/${periodo}/${listarComQtde}/${listarTempUnit}`).then((response) => {
            setCapacidadesItens(normalizeGrid(response.data));
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setCapacidadesItens([]);
        });
    }

    useEffect(() => {
        if ((values.periodo > 0) && (values.linha > 0) && (values.colecao > 0)) {
            obterItens(values.linha, values.colecao, values.periodo, listarComQtde, listarTempUnit);
        }
        if ((values.periodo > 0) && (values.linha > 0) && (values.colecao > 0) && (values.minutos > 0)) {
            setDisableSalvar(false);
        }

    }, [values, listarComQtde, listarTempUnit]);

    const obterCapacidades = async event => {
        try {
            const response = await api.get(`cotas-vendas/id-cotas/capa/${idCapacidade}`)

            setPeriodo(periodos.find(o => o.value === response.data.periodo))
            setLinha(linhas.find(o => o.value === response.data.linha))
            setColecao(colecoes.find(o => o.value === response.data.colecao))

            setFieldValue('periodo', response.data.periodo)
            setFieldValue('linha', response.data.linha)
            setFieldValue('colecao', response.data.colecao)
            setFieldValue('minutos', response.data.minDistribuir)

            const responseCapacidades = await api.get(`cotas-vendas/itens/${response.data.colecao}/${response.data.linha}/${response.data.periodo}/${listarComQtde}/${listarTempUnit}`)
            setCapacidadesItens(normalizeGrid(responseCapacidades.data));

        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }
    }

    useEffect(() => {
        if (editMode) {
            obterCapacidades();
            setDesabilitarCampos(true);
        }
    }, [idCapacidade, editMode]);

    const onClickSalvar = async event => {

        setLoading(true);

        const body = ({
            periodo: values.periodo,
            colecao: values.colecao,
            linha: values.linha,
            modelos: capacidadesItens,
            listarComQtde: listarComQtde,
            minDistribuir: values.minutos,
            listarTempUnit: listarTempUnit
        });

        console.log(body)
        try {
            const response = await api.post('cotas-vendas', body);
            setCapacidadesItens(normalizeGrid(response.data));
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
            setCapacidadesItens();
        }

        setDesabilitarCampos(true);
        setLoading(false);
    };

    const onChecked = (isChecked) => {

        if (isChecked) setListarComQtde(false);
        else setListarComQtde(true);
    }

    const onCheckedTemp = (isChecked) => {

        if (isChecked) setListarTempUnit(false);
        else setListarTempUnit(true);
    }

    const helpMinutos = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Minutos ?? Distribuir</Popover.Title>
            <Popover.Content>
                Os minutos informados neste campo ser??o distribu??dos igualmente para todos os modelos listados no grid (exceto para os que n??o possuem tempo unit??rio no roteiro de produ????o).
                Com base nessa informa????o, ser??o calculadas as quantidades de pe??as que ser??o produzidas para cada modelo.
            </Popover.Content>
        </Popover>
    );

    return (
        <div style={formStyle}>

            <Form.Row>
                <Form.Group as={Col} md="2" controlId="periodo">
                    <Form.Label>
                        Per??odo
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o per??odo..."
                        name="periodo"
                        options={periodos}
                        value={periodo}
                        isDisabled={desabilitarCampos}
                        onChange={(selected) => {
                            setPeriodo(selected);
                            setFieldValue('periodo', selected.value);

                        }}
                    />
                </Form.Group>

                <Form.Group as={Col} md="2" controlId="colecao">
                    <Form.Label>
                        Cole????o
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe a cole????o..."
                        name="colecao"
                        options={colecoes}
                        value={colecao}
                        isDisabled={desabilitarCampos}
                        onChange={(selected) => {
                            setColecao(selected);
                            setFieldValue('colecao', selected.value);
                        }}
                    />
                </Form.Group>

                <Form.Group as={Col} md="2" controlId="linha">
                    <Form.Label>
                        Linha
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe a linha..."
                        name="linha"
                        options={linhas}
                        value={linha}
                        isDisabled={desabilitarCampos}
                        onChange={(selected) => {
                            setLinha(selected);
                            setFieldValue('linha', selected.value);
                        }}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Minutos ?? Distribuir
                    </Form.Label>
                    <OverlayTrigger placement="right" overlay={helpMinutos}>
                        <Form.Control
                            type="number"
                            maxLength="2"
                            name="minutos"
                            autoComplete="off"
                            value={values.minutos}
                            onChange={handleChange}
                        />
                    </OverlayTrigger>
                </Form.Group>

            </Form.Row>

            <Form.Row>
                <Form.Group className="mb-3" md="2" controlId="listarComQtde">
                    <Form.Check type="checkbox" label="Listar somente com quantidade de pe??as informadas"
                        name="listarComQtde"
                        checked={listarComQtde}
                        onChange={() => { onChecked(listarComQtde) }}
                    />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group className="mb-3" md="2" controlId="listarTempUnit">
                    <Form.Check type="checkbox" label="Listar somente refer??ncias com tempo unit??rio"
                        name="listarTempUnit"
                        checked={listarTempUnit}
                        onChange={() => { onCheckedTemp(listarTempUnit) }}
                    />
                </Form.Group>
            </Form.Row>

            <br></br>

            <Button onClick={onClickSalvar} variant="success" disabled={disableSalvar}
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
                <Modal.Title>{`Cotas de Vendas: ${props.editMode ? 'Edi????o' : 'Inser????o'}`}</Modal.Title>
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