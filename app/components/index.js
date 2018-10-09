var React = require('react');
import inf from '../utils/inf'
import Card from './card'
import Tools from './tools'


var Index = React.createClass({
    getInitialState: function() {
        return {
            rows: [],
            index:0
        };
    },
    onHandleClick:function()
    {

        inf.Getnew(5,this.state.index,function(ret,data){
            if(ret)
            {
                data=JSON.parse(data);
                var rows=this.state.rows;
                var index=this.state.index;

                for(var p in data)
                {
                    rows.push(data[p]);
                }
                var nowp=parseInt(p)+parseInt(index)+1;
                //console.log(rows);
                this.setState({rows:rows,index:nowp});

            }
        }.bind(this));
    }
    ,
    componentWillMount:function()
    {
        inf.Getnew(10,this.state.index,function(ret,data){
            if(ret)
            {
                data=JSON.parse(data);
                var rows=this.state.rows;
                var index=this.state.index;
                for(var p in data) {
                    rows.push(data[p]);
                }
                var nowp=parseInt(index)+parseInt(p)+1;
                this.setState({rows:rows,index:nowp});

            }
        }.bind(this));
    },
    HandleOnClick:function(){
        var findstr=$("#findstr").val();
        inf.findinfbyname(findstr,function(err,data){
           if(err)
           {
               console.log("fuck you ");
           }else{
               //console.log(data);
               var rows=JSON.parse(data);
               this.setState({rows:rows});
           }
        }.bind(this));
        //alert("sdfd1sf");
    }
    ,
    render: function () {




        return (
            <div className="am-container">
                <div className="am-g">
                    <div className="am-u-sm-9">
                        <br/>
                        {

                            this.state.rows.map(function(n){

      return(
          <div key ={n._id}>
          <Card
                    fq={n.mode}
                    title={n.title}
                    content={n.content}
                    author={n.username}
                    reply={n.newreply}
                    date={n.pdate}
                    replynum={n.replynum}
                    id={n._id}
          />
          <hr />
              </div>
      )

          ;
                                }
                            )
                        }
                        <div style={{textAlign:'center'}}>
                        <button type="button" className="am-btn am-btn-default" onClick={this.onHandleClick.bind(null,this)}>刷新更多</button>
                        </div>
                        </div>
                    <div className="am-u-sm-3" >
                        <div style={{marginLeft:"20px"}}><Tools HandleOnClick={this.HandleOnClick.bind(null,this)}/></div>

                        </div>
            </div>
                </div>
        );
    }
});

module.exports = Index;