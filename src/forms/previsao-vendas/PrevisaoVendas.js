import React, { useEffect, useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import api from '../../services/api';
import PrevisaoVendasTable from './PrevisaoVendasTable';

const formStyle = { marginLeft: '20px', marginTop: '20px', marginRight: '20px' };

const loadPrevisoes = () => api.get('previsao-vendas');

const PrevisaoVendas = (props) => {

    const [previsoes, setPrevisoes] = useState([]);
    const [previsaoSelecionada, setPrevisaoSelecionada] = useState(0);

    const {currPage} = useState(0);

    const options = {
        sizePerPageList: [10, 20, 40, 100],
        sizePerPage: 10,
        page: currPage,        
        onRowClick: function (row) {
            setPrevisaoSelecionada(row.id);
        },
        onPageChange: function () {            
            setPrevisaoSelecionada(0);
        }
    };

    const load = () => {

        Promise.all([
            loadPrevisoes()
        ])
            .then(([
                responsePrevisoes
            ]) => {
                setPrevisoes(responsePrevisoes.data);
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

            <h2><b>Previsão de Vendas</b></h2>
            <br></br>

            <Button variant="success">
                + Novo
            </Button>

            <Button>
                Editar
            </Button>

            <Button variant="danger">
                - Excluir
            </Button>

            <PrevisaoVendasTable
                {...props}
                options={options}
                previsoes={previsoes}
            />

        </div>
    );

}

export default PrevisaoVendas;