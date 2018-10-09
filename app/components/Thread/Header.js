var React = require('react');
var Header = React.createClass({
    render: function () {




        return (
            <div>

                <div className="am-g" style={{marginLeft:"20px"}}>
                    <h1>{this.props.title}</h1>
                    <div style={{color:"#999"}}>
                        <p>共:{this.props.replynum}个回复</p>
                        <p>发帖时间:{this.props.pdate}</p>
                    </div>
                </div>
            </div>





        );
    }
});

module.exports = Header;