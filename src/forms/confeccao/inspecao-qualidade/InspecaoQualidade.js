import React, { useEffect, useState } from "react";
import { Tabs, Tab } from 'react-bootstrap';
import { format } from 'date-fns';
import api from '../../../services/api';
import AbaDadosGerais from "./AbaDadosGerais";
import AbaInspecaoPecasPaineis from "./AbaInspecaoPecasPaineis";

const loadEstagios = () => api.get('ordens-producao/estagios-producao');
const loadMotivos = () => api.get('inspecao-qualidade/motivos');

const normalizeEstagios = (dados) => {
    return dados.map((c) => {
        return {
            value: c.estagio,
            label: `${c.estagio} - ${c.descricao}`
        };
    });
};

const normalizeMotivos = (dados) => {
    return dados.map((c) => {
        return {
            value: c.codMotivo,
            label: `${c.codMotivo} - ${c.descMotivo}`
        };
    });
};

const normalizeEstagiosMotivos = (dados) => {
    return dados.map((c) => {
        return {
            value: c.codMotivo,
            label: `${c.codEstagio} - ${c.descEstagio}`
        };
    });
};

const formStyle = { marginLeft: '20px', marginTop: '20px', marginRight: '20px' };

const InspecaoQualidade = (props) => {

    const [data, setData] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [turno, setTurno] = useState(1);
    const [estagio, setEstagio] = useState(0);    
    const [estagios, setEstagios] = useState([]);    
    const [motivos, setMotivos] = useState([]);
    const [estagiosMotivos, setEstagiosMotivos] = useState([]);
    const nomeUsuario = localStorage.getItem('usuario-logado');
    const [periodo, setPeriodo] = useState(0);
    const [ordemProducao, setOrdemProducao] = useState(0);
    const [qtdeOrdemProducao, setQtdeOrdemProducao] = useState(0);
    const [ordemConfeccao, setOrdemConfeccao] = useState(0);
    const [qtdeOrdemConfeccao, setQtdeOrdemConfeccao] = useState(0);
    const [referencia, setReferencia] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [cor, setCor] = useState('');

    const load = () => {

        Promise.all([
            loadEstagios(),
            loadMotivos()
        ])
            .then(([
                responseEstagios,
                responseMotivos
            ]) => {
                setEstagios(normalizeEstagios(responseEstagios.data));
                setMotivos(normalizeMotivos(responseMotivos.data));
                setEstagiosMotivos(normalizeEstagiosMotivos(responseMotivos.data));
            })
            .catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
            });
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div style={formStyle}>     

            <h2><b>Inspeção de Qualidade</b></h2>
            <br></br>

            <Tabs defaultActiveKey="aba1" transition={false} id="abas-inspecao-qualidade">
                <Tab eventKey="aba1" title="Dados Gerais" >
                    <AbaDadosGerais
                    {...props}
                    nomeUsuario={nomeUsuario}
                    data={data}  
                    turno={turno}  
                    estagios={estagios}                
                    periodo={periodo}
                    ordemProducao={ordemProducao}
                    qtdeOrdemProducao={qtdeOrdemProducao}
                    ordemConfeccao={ordemConfeccao}
                    qtdeOrdemConfeccao={qtdeOrdemConfeccao}
                    referencia={referencia}
                    tamanho={tamanho}
                    cor={cor}
                    setData={setData}
                    setTurno={setTurno}
                    setEstagio={setEstagio}
                    setPeriodo={setPeriodo}
                    setOrdemProducao={setOrdemProducao} 
                    setQtdeOrdemProducao={setQtdeOrdemProducao}
                    setOrdemConfeccao={setOrdemConfeccao}
                    setQtdeOrdemConfeccao={setQtdeOrdemConfeccao}
                    setReferencia={setReferencia}
                    setTamanho={setTamanho}
                    setCor={setCor}
                    />
                </Tab>
                <Tab eventKey="aba2" title="Inspeção de Peças / Páines" >
                    <AbaInspecaoPecasPaineis
                    {...props}
                    motivos={motivos}
                    estagiosMotivos={estagiosMotivos}
                    nomeUsuario={nomeUsuario}
                    data={data}  
                    turno={turno}  
                    estagio={estagio}                
                    periodo={periodo}
                    ordemProducao={ordemProducao}
                    qtdeOrdemProducao={qtdeOrdemProducao}
                    ordemConfeccao={ordemConfeccao}
                    qtdeOrdemConfeccao={qtdeOrdemConfeccao}
                    referencia={referencia}
                    tamanho={tamanho}
                    cor={cor}
                    />
                </Tab>
                <Tab eventKey="aba3" title="Inspeção de Medidas">
                </Tab>
            </Tabs >
        </div >
    );

};

export default InspecaoQualidade;