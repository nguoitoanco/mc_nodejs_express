import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Users from './components/users';
import * as serviceWorker from './serviceWorker';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
render(
    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/users" component={Users}/>
        </Switch>
    </Router>,
    document.getElementById('root')
);
serviceWorker.unregister();
