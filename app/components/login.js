import React, { Component} from 'react';
var $ = require('jquery');
var AMUIReact = require('amazeui-react');
import { browserHistory } from 'react-router';
import { login } from '../actions/AppActions';
import { connect } from 'react-redux';
import auth from '../utils/auth';
export class Login extends Component {
   /* getInitialState() {
        return { errortext: ""};
    }*/
    constructor(props, context) {
        super(props, context);
        this.state={errortext:''};

    }

    handleLogin(event){

        var showerror=function()
        {
            this.setState(function(state) {
                return {errortext: "1"};
            });
        }.bind(this);
        var username=$("#username").val();
        var password=$("#password").val();
        var mode=$("input[name='mode']:checked").val();;

        if(username == '' || password == '')
        {
            showerror();
            return;
        }
        this.props.dispatch(login(username, password,mode));
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
                    <h3>登录</h3>
                    <hr/>
                    <div className="am-form">
                        <label htmlFor="username">账号:</label>
                        <input type="text" name="username" id="username" />
                        <br/>
                        <label htmlFor="password">密码:</label>
                        <input type="password" name="password" id="password" />
                        <br/>
                        <label htmlFor="mode">登录方式:</label>
                        <label><input name="mode" id="mode" type="radio" value="0" />普通登录</label>

                        <br/>
                        <div id="errortips" className="am-alert am-alert-danger" data-am-alert style={{display:this.state.errortext == '' ? 'none' : 'block'}}>
                            <p>账号或密码错误！</p>
                        </div>

                        <br/>
                        <label htmlFor="remember-me">
                            <input id="remember-me" type="checkbox"/>记住密码
                        </label>
                        <br />
                        <div className="am-cf">
                            <input type="submit" name="login" value="登 录" className="am-btn am-btn-primary am-btn-sm am-fl" onClick={this.handleLogin.bind(this)}/>
                            <input type="submit" name="forget" value="忘记密码 ^_^? " className="am-btn am-btn-default am-btn-sm am-fr"/>
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
export default connect(select)(Login);