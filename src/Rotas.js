import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login  from './components/Login';
import Home from './components/Home';
import ClienteFormulario from './components/ClientesFormulario';
import visualizarCliente from './components/visualizarCliente';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/cliente/" exact component={ClienteFormulario} />
                <Route path="/cliente/:id" exact component={ClienteFormulario} />
                <Route path="/cliente/visualizar/:id" exact component={visualizarCliente} />
                <Route path="/" >
                    <Redirect to="/home" />
                </Route>
                <Route path='*' >
                    <Redirect to="/home" />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;