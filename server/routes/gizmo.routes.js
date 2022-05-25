// ! findReplace all "Gizmo" with "YourNewProName" or whatever your new thing is 
// ! THEN do similar find replace for "gizmo" Make sure lower case
const GizmoController = require("../controllers/gizmo.controller"); 
const {authenticate} = require("../config/jwt.config"); 
// const { getGizmos } = require("../controllers/gizmo.controller"); //! is this right?  not sure where this came from

module.exports = (app) => {
    app.get('/', GizmoController.homePageDelivery); 
    app.get("/api/gizmos", GizmoController.getGizmos); 
    
    // app.post("/api/gizmos", GizmoController.createGizmo); 
    //! above works for non-auth/auth mode; below is for auth/auth
    app.post("/api/gizmos", authenticate, GizmoController.createGizmo); 

    app.get("/api/gizmos/:id", GizmoController.getGizmoById); 
    app.put("/api/gizmos/:id", GizmoController.updateGizmo); 
    app.delete("/api/gizmos/:id", GizmoController.deleteGizmo); 
    // added below for standalone
    app.post("/api/gizmos/new",GizmoController.createGizmo); 
    app.get("/api/gizmos/all", GizmoController.getGizmos); 

    app.get("/api/gizmosbyuser/:username", authenticate, GizmoController.getAllGizmosByUser); //! adde with validation
};

