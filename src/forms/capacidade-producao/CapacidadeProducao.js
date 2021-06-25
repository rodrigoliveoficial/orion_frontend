import React, { useEffect, useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import Spinner from 'react-bootstrap/Spinner'
import api from '../../services/api';
import EstagiosTable from './EstagiosTable';
import CapacidadeArtigo from './artigos/CapacidadeArtigo';
import Ajuda from '../../components/Modal/Modal';

const formStyle = { marginLeft: '20px', marginTop: '20px', marginRight: '20px' };

const loadPeriodos = () => api.get('periodos-producao/producao');

const normalizePeriodos = (dados) => {
    return dados.map((c) => {
        return {
            value: c.periodo,
            label: `${c.periodo} - ${c.dataIniPeriodo} até ${c.dataFimPeriodo}`
        };
    });
};

const CapacidadeProducao = (props) => {

    const [periodos, setPeriodos] = useState([]);
    const [periodo, setPeriodo] = useState([]);

    const [estagios, setEstagios] = useState([]);
    const [disabledArtigo, setDisabledArtigo] = useState(true);
    const [showFormArtigos, setShowFormArtigos] = useState(false);
    const [loading, setLoading] = useState(false);

    const [estagioSelecionado, setEstagioSelecionado] = useState(0);
    const [descEstagioSelecionado, setDescEstagioSelecionado] = useState('');

    const { currPage } = useState(1);

    const options = {
        sizePerPageList: [5, 10, 20, 40, 1000],
        sizePerPage: 10,
        page: currPage,
        onRowClick: function (row) {
            setDisabledArtigo(false);
            setEstagioSelecionado(row.estagio);
            setDescEstagioSelecionado(`${row.estagio} - ${row.descricao}`);
        }
    };

    const load = () => {
        Promise.all([
            loadPeriodos()
        ])
            .then(([
                response
            ]) => {
                setPeriodos(normalizePeriodos(response.data));
            })
            .catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
            });
    };
    
    useEffect(() => {
        load();
    }, []);

    const obterEstagios = (periodo) => {
        api.get(`capacidade-producao/${periodo}`).then((response) => {
            setEstagios(response.data);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setEstagios([]);
        });
    }

    const onClickSalvar = async event => {

        setLoading(true);

        const body = ({
            periodo: periodo.value,
            estagiosCapacidadeProducao: estagios
        });

        try {
            const response = await api.post('capacidade-producao', body);
            setEstagios(response.data)
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
            setEstagios([]);
        }

        setLoading(false);
    };

    const onClickFormArtigos = () => {
        setShowFormArtigos(true);
    };

    return (
        <div style={formStyle}>

            <h2><b>Capacidade de Produção</b></h2>
            <br></br>

            <Form.Row>
                <Form.Group as={Col} md="2" controlId="periodo">
                    <Form.Label>
                        Período de Produção
                    </Form.Label>
                    <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o período de produção."
                        name="periodo"
                        options={periodos}
                        value={periodo}
                        onChange={(selected) => {
                            setPeriodo(selected);
                            obterEstagios(selected.value);
                        }}
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

            <Button onClick={onClickFormArtigos} variant="secondary" disabled={disabledArtigo}>
                Artigos
            </Button>

            <Ajuda
                {...props}
                idPrograma={2}
            />

            <EstagiosTable
                {...props}
                estagios={estagios}
                options={options}
            />

            <CapacidadeArtigo
                {...props}
                show={showFormArtigos}
                periodoSelecionado={periodo.value}
                estagioSelecionado={estagioSelecionado}
                descEstagioSelecionado={descEstagioSelecionado}
                onClose={() => {
                    setShowFormArtigos(false);
                }}
            />

        </div>
    );
}

export default CapacidadeProducao;