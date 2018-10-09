import React, { Component} from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
var AMUIReact = require('amazeui-react');
var Tabs = AMUIReact.Tabs;
import style from "./Css/TimeTable.css";
import auth from "../utils/auth"
export class Timetable extends Component {

    getdata()
    {
        auth.GetTimeTable(function(err,data){
            console.log(data);
            if(data == "0")//SIC网络不通
            {
                this.setState({error:true,errormessage:'SIC网络不通'});
            }else if(data == "1"){
                this.setState({error:true,errormessage:'未绑定学号'});
            }else{

                var arr=JSON.parse(data);
                console.log(arr);
                //console.log(arr);
                var row=this.state.row;
                row=new Array();

                arr.map(function(t){

                    row.push(t);
                });


                this.setState({row:row});
            }
        }.bind(this));
    }
    constructor(props, context) {
        super(props, context);
        this.state={error:'',errormessage:'',row:[]};

    }
    componentWillMount()
{
    this.getdata();
}

    render() {

        return (
            <div className="am-g">
                <div className="am-container" >
                    <br/>
                    <div className="am-alert am-alert-danger" data-am-alert style={{display:this.state.error == true ?  'block' :'none'}}>
                        <p>{this.state.errormessage}</p>
                    </div>

                    <div data-am-widget="tabs" >
                <Tabs animation={'slide'} className="am-tabs-default" >

                    {

                        this.state.row.map(function(t,e){
                            var weekstr;
                                switch (e){
                                    case 0:weekstr='星期一';break;
                                    case 1:weekstr='星期二';break;
                                    case 2:weekstr='星期三';break;
                                    case 3:weekstr='星期四';break;
                                    case 4:weekstr='星期五';break;
                                    case 5:weekstr='星期六';break;
                                    case 6:weekstr='星期日';break;
                                }

                                if(t == null)
                                {
                                    return(<Tabs.Item eventKey={e}  key={e} title={weekstr}> </Tabs.Item>);
                                }
                            return(<Tabs.Item eventKey={e}  key={e} title={weekstr}>
                                {
                                        t.map(function(tt,te){
                                            return(<div className="callout callout-primary" key={te}>
                                                <h1 style={{color:'#337ab7'}}>{tt.name} {tt.place}</h1>
                                                <p><span className="am-icon-clock-o"></span> {tt.weekstr}  第{tt.c}节</p>
                                            </div>);
                                        })
                                }
                            </Tabs.Item>);
                        })
                    }

                </Tabs>
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
export default connect(select)(Timetable);