import React, { Component} from 'react';
var $ = require('jquery');
var AMUIReact = require('amazeui-react');
import { browserHistory } from 'react-router';
import { register } from '../actions/AppActions';
import { connect } from 'react-redux';
import auth from '../utils/auth';
export class Resigter extends Component {
    /* getInitialState() {
     return { errortext: ""};
     }*/
    constructor(props, context) {
        super(props, context);
        this.state={errortext:''};

    }
    showerror()
    {
        this.setState(function(state) {
            return {errortext: "1"};
        });
    };
    handleLogin(event){


        var username=$("#username").val();
        var password=$("#password").val();
        var email=$("#email").val();

        if(username == '' || password == '' || email == '')
        {
            this.showerror();
            return;
        }
        this.props.dispatch(register(username, password,email));
        /*   $.post(
         '/user/login',
         {
         username:$("#username").val(),
         password:$("#password").val()
         },
         function(data,status){
         if(data == '0')
         {
         showerror();
         return;
         }else{

         browserHistory.push('/');
         //window.navigate("/");
         }
         }
         );*/

    }

    render() {


        return (
            <div style={{margin: '30px'}}><div className="am-g" >
                <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
                    <h3>注册</h3>
                    <hr/>
                    <div className="am-form">
                        <label htmlFor="username">账号:</label>
                        <input type="text" name="username" id="username" />
                        <br/>
                        <label htmlFor="password">密码:</label>
                        <input type="password" name="password" id="password" />
                        <br/>
                        <label htmlFor="email">邮箱:</label>
                        <input type="email" name="email" id="email" />
                        <div id="errortips" className="am-alert am-alert-danger" data-am-alert style={{display:this.state.errortext == '' ? 'none' : 'block'}}>
                            <p>账号已存在</p>
                        </div>

                        <br/>


                        <div className="am-cf">
                            <input type="submit" name="login" value="注 册" className="am-btn am-btn-primary am-btn-sm am-fl" onClick={this.handleLogin.bind(this)}/>
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
export default connect(select)(Resigter);