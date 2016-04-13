var restify = require('restify');
var mongojs = require('mongojs');


port = 8080;
var list = [];
var recipe = null;

//Creating server using restify
var server = restify.createServer();
// server.use(restify.queryParser());
// server.use(restify.bodyParser());

var db = mongojs('adaptiveshoppinglist');
var recipes = db.collection("recipes");

server.get('/list/', function (req, res, next){
  // res.send('list', list);
  res.write('Done!');
  res.end();
});

server.get('/recipes/:recipeName', function (req, res, next){
  console.log(req.params.recipeName);
  res.send(200, recipe);

  res.end();
});


server.post('/list/add/:product', function (req, res, next){
  product = req.params.product;
  list.push(product);
  console.log(list);

  // recipe = recipes.aggregate(
  //     // break apart documents to by the products subdocuments
  //     { $unwind : "$ingredients" },
  //     // look for matches
  //     { $match : {'ingredients.name': {$in : list}}},
  //     // search for matches in the sub documents and add productMatch if a match is found
  //     { $project : {
  //         _id : 1,
  //         ingredname : "$ingredients.name"
  //     }},
  //     { $group : {
  //         _id : "$_id",
  //         numMatches : { $sum : +1 }
  //     }},
  //     { $sort : { numMatches : -1 }},
  //     { $limit : 1 }
  // );
  res.end();
});

server.post('/finish/', function (req, res, next){
  list = [];
  console.log('list is finished');
});


//Return default interface
server.get('/.*/', restify.serveStatic({
  directory: __dirname,
  default: 'index.html'
}));

server.listen(port, function () {
  console.log('%s listening at %s', server.name, port);
});
