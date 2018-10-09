import React, { Component} from 'react';
var $ = require('jquery');
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import auth from '../utils/auth';
var AMUIReact = require('amazeui-react');
var ButtonToolbar = AMUIReact.ButtonToolbar;
var Button = AMUIReact.Button;
var Panel = AMUIReact.Panel;
export class Select extends Component {
    /* getInitialState() {
     return { errortext: ""};
     }*/
    constructor(props, context) {
        super(props, context);


    }
    handlePublic(event){
        browserHistory.push('/public');
    //console.log(event);
    }
    handleWar(event){
        browserHistory.push('/war');
        //console.log(event);
    }
    handlechat(event){
        browserHistory.push('/chat');
        //console.log(event);
    }

    render() {

        return (
            <div style={{margin: '30px'}}><div className="am-g am-g-fixed" >

                <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
                    <div>
                        <br/>
                        <br/>

                        <Panel header="求帮忙" amStyle="primary">
                            <div>

                                <div style={{textAlign:'center'}}><p>遇到问题了？来这发帖深职学子帮你忙！</p></div>

                                <Button id="public" amStyle="primary" block onClick={this.handlePublic.bind(this)}>发布帮助</Button>
                            </div>
                        </Panel>
                        <br/>
                        <br/>
                        <Panel header="求约战" amStyle="success">
                            <div style={{textAlign:'center'}}>
                                <p>约LOL？约篮球？来！战个痛快</p>

                                <Button id="war" amStyle="success" block onClick={this.handleWar.bind(this)}>下战书</Button>
                            </div>
                        </Panel>
                        <br/>
                        <br/>
                        <Panel header="交流厅" amStyle="danger">
                            <div style={{textAlign:'center'}}>
                                <p>八卦?无聊?这里就是你的天堂！</p>

                                <Button id="chat" amStyle="danger" block onClick={this.handlechat.bind(this)}>发布消息</Button>
                            </div>
                        </Panel>

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
export default connect(select)(Select);