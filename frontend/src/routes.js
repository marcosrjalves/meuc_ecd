import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import Register from './pages/Register';
import Complete from './pages/Complete';
import Teste from './pages/test';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/euvou" component={Register} />
                <Route path="/confirmado" component={Complete} />
                <Route path="/teste" component={Teste} />
            </Switch>
        </BrowserRouter>
    )
}