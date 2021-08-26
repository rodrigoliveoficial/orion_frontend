import React, { useEffect, useState } from "react";
import { Form, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import api from '../../../services/api';

const initialValues = {        
    idInspecao: 0,
    percInspecao: null,
    qtdeInspecionar: 0,
    qtdeInspecionada: 0,
    qtdeRejeitada: 0,
    percRejeicao: 0,
    motivo: null,
    estagioMotivo: '',
    quantidade: 0
}

const percentuais = [
    { value:  10, label: '10 %' },
    { value:  20, label: '20 %' },
    { value:  30, label: '30 %' },
    { value:  40, label: '40 %' },
    { value:  50, label: '50 %' },
    { value:  60, label: '60 %' },
    { value:  70, label: '70 %' },
    { value:  80, label: '80 %' },
    { value:  90, label: '90 %' },
    { value: 100, label: '100 %'}
  ];

const AbaInspecaoPecasPaineis = (props) => {
        
    //const [idInspecao, setIdInspecao] = useState(0);
    const [percInspecao, setPercInspecao] = useState(null);
    const [motivo, setMotivo] = useState(null);  
    const [disabledLctoMotivo, setDisabledLctoMotivo] = useState(true);
    //const [percInspecaoSelected, setPercInspecaoSelected] = useState(null);
    //const [qtdeInspecionar, setQtdeInspecionar] = useState(0);
    //const [qtdeInspecionada, setQtdeInspecionada] = useState(0);
    //const [qtdeRejeitada, setQtdeRejeitada] = useState(0);
    //const [percRejeicao, setPercRejeicao] = useState(0);
    //const [motivo, setMotivo] = useState(0);
    //const [motivoSelected, setMotivoSelected] = useState(0);
    //const [quantidade, setQuantidade] = useState(0);
    
    const { turno } = props; 
    const { estagio } = props; 
    const { motivos } = props;
    const { periodo } = props;
    const { ordemProducao } = props;
    const { ordemConfeccao } = props;
    const { estagiosMotivos } = props;
    const { qtdeOrdemConfeccao } = props;
    const { nomeUsuario } = props;

    const {        
        handleChange,
        setFieldValue,               
        values
    } = useFormik({
        initialValues: initialValues
    });

    useEffect(() => {
        setDisabledLctoMotivo(true);
        if ((values.percInspecao !== null)&&(values.quantidade > 0)&&(values.motivo !== null))
            setDisabledLctoMotivo(false);
    }, [values]);

    const onClickNovaInspecao = () => {
        setFieldValue('idInspecao', 0);
        setFieldValue('percInspecao', 0);
        setFieldValue('qtdeInspecionar', 0);
        setFieldValue('qtdeInspecionada', 0);
        setFieldValue('qtdeRejeitada', 0);
        setFieldValue('percRejeicao', 0);
        setFieldValue('motivo', 0);
        setFieldValue('estagioMotivo','');
        setFieldValue('quantidade', 0);                        
        setMotivo(null);
        setPercInspecao(null);
    };
    
    const onClickLancarMotivo = () => {
        
        const capa = ({
            id:	values.idInspecao,
            turno: turno,
            usuario: nomeUsuario,	
            codEstagio: estagio,
            periodo: periodo,
            ordemProducao: ordemProducao,
            ordemConfeccao: ordemConfeccao,                
            percInspecionarPcs: values.percInspecao,
            qtdeInspecionarPcs: values.qtdeInspecionar,
            qtdeInspecionadaPcs: values.qtdeInspecionada,
            qtdeRejeitadaPcs: values.qtdeRejeitada,
            percRejeitadaPcs: values.percRejeitada
        });

        const item = ({            
            id: 0,
            idInspecao: values.idInspecao,
            codMotivo: values.motivo,
            quantidade: values.quantidade,
            usuario: nomeUsuario
        });

        const body = ({
            inspecaoQualidadePeca: capa,
            inspecaoQualidadePecaLancto: item
        });







    };

    return (
        <div>
            <br></br>
            <Form id="aba-dados-gerais-form" noValidate>
            
                <Form.Row>
                    <Form.Group as={Col} md="1" controlId="id-inspecao">
                        <Form.Label>
                            ID Inspeção
                        </Form.Label>
                        
                        <Form.Control
                            type="number"                            
                            name="idInspecao"
                            disabled
                            value={values.idInspecao}
                        />                        
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="perc-inspecao">
                        <Form.Label>
                            % Inspeção
                        </Form.Label>
                        <Select className="basic-multi-select" classNamePrefix="select" placeholder="% inspeção"
                            name="percInspecao"
                            options={percentuais}
                            value={percInspecao}
                            onChange={(selected) => {           
                                let qtdeInspecionarCalc = (selected.value / 100) * qtdeOrdemConfeccao;
                                setPercInspecao(selected);
                                setFieldValue('percInspecao',selected.value);
                                setFieldValue('qtdeInspecionar',qtdeInspecionarCalc.toFixed(0));
                            }}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="qtde-inspecionar">
                        <Form.Label>
                            Qtde Inspecionar
                        </Form.Label>
                        
                        <Form.Control
                            type="number"                            
                            name="qtdeInspecionar"
                            disabled
                            value={values.qtdeInspecionar}
                        />                        
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="qtde-inspecionada">
                        <Form.Label>
                            Qtde Inspecionada
                        </Form.Label>
                        
                        <Form.Control
                            type="number" 
                            name="qtdeInspecionada"
                            disabled
                            value={values.qtdeInspecionada}
                        />                        
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="qtde-rejeitada">
                        <Form.Label>
                            Qtde Rejeitada
                        </Form.Label>
                        
                        <Form.Control
                            type="number" 
                            name="qtdeRejeitada"
                            disabled
                            value={values.qtdeRejeitada}
                        />                        
                    </Form.Group>

                    <Form.Group as={Col} md="1" controlId="perc-rejeicao">
                        <Form.Label>
                            % Rejeição
                        </Form.Label>
                        
                        <Form.Control
                            type="number" 
                            name="percRejeicao"
                            disabled
                            value={values.percRejeicao}
                        />                        
                    </Form.Group>

                </Form.Row>
                
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="motivo">
                        <Form.Label>
                            Motivo 
                        </Form.Label>
                        <Select className="basic-multi-select" classNamePrefix="select" placeholder="Informe o motivo da rejeição"
                            name="motivo"
                            options={motivos}
                            value={motivo}
                            onChange={(selected) => {
                                setMotivo(selected);
                                setFieldValue('motivo', selected.value);
                                setFieldValue('estagioMotivo', estagiosMotivos.find(o => o.value === selected.value).label);
                            }}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="2" controlId="estagio">
                        <Form.Label>
                            Estagio Defeito
                        </Form.Label>
                        <Form.Control
                            type="text"                            
                            name="estagioMotivo"
                            disabled
                            value={values.estagioMotivo}                            
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>                    
                    <Form.Group as={Col} md="1" controlId="quantidade">
                        <Form.Label>
                            Quantidade Ordem
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="quantidade"                               
                            value={values.quantidade}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Button onClick={onClickNovaInspecao}>
                        Nova Inspeção
                    </Button>
                    <Button variant="success" disabled={disabledLctoMotivo} onClick={onClickLancarMotivo}>
                        Lançar Motivo
                    </Button>
                    <Button variant="danger">
                        Excluir Inspeção
                    </Button>
                </Form.Row>
            </Form>
        </div>
    );
}

AbaInspecaoPecasPaineis.propTypes = {
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

AbaInspecaoPecasPaineis.defaultProps = {
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

export default AbaInspecaoPecasPaineis;