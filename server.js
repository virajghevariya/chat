const path = require('path');
const express =  require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Message = require('./models/Message');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const colors = require('colors');



// Load env var
dotenv.config({ path: './config/config.env' });


connectDB();

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/message', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
});

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    res.redirect("http://localhost:3000/message")

    console.log(req.body);
    message.save((err) =>{
      if(err)
        sendStatus(500);
      io.emit('message', req.body);
      res.sendStatus(200);
    })
  })

io.on('connection', (req, res) => {
    console.log('user connected');
});

const server = app.listen(3000, () => {
    console.log('App listening on port 3000!', process.env.PORT);
});

process.on('unhandledRejection', (err) => {
    console.log(`'ERROR:', ${err}`);

    server.close(() => process.exit(1));
});