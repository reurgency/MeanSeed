'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema


/**
 * Task Schema
 */
var TaskSchema = new Schema(
    {
        //TaskId: Schema.Types.ObjectId,
        Name: String,
        Description: String//,
        //DueDate: Date
    },
    { _id: false }
);

/**
 * Virtuals
 */


/**
 * Validations
 */

TaskSchema.path('Name').validate(function(name) {
    if(name.length > 0){
        return true;
    }
    return false;
    //The above code could be replaced with "return name.length;" but I
    //changed it for clarity
}, 'Name cannot be blank');


/**
 * Pre-save hook
 */


/**
 * Methods
 */


exports.Model = mongoose.model('Task', TaskSchema);