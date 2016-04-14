var restify = require('restify');
var mongojs = require('mongojs');


port = 8080;
var list = [];
var recipe = [];

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

server.get('/recipes/', function (req, res, next){
  console.log(recipe);
  res.send(200, recipe);

  res.end();
});


server.post('/list/add/:product', function (req, res, next){
  product = req.params.product;
  list.push(product);
  console.log(list);
  findRecipe(list);
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

function findRecipe(list){
  recipe = [];

  searchDoc = null;
  recipes.aggregate([
    // break apart documents to by the products subdocuments
    { $unwind : "$ingredients" },
    // look for matches
    { $match : {'ingredients.name': {$in : list}}},
    // search for matches in the sub documents and add productMatch if a match is found
    { $project : {
        _id : 1,
        ingredname : "$ingredients.name"
    }},
    { $group : {
        _id : "$_id",
        numMatches : { $sum : +1 }
    }},
    { $sort : { numMatches : -1 }},
    { $limit : 3 }
  ], function(err, doc){
    if(doc){
      // console.log(doc);
      searchDoc = doc;
      console.log(searchDoc);
      recipeList = [];
      for (var i = 0; i < searchDoc.length; i++) {
        recipeList.push(mongojs.ObjectId(searchDoc[i]._id));
      }
      console.log(recipeList);
      for (var i = 0; i < recipeList.length; i++) {
        recipes.findOne({
          _id: recipeList[i]
        }, function(err, doc) {
            if(doc){
              console.log(doc);
              recipe.push(doc);
            }
        });

      }
    }
  });
}
