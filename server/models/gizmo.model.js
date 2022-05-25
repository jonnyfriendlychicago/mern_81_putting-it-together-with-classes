// ! findReplace all "Gizmo" with "YourNewEntityName" or whatever your new thing is 
// ! THEN do similar find replace for "gizmo" Make sure lower case
// line below required on both model and config
const mongoose = require("mongoose"); 

// what is the significance of the word 'new' in line below?
const rockOutNewCollection = new mongoose.Schema (
    {
        // ! update field names/types in this object 
        stringFieldOne: {
            type: String
            , required: [true, "stringFieldOne is required."]
            //! min is for numbers; minlength is for string.  same thing with max
            // , minlength: [5, "stringFieldOne must be 5 characters or more"]
            // , default: "N/A"
        }
        , numberField: {
            type: Number
            // , required: [true, "numberField is required."]
            // , min: [10, "numberField must be 10 or greater."]
        }
        , isBoolean: {
            type: Boolean
            , default: false
        }
        , enumString: {
            type: String
            // , required: [true, "enumString is required."]
            // , enum: [
            //     "A"
            //     , "B"
            //     , "C"
            // ]
            // ! above replaced by below, for custom error msgs
            , enum: { values: ['A', 'B', 'C'], message: '{VALUE} is not supported' }
            , default: "C" // this doesn't really matter; it will get this value ONLY if you go back-end and don't supply.  I think.  Front end def stopping non-selection
        }
        , listField: {
            type: [String]
            // , required: [true, "listField must have at least one entry."]
            // , minlength: [5, "listField must be 5 characters or more"]
            // , min: [1, "need an entry"]
        }
        //! commentOn below for auth/auth
        , createdBy: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "user" // this is the lowercase spelling, same as you see in the user.model in the last/exporting line
        }

    }, 
    {
        timestamps: true
    }
); 

// ! update name of collection below, specific to what you want to create here.  change "gizmo" in next line to "studgizmos" or "users" or "widgets"
module.exports= mongoose.model('gizmo', rockOutNewCollection); 

