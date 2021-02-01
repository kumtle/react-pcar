const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//const functions = require('firebase-functions');
const http = require('http');
//const { request } = require('express');
const app = express();
const port = 80;
const webPath = path.join(__dirname, '/build');
const phpPath = path.join(__dirname, '/../phpMyAdmin');
//const proxy = require('http-proxy-middleware');
var request = require('request');

/*app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);*/
app.use(express.static(webPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

getQueryString = (data) => {
  var str = [];
  for (var p in data) {
    if (data.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
    }
  }
  return str.join('&');
}

app.get("*", function(req, res, next) {
  var pathname = req._parsedUrl.pathname;
  //console.log(req._parsedUrl.pathname);
  if (pathname.startsWith('/api/')) {
    //console.log(req.query);
    next();
  }
  else if (pathname.startsWith('/phpMyAdmin')) {
    res.redirect('http://localhost:7000');
    //res.sendFile(path.resolve(phpPath, "index.php"));
  }
  else {
    res.sendFile(path.resolve(webPath, "index.html"));
  }
});

/*var myLogger = function (req, res, next) {
  //console.log('request');
  next();
};

app.use(myLogger);*/

const uri =             'http://api.visitkorea.or.kr/openapi/service/rest/KorService';//areaBasedList';
const uriDetailCommon = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon';

app.get('/api/tour/*', (req, res, next) => {
  var buffer = req._parsedUrl.pathname.split('/');
  const query = getQueryString(req.query);
  const command = buffer[buffer.length - 1];
  const url = `${uri}/${command}?${query}`;
  http.get(url, (response) => {
    const { statusCode } = response;
    const contentType = response.headers['content-type'];
  
    let error;
    // Any 2xx status code signals a successful response but
    // here we're only checking for 200.
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } 
    else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      response.resume();
      return;
    }
  
    response.setEncoding('utf8');
    let rawData = '';
    response.on('data', (chunk) => { rawData += chunk; });
    response.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        //console.log(parsedData);
        res.send({ status: '성공', message: parsedData });
      } 
      catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
});

app.listen(port, () => {
  console.log('express server start at http://localhost:' + port);
});