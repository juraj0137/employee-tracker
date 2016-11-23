/**
 * Created by jkubala on 11/20/16.
 */
import bodyParser from 'body-parser';
import express from 'express';
import employee from './employee';
import salary from './salary';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/employee', employee);
app.use('/salary', salary);

export default app;