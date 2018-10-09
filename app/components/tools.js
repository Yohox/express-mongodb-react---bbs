import React, { Component} from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
export class Tools extends Component {
    ClickOnTimeTable()
    {

        browserHistory.push('/timetable');
    }
    ClickOnMarkTable(){
        browserHistory.push('/marktable');
    }
    ClickOnMoney(){
        browserHistory.push('/money');
    }
    render() {
        return (

               <div style={{marginTop:"50px"}}>

                <p ><input type="text" id="findstr" className="am-form-field am-round" placeholder="搜索点什么"/></p>
                   <div style={{textAlign:"center"}}>
                <button type="button" className="am-btn am-btn-default" onClick={this.props.HandleOnClick}>搜索</button>
                   </div>
                   <div style={{marginTop:"40px",textAlign:"center"}}>
                       <div style={{marginTop:"20px"}}>
                       <button type="button" onClick={this.ClickOnTimeTable.bind(null,this)} className="am-btn am-btn-primary am-round">查课表</button>
                       </div>
                       <div style={{marginTop:"20px"}}>
                       <button type="button" onClick={this.ClickOnMarkTable.bind(null,this)} className="am-btn am-btn-primary am-round am-btn-success">查成绩</button>
                           </div>
                       <div style={{marginTop:"20px"}}>
                       <button type="button" onClick={this.ClickOnMoney.bind(null,this)} className="am-btn am-btn-primary am-round am-btn-danger">查饭卡</button>
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
export default connect(select)(Tools);