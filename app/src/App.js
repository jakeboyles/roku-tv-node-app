import React, { Component } from 'react';
import logo from './logo.svg';
import Volume from './Volume';
import Button from './Button';
import Channel from './Channel';
import './App.css';
import io from 'socket.io-client';
import consts from './constants';


class App extends Component {

  constructor(){
  	super();
  	this.state = {
  		connected:'hide'
  	}
  }

  componentDidMount() {
  	const socket = io.connect(`http://localhost:${consts.socketPort}`);
      socket.on('connected', ()=>{
      	alert("Your TV is connected");
      	this.setState({
      		connected:'show'
      	});
      });
      socket.emit('new', true);
  }

  render() {
    return (
	<div className="App">
		<div className= {this.state.connected}>
		  	<div className="volumes">
		  		<h3>Volume</h3>
		    	<Volume type="up" />
		    	<Volume type="down" />
		    </div>

		    <div className="controls">
		    	<div className="inner">
		    		<h3>Controls</h3>
			    	<Button type="up" />
			    	<Button type="left" />
			    	<Button type="home" />
			    	<Button type="right" />
			    	<Button type="down" />
			    	<Button type="select" />
		    	</div>
		    </div>

		    <div className="apps">
		    	<h3>Apps</h3>
		    	<Channel channelname="netflix" id="12" />
		    </div>
		</div>
	</div>
    );
  }
}

export default App;
