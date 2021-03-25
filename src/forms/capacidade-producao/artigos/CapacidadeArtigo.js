/* eslint max-len: 0 */
import React, { useEffect, useState } from 'react';
import { Modal, Button, Container, Form, Row, Col, Tabs, Tab } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import api from '../../../services/api';
import PropTypes from 'prop-types';
import ArtigosTable from './ArtigosTable';

const CapacidadeArtigo = (props) => {

    const [artigos, setArtigos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [body, setBody] = useState([]);
    
    const { currPage } = useState(1);

    const options = {
        sizePerPageList: [5, 10, 20, 40],
        sizePerPage: 10,
        page: currPage
    };

    const load = () => {
        api.get(`capacidade-producao/artigos/${props.estagioSelecionado}`).then((response) => {
            setArtigos(response.data);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setArtigos([]);
        });
    };

    useEffect(() => {
        const obterBody = () => {
            setBody({
                estagio: props.estagioSelecionado,
                artigosCapacidadeProducao: artigos
            });
        };
        obterBody();
    }, [artigos]);

    useEffect(() => {
        load();
    }, []);

    const onClickSalvar = async event => {

        setLoading(true);

        try {
            const response = await api.post('capacidade-producao/artigos', body);
            setArtigos(response.data)
        } catch (e) {
            console.log('ocorreu algum erro!');
            console.error(e);
            setArtigos([]);
        }

        setLoading(false);
    };

    const onClickCancelar = () => {
        load();
    };

    return (
        <div>

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

            <ArtigosTable
                {...props}
                artigos={artigos}
                options={options}
            />

        </div>
    );
}

const FormModal = (props) => {

    return (
        <Modal dialogClassName="modal-full" show={props.show} onHide={props.onClose} animation={true}>
            <Modal.Header>
                <Modal.Title>{`Capacidade por Artigo do Estágio: ${props.descEstagioSelecionado}`}</Modal.Title>
                <div>
                    <Button
                        variant="danger"
                        onClick={props.onClose}
                        style={{ marginLeft: '10px' }}
                    >
                        Cancelar
                    </Button>
                </div>
            </Modal.Header>
            <Modal.Body>
                <CapacidadeArtigo
                    {...props}
                />
            </Modal.Body>
        </Modal>
    );
};

FormModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    estagioSelecionado: PropTypes.number.isRequired,
    descEstagioSelecionado: PropTypes.string
};

export default FormModal;