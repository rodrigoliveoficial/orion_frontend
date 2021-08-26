import React, { useState, useCallback } from "react";
import { Form, Col } from 'react-bootstrap';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import api from '../../../services/api';

const initialValues = {        
    ordemPacote: ''
}

const turnos = [
    { value: 1, label: 'Turno 1' },
    { value: 2, label: 'Turno 2' },
    { value: 3, label: 'Turno 3' },
    { value: 4, label: 'Turno 4' }
  ];

const AbaDadosGerais = (props) => {
        
    const [turno, setTurno] = useState({ value: 1, label: 'Turno 1' });
    const [estagio, setEstagio] = useState(null);

    const helpOrdemPacote = (
        <Popover id="help-ordem-pacote">
            <Popover.Title as="h3">Ordem / Pacote</Popover.Title>
            <Popover.Content>
                Informe o numero da ordem e do pacote no formato 999999999.99999 ou informe o numero do talão de produção.
            </Popover.Content>
        </Popover>
    );

    const {
        handleChange,                
        values
    } = useFormik({
        initialValues: initialValues
    });
    
    const onKeyDownOrdemPacote = useCallback((event) => {
        if (event.key !== 'Enter' && event.key !== 'Tab') {
          return;
        }  

        api.get(`inspecao-qualidade/ordem-confeccao/${values.ordemPacote}`).then((response) => {            
            if (response.data.ordemValida === false) alert('Ordem inválida ou cancelada!');
            props.setPeriodo(response.data.dadosOrdemConfeccao.periodo);
            props.setOrdemProducao(response.data.dadosOrdemConfeccao.ordemProducao);
            props.setQtdeOrdemProducao(response.data.dadosOrdemConfeccao.qtdePecasProgramada);
            props.setOrdemConfeccao(response.data.dadosOrdemConfeccao.ordemConfeccao);
            props.setQtdeOrdemConfeccao(response.data.dadosOrdemConfeccao.qtdePecas);
            props.setReferencia(response.data.dadosOrdemConfeccao.referencia);
            props.setTamanho(response.data.dadosOrdemConfeccao.tamanho);
            props.setCor(response.data.dadosOrdemConfeccao.cor);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            props.setPeriodo(0);
            props.setOrdemProducao(0);
            props.setQtdeOrdemProducao(0);
            props.setOrdemConfeccao(0);
            props.setQtdeOrdemConfeccao(0);
            props.setReferencia('');
            props.setTamanho('');
            props.setCor('');
        });

    }, [props, values]);

    return (
        <div>
            <br></br>
            <Form id="aba-dados-gerais-form" noValidate>
                
                <Form.Row>
                    <Form.Group as={Col} md="2" controlId="data">
                        <Form.Label>
                            Data Inspeção
                        </Form.Label>
                        <Form.Control
                            type="date"
                            row="1"                                                            
                            value={props.data}                                                        
                            onChange={(e) => {                                
                                props.setData(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="2" controlId="revisor">
                        <Form.Label>
                            Revisor
                        </Form.Label>
                        <Form.Control
                            type="text"                            
                            name="revisor"
                            disabled
                            value={props.nomeUsuario}                            
                        />
                    </Form.Group>
                </Form.Row>
                
                <Form.Row>
                    <Form.Group as={Col} md="1" controlId="turno">
                        <Form.Label>
                            Turno
                        </Form.Label>
                        <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o turno"
                            name="turno"
                            options={turnos}
                            value={turno}
                            onChange={(selected) => {                                                                
                                setTurno(selected);
                                props.setTurno(selected.value);
                            }}
                        />
                    </Form.Group>
                   
                    <Form.Group as={Col} md="3" controlId="estagio">
                        <Form.Label>
                            Estágio
                        </Form.Label>
                        <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o estágio da análise"
                            name="estagio"
                            options={props.estagios}
                            value={estagio}
                            onChange={(selected) => {
                                setEstagio(selected);
                                props.setEstagio(selected.value);                                
                            }}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="3" controlId="ordem-pacote">
                        <Form.Label>
                            Ordem / Pacote
                        </Form.Label>
                        <OverlayTrigger placement="right" overlay={helpOrdemPacote}>
                            <Form.Control
                                type="text"
                                maxLength="20"
                                name="ordemPacote"
                                autoComplete="off"
                                value={values.ordemPacote}
                                onChange={handleChange}
                                onKeyDown={onKeyDownOrdemPacote}
                            />
                        </OverlayTrigger>
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="periodo">
                        <Form.Label>
                            Período
                        </Form.Label>
                        
                        <Form.Control
                            type="number"                            
                            name="periodo"                            
                            disabled
                            value={props.periodo}                            
                        />                        
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="1" controlId="ordem-producao">
                        <Form.Label>
                            Ordem de Produção
                        </Form.Label>
                        <Form.Control
                            type="number"                            
                            name="ordemProducao" 
                            disabled                           
                            value={props.ordemProducao}                            
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="qtde-ordem-producao">
                        <Form.Label>
                            Quantidade Ordem
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="qtdeOrdemProducao"   
                            disabled                         
                            value={props.qtdeOrdemProducao}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="ordem-confeccao">
                        <Form.Label>
                            Pacote
                        </Form.Label>
                        <Form.Control
                            type="number"                            
                            name="ordemConfeccao"   
                            disabled                         
                            value={props.ordemConfeccao}                            
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="qtde-ordem-confeccao">
                        <Form.Label>
                            Quantidade Pacote
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="qtdeOrdemConfeccao"   
                            disabled                         
                            value={props.qtdeOrdemConfeccao}                            
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="referencia">
                        <Form.Label>
                            Referência
                        </Form.Label>
                        <Form.Control
                            type="text"                            
                            name="referencia"
                            disabled
                            value={props.referencia}                            
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="2" controlId="tamanho">
                        <Form.Label>
                            Tamanho
                        </Form.Label>
                        <Form.Control
                            type="text"                            
                            name="tamanho"
                            disabled
                            value={props.tamanho}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="2" controlId="cor">
                        <Form.Label>
                            Cor
                        </Form.Label>
                        <Form.Control
                            type="text"                            
                            name="Cor"
                            disabled
                            value={props.cor}
                        />
                    </Form.Group>

                </Form.Row>

            </Form>
        </div>
    );
}

AbaDadosGerais.propTypes = {
    setData: PropTypes.func,
    setTurno: PropTypes.func,
    setEstagio: PropTypes.func,
    setPeriodo: PropTypes.func,
    setOrdemProducao: PropTypes.func,
    setQtdeOrdemProducao: PropTypes.func,
    setOrdemConfeccao: PropTypes.func,
    setQtdeOrdemConfeccao: PropTypes.func,
    setReferencia: PropTypes.func,
    setTamanho: PropTypes.func,
    setCor: PropTypes.func
};

AbaDadosGerais.defaultProps = {
    setData: () => { },
    setTurno: () => { },
    setEstagio: () => { },
    setPeriodo: () => { },
    setOrdemProducao: () => { },
    setQtdeOrdemProducao: () => { },
    setOrdemConfeccao: () => { },
    setQtdeOrdemConfeccao: () => { },
    setReferencia: () => { },
    setTamanho: () => { },
    setCor: () => { }
};

export default AbaDadosGerais;