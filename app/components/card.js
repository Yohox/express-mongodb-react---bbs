import React, { Component} from 'react';
import { browserHistory } from 'react-router';
import { setthreadid } from '../actions/AppActions';
import { connect } from 'react-redux';
export class Card extends Component {
    HandleOnCilck(id)
    {

        this.props.dispatch(setthreadid(id));
        browserHistory.push('/inf/'+id);
    }
    render() {
        return (
            <div className="am-g">
                <div className="am-u-sm-1" ><img src={"/user/getuserpic?username="+this.props.author} style={{width:"50px",height:"50px",paddingLeft:"-10px"}}/></div>
                <div className="am-u-sm-8">

                    <div style={{paddingBottom:'2px'}}>
                        <span style={{color:'#999'}}>最新内容,来自:{this.props.fq}</span>
                    </div>
                    <div style={{paddingBottom:'2px'}}>
	<span>
	<a onClick={this.HandleOnCilck.bind(this,this.props.id)} href="#">{this.props.title}</a>

	</span>
                    </div>
                    <div>
                        <span>{this.props.content}</span>
                    </div>
                </div>
                <div className="am-u-sm-2"><div style={{color:'#999'}}><i className="am-icon-qq am-icon-fw"></i>{this.props.author}</div><br/><div style={{color:'#999'}}><i className="am-icon-comment am-icon-fw"></i>{this.props.reply}</div></div>

                <div className="am-u-sm-1" style={{color:'#999'}}>
                    <br/>
                    <br/>
                    <div>{this.props.date}</div>
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
export default connect(select)(Card);