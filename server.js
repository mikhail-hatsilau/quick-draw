import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import mongoose from 'mongoose';
import config from './config';
import cookieParser from 'cookie-parser';

const app = express();

mongoose.connect(config.databaseUri);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use('/api', routes);

app.listen(3000, () => console.log('Server is listening 3000 port'));
