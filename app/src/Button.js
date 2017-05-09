import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import consts from './constants';
import './App.css';

class Button extends Component {

  constructor(props){
    super();
    this.click = this.click.bind(this);
  }

  click(){
    axios.get(`http://localhost:${consts.serverPort}/button-${this.props.type}`)
    .then(function (response) {
      console.log(response);
    });
  }

  render() {
    return (
      <div className="App">
        <button id={this.props.type} className="button" onClick={this.click}></button>
      </div>
    );
  }
}

export default Button;
