import React from 'react'

import { Router, Switch, Route } from 'react-router'
import CadastroUsuario from '../../forms/cadastro-usuario/CadastroUsuario';
import PrevisaoVendas from '../../forms/previsao-vendas/PrevisaoVendas';
import CapacidadeProducao from '../../forms/capacidade-producao/CapacidadeProducao';
import SugestaoCancelamento from '../../forms/sugestao-cancelamento/SugestaoCancelamento';
import PlanoMestre from '../../forms/plano-mestre/PlanoMestre';
import Home from '../../forms/home';
import Login from '../../forms/login/login';
import {history} from './history'
import PrivateRoute from './PrivateRoute';
import RedefinirSenha from '../../forms/redefinir-senha/RedefinirSenha';


const Routes = () => (
    
    <Router history={history}>
        <Switch>
            <Route component={Login} exact path="/login"/>
            <Route component={RedefinirSenha} exact path="/redefinir"/>
            <PrivateRoute component={Home} exact path="/"/>
            <PrivateRoute component={PrevisaoVendas} exact path="/previsao-vendas"/>
            <PrivateRoute component={CapacidadeProducao} exact path="/capacidade-producao"/>
            <PrivateRoute component={SugestaoCancelamento} exact path="/sugestao-cancelamento"/>
            <PrivateRoute component={PlanoMestre} exact path="/plano-mestre"/>
            <PrivateRoute component={CadastroUsuario} exact path="/cadastro-usuario"/>
        </Switch>
    </Router>
)

export default Routes
