import React, { Component} from 'react';
import { browserHistory } from 'react-router';
import { logout } from '../actions/AppActions';
import { connect } from 'react-redux';
import auth from '../utils/auth';
var AMUIReact = require('amazeui-react');
var Progress = AMUIReact.Progress;
export class Logout extends Component {
    /* getInitialState() {
     return { errortext: ""};
     }*/
    constructor(props, context) {
        super(props, context);
    }
    componentWillMount(){
        this.props.dispatch(logout());
    }

    render() {

        //const dispatch = this.props.dispatch;
        var islogin=this.props.loggedIn;

        if(islogin != true)
        {

            browserHistory.push('/');
        }
        return (
        <div style={{margin: '30px'}}><div className="am-g" >
            <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
                <h3>退出</h3>
                <hr/>
                <div className="am-form">

                        <Progress now={100} striped amStyle="secondary" />
                    <br/>
                    <div className="am-g" >
                        <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered"><p style={{textAlign:'center'}}>正在退出！</p></div>
                    </div>

                </div>
            </div>
        </div>
        </div>

        );
    }


}


//module.exports = Login;
// Which props do we want to inject, given the global state?
function select(state) {
    return {
        data: state
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Logout);