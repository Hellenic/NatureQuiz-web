/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /categories              ->  index
 * POST    /categories              ->  create
 * GET     /categories/:id          ->  show
 * PUT     /categories/:id          ->  update
 * DELETE  /categories/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

// Get list of things
exports.index = function(req, res) {
  res.json([
  {
      id : 'animals',
      name : 'Animals',
      description : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.',
      progress: 100
  }, {
      id : 'berries',
      name : 'Berries',
      description : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.',
      progress: 20
  }, {
      id : 'birds',
      name : 'Birds',
      description : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html',
      progress: 0
  },  {
      id : 'fish',
      name : 'Fish',
      description : 'Best practice client and server structures allow for more code reusability and maximum scalability',
      progress: 35
  },  {
      id : 'flowers',
      name : 'Flowers',
      description : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.',
      progress: 75
  },{
      id : 'mushrooms',
      name : 'Mushrooms',
      description : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators',
      progress: 100
  }
  ]);
};

exports.show = function(req, res) {
    res.json({
        id : 'animals',
        name : 'Animals',
        description : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.',
        progress: 100
    });

    //$scope.category = categoryService.get({categoryId: categoryId}, function(category) {
    // 
    //});
};
