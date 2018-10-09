import React, { Component} from 'react';
var $ = require('jquery');
var AMUIReact = require('amazeui-react');
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import DropzoneComponent from 'react-dropzone-component';
import ReactDOMServer from 'react-dom/server'
import { changeinf } from '../actions/AppActions';
export class cPersoninf extends Component {

    constructor(props, context) {
        super(props, context);

        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif",
            previewTemplate: ReactDOMServer.renderToStaticMarkup(
                <div className="dz-preview dz-file-preview">
                    <div className="dz-details">

                        <img data-dz-thumbnail="true" />
                    </div>

                </div>
            )
        };

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: '/user/uploadpic'
        };

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
        this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = () => console.log('Hello!');

        this.success=file => $("#piclj").val(file.xhr.responseText);

        this.removedfile = file => console.log('removing...', file);

        this.dropzone = null;


    }


    handleLogin(event){


        var password=$("#password").val();
        var piclj=$("#piclj").val();
        //console.log(password,piclj);
        this.props.dispatch(changeinf(piclj,password));


    }
    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;
        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            drop: this.callbackArray,
            addedfile: this.callback,
            success: this.success,
            removedfile: this.removedfile
        }
        return (
            <div style={{margin: '30px'}}><div className="am-g" >
                <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
                    <h3>个人信息</h3>
                    <hr/>

                    <div className="am-form">

                        <br/>
                        <div className="am-g" >
                            <div className="am-u-sm-4">
                                <div style={{paddingLeft:'50px'}}>
<img src="./user/getpic" style={{width: '100px',height:'100px'}} />
                                    </div>
                                </div>
                            <div className="am-u-sm-8">

                                <div>
                                    <DropzoneComponent config={config}
                                                       eventHandlers={eventHandlers}
                                                       djsConfig={djsConfig} />
                                    <input type="hidden" name="piclj" id="piclj" />
                                </div>
                                </div>
                        </div>
                        <br/>
                        <label htmlFor="title">密码(不输入则不更改):</label>
                        <input type="password" name="password" id="password" />
                        <br/>







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
export default connect(select)(cPersoninf);