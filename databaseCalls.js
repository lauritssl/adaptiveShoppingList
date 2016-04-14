db.recipes.aggregate(
    // break apart documents to by the products subdocuments
    { $unwind : "$ingredients" },
    // look for matches
    { $match : {'ingredients.name': {$in : ["bacon", "persille"]}}},
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
    { $limit : 1 }
);

db.getCollection('recipes').find({_id : ObjectId("570e20f91b23d27af8934bc7")});


db.getCollection('recipes').find({'ingredients.name' : "bacon"}).sort({name: 1}).limit(3)
