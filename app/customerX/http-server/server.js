/**
 * Created by jkubala on 11/19/16.
 */

import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';
import {config} from '../config';
import mongoose from 'mongoose';
import apiRouter from '../api';

const app = express();

// Mongo connection
let dbHost = config.database.HOST + config.customer.ID;
mongoose.connect(dbHost);
mongoose.Promise = global.Promise;
let mongoDb = mongoose.connection;
mongoDb.on('error', console.error.bind(console, 'connection error:'));


// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(config.paths.BASE, 'base', 'views', 'pages'));


// serve static files
app.use(`/${config.customer.ID}/static`, serveStatic(path.join(__dirname, "..", "build"), {maxAge: '30d'}));


// api routes
app.use(`/${config.customer.ID}/api`, apiRouter);


// dashboard route
app.get(`/${config.customer.ID}`, (request, response) => {
    response.render('dashboard', {
        customerFolder: config.customer.ID
    });
});


mongoDb.once('open', function () {

    // start web server
    const server = app.listen(config.server.PORT, (err) => {
        if (err) {
            return console.error('server listen', err);
        }

        console.log(`server is listening on ${server.address().address}:${server.address().port}`);
    });
});


// export for testing purpose
module.exports = app;
