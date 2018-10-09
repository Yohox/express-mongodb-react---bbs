import React, { Component} from 'react';
var $ = require('jquery');
var AMUIReact = require('amazeui-react');
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import inf from '../utils/inf';
import { Public } from '../actions/AppActions';
export class cChat extends Component {
    /* getInitialState() {
     return { errortext: ""};
     }*/
    constructor(props, context) {
        super(props, context);
        this.state={errortext:'',date:this.getNowFormatDate()};

    }
    getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    }

    handleLogin(event){

        var showerror=function()
        {
            this.setState(function(state) {
                return {errortext: "1"};
            });
        }.bind(this);
        var title=$("#title").val();
        var contenta=$("#contenta").val();
        var data=new Object();
        if(title == '' || contenta == '')
        {
            showerror();
            return;
        }
        this.props.dispatch(Public(title, contenta,2,data));


    }
    render() {

        return (
            <div style={{margin: '30px'}}><div className="am-g" >
                <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
                    <h3>约战</h3>
                    <hr/>
                    <div className="am-form">

                        <label htmlFor="title">标题:</label>
                        <input type="text" name="title" id="title" />
                        <br/>
                        <label htmlFor="content">内容:</label>
                        <textarea   name="contenta" id="contenta" rows="15" />
                        <br/>

                        <div id="errortips" className="am-alert am-alert-danger" data-am-alert style={{display:this.state.errortext == '' ? 'none' : 'block'}}>
                            <p>发表错误！</p>
                        </div>



                        <br />
                        <div className="am-cf">
                            <input type="submit" name="public" value="发 表" className="am-btn am-btn-primary am-btn-sm am-fl" onClick={this.handleLogin.bind(this)}/>
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
export default connect(select)(cChat);