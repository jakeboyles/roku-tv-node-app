import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import consts from './constants';
import './App.css';

class Channel extends Component {

  constructor(props){
    super();
    this.click = this.click.bind(this);
  }

  click(){
    axios.get(`http://localhost:${consts.serverPort}/app-${this.props.channelname}`)
    .then(function (response) {
      console.log(response);
    });
  }

  render() {
    return (
      <div className="App">
        <button id={this.props.channelname} className="button" onClick={this.click}>{this.props.channelname}</button>
      </div>
    );
  }
}

export default Channel;
