var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apiRouter = require('./routes/api');
var mjApiRouter = require('./routes/mailjet-api');
var sheetsApiRouter = require('./routes/sheets-api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/robots.txt', express.static('./robots.txt'));
app.use('/sitemap.xml', express.static('./sitemap.xml'));
app.use('/api/', apiRouter);
app.use('/mj/api/', mjApiRouter);
app.use('/sheets/api/', sheetsApiRouter);
app.use('/*', express.static('./dist/index.html'));
module.exports = app;
