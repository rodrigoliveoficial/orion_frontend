/* eslint max-len: 0 */
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import api from '../../../../services/api';
import PropTypes from 'prop-types';
import ArtigosTable from './ArtigosTable';

const CapacidadeArtigo = (props) => {

    const [artigos, setArtigos] = useState([]);
    const [loading, setLoading] = useState(false);

    const [qtdePecasEstagio, setQtdePecasEstagio] = useState(0);
    const [qtdeMinutosEstagio, setQtdeMinutosEstagio] = useState(0);

    const { currPage } = useState(1);

    const { periodoSelecionado } = props;
    const { estagioSelecionado } = props;

    const options = {
        sizePerPageList: [5, 10, 20, 40, 1000],
        sizePerPage: 10,
        page: currPage
    };

    const load = (periodo, estagio) => {

        api.get(`capacidade-producao/${periodo}/${estagio}`).then((response) => {
            setQtdePecasEstagio(response.data.qtdePecas);
            setQtdeMinutosEstagio(response.data.qtdeMinutos);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
        });

        api.get(`capacidade-producao/artigos/${periodo}/${estagio}`).then((response) => {
            setArtigos(response.data);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setArtigos([]);
        });
    };

    useEffect(() => {
        load(periodoSelecionado, estagioSelecionado);
    }, [periodoSelecionado, estagioSelecionado]);

    const validarQuantidades = () => {

        let qtdesValidas = true;
        let qtdePecas = 0;
        let qtdeMinutos = 0;

        for (let i = 0, tableDataLen = artigos.length; i < tableDataLen; i++) {
            qtdePecas += parseInt(artigos[i].qtdePecas);
            qtdeMinutos += parseInt(artigos[i].qtdeMinutos);
        }

        if (qtdePecas > qtdePecasEstagio) {
            alert('As quantidades de peças dos artigos não podem exceder a quantidade do estágio');
            qtdesValidas = false;
        }

        if (qtdeMinutos > qtdeMinutosEstagio) {
            alert('As quantidades de minutos dos artigos não podem exceder a quantidade do estágio');
            qtdesValidas = false;
        }

        return qtdesValidas;
    }

    const onClickSalvar = async event => {

        setLoading(true);

        if (validarQuantidades()) {
            const body = ({
                periodo: periodoSelecionado,
                estagio: estagioSelecionado,
                artigosCapacidadeProducao: artigos
            });

            try {
                const response = await api.post('capacidade-producao/artigos', body);
                setArtigos(response.data)
            } catch (e) {
                console.log('ocorreu algum erro!');
                console.error(e);
                setArtigos([]);
            }
        }

        setLoading(false);
    };

    return (
        <div>

            <br></br>

            <Form.Row>
                <Form.Group as={Col} md="2" controlId="qtdePecasEstagio">
                    <Form.Label>
                        Quantidade de Peças do Estágio
                                        </Form.Label>
                    <Form.Control
                        type="text"
                        name="qtdePecasEstagio"
                        disabled
                        value={qtdePecasEstagio}
                    />
                </Form.Group>

                <Form.Group as={Col} md="2" controlId="qtdeMinutosEstagio">
                    <Form.Label>
                        Quantidade de Minutos do Estágio
                                        </Form.Label>
                    <Form.Control
                        type="text"
                        name="qtdeMinutosEstagio"
                        disabled
                        value={qtdeMinutosEstagio}
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
                <Modal.Title>{`Capacidade por Artigo do Período: ${props.periodoSelecionado} e Estágio: ${props.descEstagioSelecionado}`}</Modal.Title>
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
    descEstagioSelecionado: PropTypes.string,
    periodoSelecionado: PropTypes.number.isRequired
};

export default FormModal;