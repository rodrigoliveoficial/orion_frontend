import React, { useEffect, useState } from 'react';
import { Form, Col, Button, Container, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner'
import api from '../../../services/api';
import ProgramaFormTable from './ProgramaFormTable';
import Select from 'react-select';
import normalizeProgramas from './NormalizeProgramas';

const arrayAreaModulo = [
    { value: "A1", label: "A - Administrativa / 1 - Contabilidade/Custos" },
    { value: "A2", label: "A - Administrativa / 2 - Fiscal" },
    { value: "A3", label: "A - Administrativa / 3 - Suprimentos" },
    { value: "A4", label: "A - Administrativa / 4 - Financeiro" },
    { value: "A5", label: "A - Administrativa / 5 - R.H." },
    { value: "A6", label: "A - Administrativa / 6 - Tecnologia" },
    { value: "C1", label: "C - Comercial / 1 - Vendas" },
    { value: "C2", label: "C - Comercial / 2 - Exportação" },
    { value: "C3", label: "C - Comercial / 3 - E-Commerce" },
    { value: "C4", label: "C - Comercial / 4 - Varejo" },
    { value: "C5", label: "C - Comercial / 5 - Faturamento/Logística" },
    { value: "C6", label: "C - Comercial / 6 - Estoques" },
    { value: "I1", label: "I - Industrial / 1 - Planejamento" },
    { value: "I2", label: "I - Industrial / 2 - Confecção" },
    { value: "I3", label: "I - Industrial / 3 - Têxtil" },
    { value: "I4", label: "I - Industrial / 4 - Serviços" },
    { value: "I5", label: "I - Industrial / 5 - Eficiência" },
    { value: "I6", label: "I - Industrial / 6 - Manutenção" },
    { value: "P1", label: "P - Produto / 1 - Projetos" },
    { value: "P2", label: "P - Produto / 2 - Engenharia" }
]

const initialValues = {
    areaModulo: '0',
    atividade: 0,
    descricao: '',
    ferramenta: '',
    frequencia: '',
    planilha: '',
    extrator: '',
    help: ''
}

const ProgramaForm = (props) => {

    const [idProgramaAux, setidProgramaAux] = useState(0);
    const [areaModulo, setAreaModulo] = useState([]);
    const [atividade, setAtividade] = useState(0);

    const [loading, setLoading] = useState(false);
    const [desabilitarBotoes, setDesabilitarBotoes] = useState(false);
    const [tiposEmail, setTiposEmail] = useState([]);

    const { idPrograma } = props;
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

    const obterDadosPrograma = async event => {
        try {
            const response = await api.get(`programas-bi/${idPrograma}`)

            setAreaModulo(arrayAreaModulo.find(o => o.value === response.data.areaModulo))

            setFieldValue('atividade', response.data.atividade);
            setAtividade(response.data.atividade);

            setFieldValue('descricao', response.data.descricao);
            setFieldValue('ferramenta', response.data.ferramenta);
            setFieldValue('frequencia', response.data.frequencia);
            setFieldValue('planilha', response.data.planilha);
            setFieldValue('extrator', response.data.extrator);
            setFieldValue('help', response.data.help);

            const responseTiposEmail = await api.get(`programas-bi/tipos-email/${idPrograma}`)
            setTiposEmail(responseTiposEmail.data);

        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }
    }

    useEffect(() => {

        setidProgramaAux(idPrograma);

        if (editMode) {
            obterDadosPrograma();
        }

    }, [idPrograma, editMode, setFieldValue]);

    useEffect(() => {
        setDesabilitarBotoes(true);
        if ((values.areaModulo !== '') && (values.descricao !== '')) setDesabilitarBotoes(false);
    }, [values]);

    const salvarPrograma = async event => {

        setLoading(true);

        const body = ({
            id: idProgramaAux,
            areaModulo: values.areaModulo,
            atividade: values.atividade,
            descricao: values.descricao,
            ferramenta: values.ferramenta,
            frequencia: values.frequencia,
            planilha: values.planilha,
            extrator: values.extrator,
            help: values.help,
            tiposEmail: tiposEmail
        });

        try {
            const response = await api.post('programas-bi', body);
            props.setProgramas(normalizeProgramas(response.data));
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
        }
        setLoading(false);
        props.setShowFormPrograma(false);

    };

    const cancelarAcao = () => {
        props.setShowFormPrograma(false);
    }


    return (
        <div >
            <Container fluid>
                <Row>
                    <Col>

                        <Form.Row>
                            <Form.Group as={Col} md="5" controlId="areaModulo">
                                <Form.Label>
                                    Área/Módulo
                                </Form.Label>
                                <Select className="basic-multi-select" classNamePrefix="select" placeholder="Selecione a Área/Módulo."
                                    name="areaModulo"
                                    options={arrayAreaModulo}
                                    value={areaModulo}
                                    onChange={(selected) => {
                                        setFieldValue('areaModulo', selected.value);
                                        setAreaModulo(selected)
                                    }}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="1" controlId="id">
                                <Form.Label>
                                    Atividade
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="atividade"
                                    disabled={true}
                                    value={atividade}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="5" controlId="descricao">
                                <Form.Label>
                                    Descrição
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength="100"
                                    name="descricao"
                                    autoComplete="off"
                                    value={values.descricao}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="5" controlId="ferramenta">
                                <Form.Label>
                                    Ferramenta
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength="1000"
                                    name="ferramenta"
                                    autoComplete="off"
                                    value={values.ferramenta}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="5" controlId="frequencia">
                                <Form.Label>
                                    Frequência Atualização
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength="1000"
                                    name="frequencia"
                                    autoComplete="off"
                                    value={values.frequencia}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="5" controlId="planilha">
                                <Form.Label>
                                    Planilhas / Programas Auxiliares
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength="1000"
                                    name="planilha"
                                    autoComplete="off"
                                    value={values.planilha}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="5" controlId="extrator">
                                <Form.Label>
                                    Extratores
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength="1000"
                                    name="extrator"
                                    autoComplete="off"
                                    value={values.extrator}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="5" controlId="help">
                                <Form.Label>
                                    Help
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength="1000"
                                    name="help"
                                    autoComplete="off"
                                    value={values.help}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form.Row>

                    </Col>
                </Row>
            </Container>

            <br></br>

            <Button variant="success" onClick={salvarPrograma} disabled={desabilitarBotoes}
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

            <br></br>
            <br></br>

            <ProgramaFormTable
                {...props}
                options={options}
                tiposEmail={tiposEmail}
                idPrograma={idProgramaAux}
            />

        </div>
    );
}

ProgramaForm.propTypes = {
    setShowFormPrograma: PropTypes.func.isRequired,
    setProgramas: PropTypes.func.isRequired
};

export default ProgramaForm;