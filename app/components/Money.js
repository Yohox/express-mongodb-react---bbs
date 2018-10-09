import React, { Component} from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import style from "./Css/TimeTable.css";
import auth from "../utils/auth"
export class Money extends Component {

    getdata()
    {
        auth.GetMoney(function(err,data){

            if(data == "0")//SIC网络不通
            {
                this.setState({error:true,errormessage:'SIC网络不通'});
            }else if(data == "1"){
                this.setState({error:true,errormessage:'未绑定学号'});
            }else{

                var arr=JSON.parse(data);
               // console.log(arr);
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
        console.log(this.state.row);

        return (
            <div className="am-g">
                <div className="am-container" >
                    <br/>
                    <div className="am-alert am-alert-danger" data-am-alert style={{display:this.state.error == true ?  'block' :'none'}}>
                        <p>{this.state.errormessage}</p>
                    </div>
                    {
                        this.state.row.map(function(t,e){
                            return(<div className="callout callout-primary" key={e}>
                                <h1 style={{color:'#337ab7'}}>{t.system}通过{t.type} 更改了 {t.je}元 余额 {t.ye}</h1>
                                <p><span class="am-icon-clock-o"></span> {t.consumeDate}</p>
                            </div>);
                        })

                    }
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
export default connect(select)(Money);