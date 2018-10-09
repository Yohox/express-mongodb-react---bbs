import React, { Component} from 'react';
import inf from '../utils/inf'
import Header from './Thread/Header'
import Content from './Thread/Content'
import Reply from './Thread/Reply'
import { connect } from 'react-redux';
var $ = require('jquery');
export class Thread extends Component {

    getInitialState() {

    }
    onHandleClick()
    {


    }
    HandleOnClick(){
    var contenta= $("#contenta").val();

    inf.Postreply(this.data.ThreadId,contenta,function(ret,data){

        if(ret){
            var replynum=this.state.replynum;
            replynum=replynum+1;
            this.setState({replynum:replynum});
            var rows=this.state.rows;
            rows.push(JSON.parse(data));
            this.setState({rows:rows});
            $("#contenta").val('');
            //console.log(this.state.rows);
        }else{
            //console.log("fuck");
        }
    }.bind(this));
}
    constructor(props, context) {
        super(props, context)
        this.data=props.data;
        this.state={ title:'',
            replynum:0,
            pdate:'',
            author:'',
            content:'',
            pic:'',
            rows:[],
        };

    }

    componentWillMount()
    {
        inf.Get(this.data.ThreadId,function(err,data){
            if(err){
                console.log("读取错误");
            }else{
                data=JSON.parse(data);
                this.setState({title:data.title,replynum:data.replynum,pdate:data.pdate,author:data.username,content:data.content,pic:"../"+data.pic});
                inf.Getreply(this.data.ThreadId,function(ret,data){
                    if(ret)
                    {
                        //console.log(data);
                        data=JSON.parse(data);
                        var rows=this.state.rows;
                        for(var p in data) {
                            rows.push(data[p]);
                        }
                        //console.log(rows);
                        this.setState({rows:rows});
                    }
                }.bind(this));
            }
        }.bind(this));

    }
    render() {

        console.log(this.state);
        return (
            <div className="am-container">
                <br/>
                <Header title={this.state.title} replynum={this.state.replynum} pdate={this.state.pdate} />
                <hr/>
                <Content pic={"../user/getuserpic?username="+this.state.author} author={this.state.author} content={this.state.content} />
                <hr/>
                {
                    this.state.rows.map(function(n){
                        //console.log(n);
                        return (
                            <div key={n._id}>
                            <Content pic={"../user/getuserpic?username="+n.username} author={n.username} content={n.content} />
                            <hr/>
                            </div>
                        );
                    })
                }
                <Reply threadid={this.data.ThreadId} HandleOnClick={this.HandleOnClick.bind(this)} />
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
export default connect(select)(Thread);