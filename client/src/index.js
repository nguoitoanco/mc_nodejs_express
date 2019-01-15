import React from 'react';
import './index.css';
import Users from './components/user/users';
import Login from './components/admin/login';
import * as serviceWorker from './serviceWorker';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

render(
    <Router>
        <Switch>
            <Route exact path="/" component={Users}/>
            <Route exact path="/users" component={Users}/>
            <Route exact path="/login" component={Login}/>
        </Switch>
    </Router>,
    document.getElementById('root')
);
serviceWorker.register();
