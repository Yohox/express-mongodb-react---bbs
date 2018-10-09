var React = require('react');
var AMUIReact = require('amazeui-react');
var Header = AMUIReact.Header;
var Menu = AMUIReact.Menu;
import { browserHistory } from 'react-router';
var $ = require('jquery');

var Nav = React.createClass({
  render: function () {
	  var props = {
  title: '深职帮帮网',
  link: '',
  data: {
    left: [
      {
        link: '',
        icon: 'home'
      }
    ]
  },
  onSelect: function(nav, e) {
    e.preventDefault();
    console.log('你点击了', nav);
	  browserHistory.push(nav.link);
	  // do something
	 this.handleToggle(); // 关闭整个下拉菜单
    // do something
  }
};



      var nlm=[{link:'login',title:'登录'}, {link:'resigter',title:'注册'}];
      var ylm=[{link:'Selectinf',title:'发表'},{link:'personinf',title:'个人信息'},{link:'bindst',title:'绑定学号'},{link:'logout',title:'退出'}];


//var menu=this.props.loggedIn == true ? ylm:nlm;
var handleClick = function(nav, index, e) {
  if (nav && nav.subMenu) {
    // 有二级菜单的链接点击了
  } else {
    e.preventDefault();

    console.log('点击的链接为：', nav);
	  browserHistory.push(nav.link);
    // do something
     this.handleToggle(); // 关闭整个下拉菜单
  }
};

    return (
	<div>


        <Header {...props} />
        <div style={{display:this.props.loggedIn == true ? 'none' : 'block'}}>
        <Menu
            toggleIcon="list"
            data={nlm}
            theme="dropdown1"
            onSelect={handleClick}
        />
        </div>
        <div style={{display:this.props.loggedIn == true ? 'block' : 'none'}}>
        <Menu
            toggleIcon="list"
            data={ylm}
            theme="dropdown1"
            onSelect={handleClick} />
        </div>


    </div>
	);
  }
});

module.exports = Nav;