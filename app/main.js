import React, { Component} from 'react';
import { render, findDOMNode } from 'react-dom';
import { Router, Route, Link, IndexRoute, Redirect,browserHistory } from 'react-router';
import { createHistory, createHashHistory, useBasename } from 'history'
var Index = require('./components/index.js');
//var Login =require('./components/login.js');


import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { homeReducer } from './reducers/reducers';
import App from './components/App';
import Login from './components/login';
import Logout from './components/logout';
import Resigter from './components/Resigter';
import Public from './components/Public';
import Select from './components/selectinf'
import war from './components/war'
import chat from './components/chat'
import personinf from './components/personinf'
import thread from './components/thread'
import Bindst from './components/bindst'
import Timetable from './components/timetable'
import Marktable from './components/marktable'
import Money from './components/Money'
// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(homeReducer);

function checkAuth(nextState, replaceState) {
    let { loggedIn } = store.getState();

    // check if the path isn't dashboard
    // that way we can apply specific logic
    // to display/render the path we want to

    // If the user is already logged in, forward them to the homepage

    if (!loggedIn) {
        browserHistory.push('/login');
        //replaceState(null, '/');
    }
}

render(

    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route  path="/" component={Index}/>
                <Route path="/login" component={Login}/>
                <Route path="/resigter" component={Resigter}/>
                <Route path="/logout" component={Logout}/>
                <Route onEnter={checkAuth}>
                    <Route path="/Selectinf" component={Select}/>
                    <Route path="/public" component={Public}/>
                    <Route path="/war" component={war}/>
                    <Route path="/chat" component={chat}/>
                    <Route path="/personinf" component={personinf}/>
                    <Route path="/inf/:id" component={thread}/>
                    <Route path="/bindst" component={Bindst} />
                    <Route path="/timetable" component={Timetable} />
                    <Route path="/marktable" component={Marktable} />
                    <Route path="/money" component={Money} />


                </Route>
            </Route>
        </Router>
    </Provider>

    , document.getElementById('content'));

//ReactDOM.render(<AppComponent title="深职帮帮网" />, document.getElementById('nav'));
