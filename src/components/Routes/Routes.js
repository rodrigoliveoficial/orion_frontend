import React from 'react'

import { Router, Switch, Route } from 'react-router'
import CadastroUsuario from '../../forms/cadastro-usuario/CadastroUsuario';
import PrevisaoVendas from '../../forms/previsao-vendas/PrevisaoVendas';
import CapacidadeProducao from '../../forms/capacidade-producao/CapacidadeProducao';
import SugestaoCancelamento from '../../forms/sugestao-cancelamento/SugestaoCancelamento';
import PlanoMestre from '../../forms/plano-mestre/PlanoMestre';
import Home from '../../forms/home';
import Login from '../login/login';
import RedefinirSenha from '../login/RedefinirSenha'
import {history} from './history'
import PrivateRoute from './PrivateRoute';
import CadastroHelp from '../../forms/cadastro-help/CadastroHelp'
import CapacidadeCotasVendas from '../../forms/capacidade-cotas-vendas/CapacidadeCotasVendas';


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
            <PrivateRoute component={CadastroHelp} exact path="/cadastro-help"/>
            <PrivateRoute component={CapacidadeCotasVendas} exact path="/capacidade-cotas-vendas"/>
        </Switch>
    </Router>
)

export default Routes
