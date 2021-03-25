import React, { useEffect, useState } from "react";
import { Form, Modal, Button, Tabs, Tab } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import PropTypes from 'prop-types';
import AbaGlobal from './AbaGlobal';
import AbaAnalise from './AbaAnalise';
import AbaPlanejamento from './AbaPlanejamento';
import api from '../../../services/api';

const formStyle = { marginLeft: '20px', marginTop: '20px', marginRight: '20px' };

const GerarPlanoMestre = (props) => {

    const [bodyParametros, setbodyParametros] = useState([]);

    // ABA GLOBAL
    const [descricaoInfo, setDescricaoInfo] = useState('');
    const [periodoPadraoInfo, setPeriodoPadraoInfo] = useState(0);
    const [multiplicadorInfo, setMultiplicadorInfo] = useState([]);
    const [tipoDistribuicaoSelected, setTipoDistribuicaoSelected] = useState([]);    

    // ABA ANALISE
    const [colecoesSelected, setColecoesSelected] = useState([]);
    const [colecoesPermSelected, setColecoesPermSelected] = useState([]);
    const [linhasProdutoSelected, setLinhasProdutoSelected] = useState([]);
    const [artigosProdutoSelected, setArtigosProdutoSelected] = useState([]);
    const [artigosCotasSelected, setArtigosCotasSelected] = useState([]);
    const [publicoAlvoSelected, setPublicoAlvoSelected] = useState([]);
    const [embarquesSelected, setEmbarquesSelected] = useState([]);

    const [produtosSelected, setProdutosSelected] = useState([]);
    const [coresSelected, setCoresSelected] = useState([]);
    const [origProdutoSelected, setOrigProdutoSelected] = useState([]);

    // ABA PLANEJAMENTO
    const [perDemInico1Info, setPerDemInico1Info] = useState(0);
    const [perDemInico2Info, setPerDemInico2Info] = useState(0);
    const [perDemInico3Info, setPerDemInico3Info] = useState(0);
    const [perDemInico4Info, setPerDemInico4Info] = useState(0);
    const [perDemInico5Info, setPerDemInico5Info] = useState(0);
    const [perDemInico6Info, setPerDemInico6Info] = useState(0);
    const [perDemInico7Info, setPerDemInico7Info] = useState(0);
    const [perDemInico8Info, setPerDemInico8Info] = useState(0);

    const [perDemFim1Info, setPerDemFim1Info] = useState(0);
    const [perDemFim2Info, setPerDemFim2Info] = useState(0);
    const [perDemFim3Info, setPerDemFim3Info] = useState(0);
    const [perDemFim4Info, setPerDemFim4Info] = useState(0);
    const [perDemFim5Info, setPerDemFim5Info] = useState(0);
    const [perDemFim6Info, setPerDemFim6Info] = useState(0);
    const [perDemFim7Info, setPerDemFim7Info] = useState(0);
    const [perDemFim8Info, setPerDemFim8Info] = useState(0);

    const [perProcInico1Info, setPerProcInico1Info] = useState(0);
    const [perProcInico2Info, setPerProcInico2Info] = useState(0);
    const [perProcInico3Info, setPerProcInico3Info] = useState(0);
    const [perProcInico4Info, setPerProcInico4Info] = useState(0);
    const [perProcInico5Info, setPerProcInico5Info] = useState(0);
    const [perProcInico6Info, setPerProcInico6Info] = useState(0);
    const [perProcInico7Info, setPerProcInico7Info] = useState(0);
    const [perProcInico8Info, setPerProcInico8Info] = useState(0);

    const [perProcFim1Info, setPerProcFim1Info] = useState(0);
    const [perProcFim2Info, setPerProcFim2Info] = useState(0);
    const [perProcFim3Info, setPerProcFim3Info] = useState(0);
    const [perProcFim4Info, setPerProcFim4Info] = useState(0);
    const [perProcFim5Info, setPerProcFim5Info] = useState(0);
    const [perProcFim6Info, setPerProcFim6Info] = useState(0);
    const [perProcFim7Info, setPerProcFim7Info] = useState(0);
    const [perProcFim8Info, setPerProcFim8Info] = useState(0);

    const [consideraDepositoSelected, setConsideraDepositoSelected] = useState(0);
    const [mostraProdSemDepoSelected, setMostraProdSemDepoSelected] = useState(0);
    const [mostraProdSemProcSelected, setMostraProdSemProcSelected] = useState(0);
    const [consideraPedBloquSelected, setConsideraPedBloquSelected] = useState(0);
    const [mostraProdSemPediSelected, setMostraProdSemPediSelected] = useState(0);

    const [depositosSelected, setDepositosSelected] = useState([]);
    const [pedidosSelected, setPedidosSelected] = useState([]);    
    const [nrInternoPedidoInfo, setNrInternoPedidoInfo] = useState(0);


    const gerarPlanoMestre = async event => {

        event.preventDefault();
        props.setLoading(true);
        console.log('gerarPlanoMestre');
        console.log(bodyParametros);
        try {
            const response = await api.post('plano-mestre/gerar', bodyParametros);
            props.onSubmit(response.data);
        } catch (e) {
            console.log('ocorreu algum erro na geração do plano mestre!');
            console.error(e);
        }
        props.setLoading(false);
        props.onClose();
    };

    useEffect(() => {

        const obterParametros = () => {
            setbodyParametros({
                descricao: descricaoInfo,
                multiplicador: multiplicadorInfo,
                periodoPadrao: periodoPadraoInfo, 
                tipoDistribuicao: tipoDistribuicaoSelected,                 
                colecoes: colecoesSelected,
                colecoesPermanentes: colecoesPermSelected,
                linhasProduto: linhasProdutoSelected,
                artigosProduto: artigosProdutoSelected,
                artigosCotas: artigosCotasSelected,
                publicosAlvos: publicoAlvoSelected,                
                embarques: embarquesSelected,
                produtos: produtosSelected, 
                cores: coresSelected, 
                origProdutos: origProdutoSelected,
                perDemInicio01: perDemInico1Info,
                perDemInicio02: perDemInico2Info,
                perDemInicio03: perDemInico3Info,
                perDemInicio04: perDemInico4Info,
                perDemInicio05: perDemInico5Info,
                perDemInicio06: perDemInico6Info,
                perDemInicio07: perDemInico7Info,
                perDemInicio08: perDemInico8Info,
                perDemFim01: perDemFim1Info,
                perDemFim02: perDemFim2Info,
                perDemFim03: perDemFim3Info,
                perDemFim04: perDemFim4Info,
                perDemFim05: perDemFim5Info,
                perDemFim06: perDemFim6Info,
                perDemFim07: perDemFim7Info,
                perDemFim08: perDemFim8Info,
                perProcInicio01: perProcInico1Info,
                perProcInicio02: perProcInico2Info,
                perProcInicio03: perProcInico3Info,
                perProcInicio04: perProcInico4Info,
                perProcInicio05: perProcInico5Info,
                perProcInicio06: perProcInico6Info,
                perProcInicio07: perProcInico7Info,
                perProcInicio08: perProcInico8Info,
                perProcFim01: perProcFim1Info,
                perProcFim02: perProcFim2Info,
                perProcFim03: perProcFim3Info,
                perProcFim04: perProcFim4Info,
                perProcFim05: perProcFim5Info,
                perProcFim06: perProcFim6Info,
                perProcFim07: perProcFim7Info,
                perProcFim08: perProcFim8Info,
                consideraDepositos: consideraDepositoSelected,
                mostraProdSemEstoques: mostraProdSemDepoSelected,
                mostraProdSemProcessos: mostraProdSemProcSelected,
                consideraPedBloqueados: consideraPedBloquSelected,
                mostraProdSemPedidos: mostraProdSemPediSelected,
                depositos: depositosSelected, 
                nrInternoPedido: nrInternoPedidoInfo, 
                pedidos : pedidosSelected                
            });
        };

        obterParametros();

    }, [descricaoInfo, colecoesSelected, colecoesPermSelected, linhasProdutoSelected, artigosProdutoSelected, artigosCotasSelected, publicoAlvoSelected,
        perDemInico1Info, perDemInico2Info, perDemInico3Info, perDemInico4Info, perDemInico5Info, perDemInico6Info, perDemInico7Info, perDemInico8Info,
        perDemFim1Info, perDemFim2Info, perDemFim3Info, perDemFim4Info, perDemFim5Info, perDemFim6Info, perDemFim7Info, perDemFim8Info, perProcInico1Info,
        perProcInico2Info, perProcInico3Info, perProcInico4Info, perProcInico5Info, perProcInico6Info, perProcInico7Info, perProcInico8Info, perProcFim1Info,
        perProcFim2Info, perProcFim3Info, perProcFim4Info, perProcFim5Info, perProcFim6Info, perProcFim7Info, perProcFim8Info,
        consideraDepositoSelected, mostraProdSemDepoSelected, mostraProdSemProcSelected, consideraPedBloquSelected, mostraProdSemPediSelected, 
        produtosSelected, coresSelected, origProdutoSelected, depositosSelected, nrInternoPedidoInfo, pedidosSelected,embarquesSelected,
        periodoPadraoInfo, tipoDistribuicaoSelected, multiplicadorInfo]);

    return (
        <div style={formStyle}>
            <Form id="plano-mestre-form-gerar" noValidate onSubmit={gerarPlanoMestre}></Form>
            <Tabs defaultActiveKey="aba1" transition={false} id="abas-plano-mestre">
                <Tab eventKey="aba1" title="Global" >
                    <AbaGlobal
                        {...props}
                        setDescricaoInfo={setDescricaoInfo}
                        setPeriodoPadraoInfo={setPeriodoPadraoInfo}
                        setTipoDistribuicaoSelected={setTipoDistribuicaoSelected}
                        setMultiplicadorInfo={setMultiplicadorInfo}                        
                    />
                </Tab>
                <Tab eventKey="aba2" title="Análise Produto" >
                    <AbaAnalise
                        {...props}
                        setColecoesSelected={setColecoesSelected}
                        setColecoesPermSelected={setColecoesPermSelected}
                        setLinhasProdutoSelected={setLinhasProdutoSelected}
                        setArtigosProdutoSelected={setArtigosProdutoSelected}
                        setArtigosCotasSelected={setArtigosCotasSelected}
                        setPublicoAlvoSelected={setPublicoAlvoSelected}
                        setProdutosSelected={setProdutosSelected}
                        setCoresSelected={setCoresSelected}
                        setOrigProdutoSelected={setOrigProdutoSelected}
                        setEmbarquesSelected={setEmbarquesSelected}
                    />
                </Tab>
                <Tab eventKey="aba3" title="Planejamento">
                    <AbaPlanejamento
                        {...props}
                        setPerDemInico1Info={setPerDemInico1Info}
                        setPerDemInico2Info={setPerDemInico2Info}
                        setPerDemInico3Info={setPerDemInico3Info}
                        setPerDemInico4Info={setPerDemInico4Info}
                        setPerDemInico5Info={setPerDemInico5Info}
                        setPerDemInico6Info={setPerDemInico6Info}
                        setPerDemInico7Info={setPerDemInico7Info}
                        setPerDemInico8Info={setPerDemInico8Info}
                        setPerDemFim1Info={setPerDemFim1Info}
                        setPerDemFim2Info={setPerDemFim2Info}
                        setPerDemFim3Info={setPerDemFim3Info}
                        setPerDemFim4Info={setPerDemFim4Info}
                        setPerDemFim5Info={setPerDemFim5Info}
                        setPerDemFim6Info={setPerDemFim6Info}
                        setPerDemFim7Info={setPerDemFim7Info}
                        setPerDemFim8Info={setPerDemFim8Info}
                        setPerProcInico1Info={setPerProcInico1Info}
                        setPerProcInico2Info={setPerProcInico2Info}
                        setPerProcInico3Info={setPerProcInico3Info}
                        setPerProcInico4Info={setPerProcInico4Info}
                        setPerProcInico5Info={setPerProcInico5Info}
                        setPerProcInico6Info={setPerProcInico6Info}
                        setPerProcInico7Info={setPerProcInico7Info}
                        setPerProcInico8Info={setPerProcInico8Info}
                        setPerProcFim1Info={setPerProcFim1Info}
                        setPerProcFim2Info={setPerProcFim2Info}
                        setPerProcFim3Info={setPerProcFim3Info}
                        setPerProcFim4Info={setPerProcFim4Info}
                        setPerProcFim5Info={setPerProcFim5Info}
                        setPerProcFim6Info={setPerProcFim6Info}
                        setPerProcFim7Info={setPerProcFim7Info}
                        setPerProcFim8Info={setPerProcFim8Info}
                        setConsideraDepositoSelected={setConsideraDepositoSelected}
                        setMostraProdSemDepoSelected={setMostraProdSemDepoSelected}
                        setMostraProdSemProcSelected={setMostraProdSemProcSelected}
                        setConsideraPedBloquSelected={setConsideraPedBloquSelected}
                        setMostraProdSemPediSelected={setMostraProdSemPediSelected}
                        setDepositosSelected={setDepositosSelected}
                        setNrInternoPedidoInfo={setNrInternoPedidoInfo}
                        setPedidosSelected={setPedidosSelected}                        
                    />
                </Tab>
            </Tabs >
        </div >
    );
}

GerarPlanoMestre.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    setLoading: PropTypes.func
};

GerarPlanoMestre.defaultProps = {
    setLoading: () => { }
};

const FormModal = (props) => {

    const [loading, setLoading] = useState(false);

    return (
        <Modal dialogClassName="modal-full" show={props.show} onHide={props.onClose} animation={true}>
            <Modal.Header>
                <Modal.Title>{'Gerar Plano Mestre de Produção'}</Modal.Title>
                <div>
                    <Button
                        variant="primary"
                        type="submit"
                        form="plano-mestre-form-gerar"
                        disabled={loading}
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
                            Gerar Plano
                    </Button>
                    <Button
                        variant="danger"
                        onClick={props.onClose}
                        style={{ marginLeft: '10px' }}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>
                </div>
            </Modal.Header>
            <Modal.Body>
                <GerarPlanoMestre
                    {...props}
                    setLoading={setLoading}
                />
            </Modal.Body>
        </Modal>
    );
};

FormModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default FormModal;