import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import api from '../../services/api';
import EstagiosTable from './EstagiosTable';
import CapacidadeArtigo from './artigos/CapacidadeArtigo';

const formStyle = { marginLeft: '20px', marginTop: '20px', marginRight: '20px' };

const loadEstagios = () => api.get('capacidade-producao');

const CapacidadeProducao = (props) => {

    const [estagios, setEstagios] = useState([]);
    const [disabledArtigo, setDisabledArtigo] = useState(true);
    const [showFormArtigos, setShowFormArtigos] = useState(false);
    const [loading, setLoading] = useState(false);
    const [body, setBody] = useState([]);

    const [estagioSelecionado, setEstagioSelecionado] = useState(0);
    const [descEstagioSelecionado, setDescEstagioSelecionado] = useState('');

    const { currPage } = useState(1);

    const options = {
        sizePerPageList: [5, 10, 20, 40],
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
            loadEstagios()
        ])
            .then(([
                response
            ]) => {
                setEstagios(response.data);
            })
            .catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
            });
    };

    const obterBody = (estagios) => {
        setBody({
            estagiosCapacidadeProducao: estagios
        });
    };
    
    useEffect(() => {
        obterBody(estagios);
    }, [estagios]);

    useEffect(() => {
        load();
    }, []);

    const onClickSalvar = async event => {

        setLoading(true);

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

    const onClickCancelar = () => {
        load();
    };

    const onClickFormArtigos = () => {
        setShowFormArtigos(true);
    };

    return (
        <div style={formStyle}>

            <h2><b>Capacidade de Produção</b></h2>
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

            <Button onClick={onClickCancelar} variant="danger">
                Cancelar
            </Button>

            <Button onClick={onClickFormArtigos} variant="secondary" disabled={disabledArtigo}>
                Artigos
            </Button>

            <EstagiosTable
                {...props}
                estagios={estagios}
                options={options}
            />

            <CapacidadeArtigo
                {...props}
                show={showFormArtigos}
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