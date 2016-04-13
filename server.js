var restify = require('restify');
port = 8080;
var list = [];

//Creating server using restify
var server = restify.createServer();

//Return default interface
server.get('/', restify.serveStatic({
  directory: './',
  default: 'index.html'
}));

server.post('/list/add/:product', function (req, res, next){
  console.log(request.params.product);
  list.push(request.params.product);
  console.log(list)
});

server.listen(port, function () {
  console.log('%s listening at %s', server.name, port);
});
