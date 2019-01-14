import React from 'react';
import './index.css';
import Users from './components/users';
import * as serviceWorker from './serviceWorker';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

render(
    <Router>
        <Switch>
            <Route exact path="/" component={Users}/>
            <Route exact path="/users" component={Users}/>
        </Switch>
    </Router>,
    document.getElementById('root')
);
serviceWorker.register();
