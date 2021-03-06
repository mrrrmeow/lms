var ERRORS  = require('../constants').ERRORS;
var copService = require('../services/copService');

function getAll(req, res, next) {
     try {
        //collect +=  req.body
        copService.getAll().then(function success (data) {
            res.json(data);
        }, function error (err) {
            console.log(err.message);
            next(ERRORS.InternalServerError);
        });
     } catch (err) {
        console.log(err.message);
        next(ERRORS.InternalServerError);
     }
}

function getItem(req, res, next) {
    var id = req.params.id;

    try {
        copService.getOne(id).then(function success (data) {
             if (data) {
                res.json(data);
            } else {
                next(ERRORS.NotFound);
            }
        },function error (err) {
            console.log(err);
            next(ERRORS.InternalServerError);
        });
    } catch (err) {
        console.log(err.message);
        next(ERRORS.InternalServerError);
    }

}

function createItem(req, res, next) { //post
   try {
       req.assert('title', 'Title is required').notEmpty();
       req.assert('link', 'Link is required').notEmpty();

       var errors = req.validationErrors();

       if (errors) {
           console.log(errors);
           next(ERRORS.BadRequest);
       } else {
           var data = req.body;

           copService.create(data).then(function success (data) {
               if (data) {
                   res.json(data);
               } else {
                   next(ERRORS.NotFound);
               }
           }, function error (err) {
                   console.log(err.message);
                   next(ERRORS.InternalServerError);
           });
       }
   } catch (err) {
       console.log(err.message);
       next(ERRORS.InternalServerError);
   }
}

function updateItem(req, res, next) { //put
   var id = req.params.id;
   var data = req.body;

   try {
       copService.update(id, data).then(function success (data) {
           if (data) {
               res.json(data);
           } else {
               next(ERRORS.NotFound);
           }
       }, function error (err) {
               console.log(err.message);
               next(ERRORS.InternalServerError);
       });
   } catch (err) {
        console.log(err.message);
        next(ERRORS.InternalServerError);
   }

}

function deleteItem(req, res, next) {
   var id = req.params.id;

    try {
        copService.deleteOne(id).then(function success (data) {
            if (data) {
                res.json(data);
            } else {
                next(ERRORS.NotFound);
            }
        }, function error (err) {
                console.log(err.message);
                next(ERRORS.InternalServerError);
        });
    } catch (err) {
        console.log(err.message);
        next(ERRORS.InternalServerError);
    }
}

var controller = {
    getAll : getAll,
    getItem : getItem,
    createItem : createItem,
    updateItem : updateItem,
    deleteItem : deleteItem
};

module.exports = controller;
