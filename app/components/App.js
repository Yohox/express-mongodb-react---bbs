/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

// Import stuff
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import Nav from './nav';
import { connect } from 'react-redux';
import auth from '../utils/auth';
import { islogin } from '../actions/AppActions';
import style from "./Transition.css";
export class App extends Component {
    componentWillMount(){

        this.props.dispatch(islogin());

    }

    render() {


        return(
            <div className="wrapper">

                <Nav  loggedIn={this.props.data.loggedIn} history={this.props.history} location={this.props.location} dispatch={this.props.dispatch}/>
                < ReactCSSTransitionGroup
                    transitionName = "example"
                    component = "div"
                    transitionEnterTimeout = { 300 }
                    transitionLeaveTimeout = { 300 } >
                    < div key = { this . props . location . pathname }
                          style = { { position : "absolute" , width : "100%" } } >
                    { this.props.children  }
                        </div>
                </ReactCSSTransitionGroup>

            </div>
        )
    }
}

//export default App;

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
    return {
        data: state
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);