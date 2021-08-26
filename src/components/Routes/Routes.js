import React from 'react'

import { Router, Switch, Route } from 'react-router'
import CadastroUsuario from '../../forms/administrativo/cadastro-usuario/CadastroUsuario';
import PrevisaoVendas from '../../forms/comercial/previsao-vendas/PrevisaoVendas';
import CapacidadeProducao from  '../../forms/confeccao/capacidade-producao/CapacidadeProducao';
import InspecaoQualidade from '../../forms/confeccao/inspecao-qualidade/InspecaoQualidade';
import SugestaoCancelamento from '../../forms/comercial/sugestao-cancelamento/SugestaoCancelamento';
import PlanoMestre from '../../forms/confeccao/plano-mestre/PlanoMestre';
import Home from '../../forms/home';
import Login from '../login/login';
import RedefinirSenha from '../login/RedefinirSenha'
import {history} from './history'
import PrivateRoute from './PrivateRoute';
import CadastroHelp from  '../../forms/administrativo/cadastro-help/CadastroHelp';
import CapacidadeCotasVendas from '../../forms/comercial/capacidade-cotas-vendas/CapacidadeCotasVendas';
import BiPrograma from '../../forms/bi/programa/Programa';
import BiUsuario from '../../forms/bi/usuario/Usuario';


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
            <PrivateRoute component={InspecaoQualidade} exact path="/inspecao-qualidade"/>
            <PrivateRoute component={CadastroUsuario} exact path="/cadastro-usuario"/>
            <PrivateRoute component={CadastroHelp} exact path="/cadastro-help"/>
            <PrivateRoute component={CapacidadeCotasVendas} exact path="/cotas-vendas"/>
            <PrivateRoute component={BiPrograma} exact path="/bi-programas"/>
            <PrivateRoute component={BiUsuario} exact path="/bi-usuarios"/>
        </Switch>
    </Router>
)

export default Routes
