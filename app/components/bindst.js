import React, { Component} from 'react';
var $ = require('jquery');
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import auth from '../utils/auth';
export class Bindst extends Component {

    constructor(props, context) {
        super(props, context);
        this.state={ ok:false,
            error:false
        };

    }

    handleLogin(event){


        var stid=$("#stid").val();
        var stpw=$("#stpw").val();
        auth.bindst(stid,stpw,function(err,data){
            if(err)
            {
                //console.log("fuck");
                this.setState({ok:true});
                this.setState({error:false});

            }else{
                this.setState({error:true});
                this.setState({ok:true});
            }
        }.bind(this));




    }
    render() {

        return (
            <div style={{margin: '30px'}}><div className="am-g" >
                <div className="am-alert am-alert-success" data-am-alert style={{display:this.state.ok == true ?  'block' :'none'}}>
                    <p>绑定成功</p>
                </div>
                <div className="am-alert am-alert-danger" data-am-alert style={{display:this.state.error== true ?  'block' :'none'}}>
                    <p>密码错误或网络连接失败</p>
                </div>
                <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
                    <h3>绑定学号</h3>
                    <hr/>
                    <div className="am-form">
                        <label htmlFor="title">绑定学号(绑定了才可以查课表等功能):</label>
                        <input type="text" name="stid" id="stid" />
                        <br/>
                        <label htmlFor="title">学号密码:</label>
                        <input type="text" name="stpw" id="stpw" />
                        <br/>
                    </div>
                    <div className="am-cf">
                        <input type="submit" name="bind" value="绑 定" className="am-btn am-btn-primary am-btn-sm am-fl" onClick={this.handleLogin.bind(this)}/>
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
export default connect(select)(Bindst);