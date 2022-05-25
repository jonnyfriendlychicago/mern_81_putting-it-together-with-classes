
// ! findReplace all "Gizmo" with "YourNewEntityName" or whatever your new thing is 
// ! THEN do similar find replace for "gizmo" Make sure lower case
const Gizmo = require('../models/gizmo.model'); 
const User = require('../models/user.model'); 
const jwt = require("jsonwebtoken"); 

module.exports = {

    homePageDelivery : (request, response) => {
    // ! Update "Pistons" below to be any other sports team ("Angels?") which will verify the sever you see is this newly one you just created. 
        response.send("Hello, world.  May the Great Spirit smile upon us today.  Go Angels.")
    }, 

    //! below section is original 
    // createGizmo : (request, response) => {
    //     Gizmo
    //         .create(request.body)
    //         .then((newGizmo) => {response.status(201).json(newGizmo); })
    //         .catch((err) => {response.status(500).json({message: "createGizmo encountered an error", error: err}); }); 
    // }, 
    // ! below section is overhauled for validation:

    createGizmo : (request, response) => {

        const {
            stringFieldOne
            , numberField
            , isBoolean
            , enumString
            , listField
        } = request.body; 
        //! need help / clarification on what's up with above & if/how it relates to below.
        
        const newGizmoObject = new Gizmo(request.body); 
        const decodedJWT = jwt.decode(request.cookies.userToken, {complete: true}); 
        newGizmoObject.createdBy = decodedJWT.payload.id;  //! turn on for authentication
        newGizmoObject
            .save()

            .then((newGizmo) => {
                console.log(newGizmo); 
                response.status(201).json(newGizmo) })
            .catch( (err) => {
                console.log(err); 
                response.status(400).json( {message: "createGizmo encountereed an error.", errors: err.errors})
            })
    }, 
    
    getGizmos : (request, response) => {
        Gizmo
            .find({}).sort({enumString : 1 , numberField: 1}) // added to make sorty sort sort.  '1' is asc, '-1' makes it sort in desc order. 
            .populate("createdBy", "userName email")  //! turn on for authentication
            .then((allGizmos) => {
                console.log(allGizmos);
                response.json(allGizmos); 
            })
            .catch((err) => {
                console.log("getGizmos failed"); 
                response.status(400).json({message: "getGizmos encountered an error", error: err}) 
            })
    }, 

    getGizmoById : (request, response) => {
    // Gizmo.find({ "_id": request.params.id })
    // above-is-one-way-to-do-it , Mach recommends below instead.  but above is required if searching by another field.  
        Gizmo
            .findById(request.params.id )
            .then((gizmo) => {response.json(gizmo); })
            .catch((err) => {response.status(400).json({message: "getGizmoById encountered an error", error: err}) }) 
    },

    //! below section is original 
    // updateGizmo : (request, response) => {
    //     Gizmo
    //         .findByIdAndUpdate (request.params.id, request.body , {new: true} )
    //         .then((gizmo) => {response.json(gizmo); })
    //         .catch((err) => {response.status(400).json({message: "updateGizmo encountered an error", error: err}); }); 
    // }, 

    // ! below section is overhauled for validation:

    updateGizmo : (request, response) => {
        const {
            stringFieldOne
            , numberField
            , isBoolean
            , enumString
            , listField
        } = request.body; 
        Gizmo
            .findByIdAndUpdate(
                request.params.id
                , {
                    stringFieldOne: stringFieldOne
                    , numberField: numberField
                    , isBoolean : isBoolean
                    , enumString: enumString
                    , listField : listField
                }
                , {new: true, runValidators: true} 
            )
            .then((gizmo) => {response.status(201).json(gizmo); })
            .catch(err => response.status(400).json(err))
    }, 

    deleteGizmo : (request, response) => {
        Gizmo
            .findByIdAndDelete(request.params.id )
            .then((gizmo) => {response.json(gizmo); })
            .catch((err) => {response.status(400).json({message: "deleteGizmo encountered an error", error: err}); }); 
    }, 

    getAllGizmosByUser: (req, res) => {
        if(req.jwtpayload.username !== req.params.username) {
            console.log("not the user here"); 
            User
                .findOne({userName: req.params.username}) 
                .then((userNotLoggedIn) => {
                    Gizmo
                        .find({createdBy: userNotLoggedIn._id})
                        .populate("createdBy", "username")
                        .then((getAllGizmosFromUser) => {
                            console.log(getAllGizmosFromUser); 
                            res.json(getAllGizmosFromUser); 
                        })
                })
                .catch( (err) => {
                    console.log(err); 
                    res.status(400).json(err); 
                })
        }
        
        else {
            console.log("current user"); 
            console.log("req.jwtpayload.id:", req.jwtpayload.id); 
            Gizmo
                .find({createdBy: req.jwtpayload.id})
                .populate("createdBy", "username")
                .then((allGizmosFromLoggedInUser) => {
                    console.log(allGizmosFromLoggedInUser); 
                    res.json(allGizmosFromLoggedInUser); 
                })
                .catch( (err) => {
                    console.log(err); 
                    res.status(400).json(err); 
                })
        }
    }

    
}; 

