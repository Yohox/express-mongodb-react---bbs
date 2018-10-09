var React = require('react');
var Reply = React.createClass({




    render: function () {


   // console.log(this.props.threadid);

        return (
            <div className="am-g">


                <div> <textarea  rows="5" id="contenta"   style={{width:"100%"}} ></textarea></div>
                <div style={{marginTop:"10px",float:"right"}}><button type="button" className="am-btn am-btn-primary" onClick={this.props.HandleOnClick}>发表</button></div>




            </div>





        );
    }
});

module.exports = Reply;