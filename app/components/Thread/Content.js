var React = require('react');
var Content = React.createClass({
    render: function () {




        return (
            <div className="am-g">
                <div className="am-u-sm-2" >
                    <div style={{textAlign:"center"}}>
                        <div><img src={this.props.pic} style={{width:"100px",height:"100px"}}/></div>
                        <div style={{marginTop:"20px"}}><span>{this.props.author}</span></div>
                    </div>
                </div>
                <div className="am-u-sm-10">
                    {this.props.content}
                </div>

            </div>





        );
    }
});

module.exports = Content;