import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import mongoose from 'mongoose';
import config from './config';
import cookieParser from 'cookie-parser';
import socket from 'socket.io';
import http from 'http';
import socketCallbacks from './socketIo';

const app = express();
const server = http.Server(app);
const io = socket(server);

mongoose.connect(config.databaseUri);
server.listen(3000, () => {
  console.log('Server started at port 3000');
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', routes);

socketCallbacks(io);

