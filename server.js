var restify = require('restify');
port = 8080;
var list = [];

//Creating server using restify
var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());

//Return default interface
server.get('/.*/', restify.serveStatic({
  directory: __dirname,
  default: 'index.html'
}));

server.get('/list', function (req, res, next){
  res.send('list', list);
  res.write('Done!');
  res.end()
});

server.post('/list/add/:product', function (req, res, next){
  list.push(req.params.product);
  console.log(list)
  res.end()
});

server.post('/finish', function (req, res, next){
  list = [];
  console.log('list is finished');
});

server.listen(port, function () {
  console.log('%s listening at %s', server.name, port);
});
