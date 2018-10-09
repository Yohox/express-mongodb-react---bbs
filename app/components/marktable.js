import React, { Component} from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import style from "./Css/TimeTable.css";
import auth from "../utils/auth"
var $ = require('jquery');
export class Marktable extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={row:new Array(),error:'',errormessage:''};

    }
    getdata()
    {

        var year=$("#year").val();
        //console.log(year);

        auth.GetMarkTable(year,function(err,data){

            if(data == "0")//学校网络不通
            {
                this.setState({error:true,errormessage:'学校网络不通'});
            }else if(data == "1"){
                this.setState({error:true,errormessage:'未绑定学号'});
            }else{

                var arr=JSON.parse(data);
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
                    <div><span  >学年：</span><select id="year" onChange={this.getdata.bind(this)}>
                        <option value ="2016">2016-2017</option>
                        <option value ="2015">2015-2016</option>
                        <option value="2014">2014-2015</option>
                        <option value="2013">2013-2014</option>
                    </select></div>
                    <br/>
                    <table className="am-table am-table-striped am-table-hover">
                        <thead>
                        <tr>
                            <th>学期</th>
                            <th>课程名</th>
                            <th>考试成绩</th>
                            <th>绩点</th>
                            <th>获得学分</th>
                            <th>学时</th>
                            <th>课程学分</th>

                        </tr>
                        </thead>
                        <tbody>
                        {

                            this.state.row.map(function(t,e){

                                return(<tr key={e}>
                                    <td>{t.team}</td>
                                    <td>{t.name}</td>
                                    <td>{t.mark}</td>
                                    <td>{t.gradepoint}</td>
                                    <td>{t.getpoint}</td>
                                    <td>{t.studytime}</td>
                                    <td>{t.studymark}</td>
                                </tr>);
                            })
                        }

                        </tbody>
                    </table>
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
export default connect(select)(Marktable);