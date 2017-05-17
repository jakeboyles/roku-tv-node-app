'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
const Roku = require('rokujs');
const path= require('path');
import consts from './app/src/constants';
const {serverPort,socketPort} = consts;
const io = require('socket.io')(socketPort);
app.use( bodyParser.json() );   
app.use(express.static('app/build'))    
app.use(bodyParser.urlencoded({     
  extended: true
})); 

let DEVICEFOUND = false;


// New client connection, let them know if we have 
// found a tv.
io.on('connection', (socket)=>{
  socket.on('new', (msg)=>{
    if(DEVICEFOUND) io.emit('connected', true);
  });
});

app.use(cors());

Roku.discover((devices) => {
  
	const roku = new Roku(devices[0].address);
	DEVICEFOUND = true;
	io.emit('connected', true);

	// VOLUMES 
	app.get('/volume-up',(req,res)=>{
		roku.press('volumeup');
		return res.status(200).json({success:true});
	});

	app.get('/volume-down',(req,res)=>{
		roku.press('volumedown');
		return res.status(200).json({success:true});
	});

	// APPS
	app.get('/app-netflix',(req,res)=>{
		roku.launch({ id: 12 }, (err) => {
		  if (err) {
		    return res.status(300).json({error:err});
		  }
		  return res.status(200).json({success:true});
		});
	});


	// Movies, FUGLY
	app.get('/movie-zootopia',(req,res)=>{
		roku.launch({ id: 12 }, (err) => {
		  if (err) {
		    return res.status(300).json({error:err});
		  }
		  return res.status(200).json({success:true});
		});
		roku.delay(2000);
		roku.press('back');
		roku.press('select');
		roku.type("zootopia")
		roku.press('right');
		roku.delay(1500);
		roku.press('right');
		roku.delay(1500);
		roku.press('right');
		roku.delay(1500);
		roku.press('right');
		roku.delay(1500);
		roku.press('right');
		roku.delay(1500);
		roku.press('right');
		roku.delay(1900);
		roku.press('select');
		return res.status(200).json({success:true});
	});


	// BUTTONS
	app.get('/button-home',(req,res)=>{
		roku.press('home');
		return res.status(200).json({success:true});
	})

	app.get('/button-left',(req,res)=>{
		roku.press('left');
		return res.status(200).json({success:true});
	})

	app.get('/button-right',(req,res)=>{
		roku.press('right');
		return res.status(200).json({success:true});
	})

	app.get('/button-down',(req,res)=>{
		roku.press('down');
		return res.status(200).json({success:true});
	})

	app.get('/button-up',(req,res)=>{
		roku.press('up');
		return res.status(200).json({success:true});
	})

	app.get('/button-enter',(req,res)=>{
		roku.press('enter');
		return res.status(200).json({success:true});
	})

	app.get('/button-home',(req,res)=>{
		roku.press('home');
		return res.status(200).json({success:true});
	})

	app.get('/button-select',(req,res)=>{
		roku.press('select');
		return res.status(200).json({success:true});
	})
	
});

app.get('/',(req,res)=>{
	 res.sendFile(path.resolve(__dirname, './app', 'build', 'index.html'));
})

app.listen(serverPort, function () {
  console.log(`Example app listening on port ${serverPort}!`);
});
