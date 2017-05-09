import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import consts from './constants';


class Volume extends Component {

  constructor(props){
    super();
    this.click = this.click.bind(this);
  }

  click(){
    console.log(consts.serverPort);
    let path = `http://localhost:${consts.serverPort}/volume-${this.props.type}`;
    axios.get(path)
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

export default Volume;
