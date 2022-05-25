require('./config/mongoose.config'); 
require('dotenv').config(); //! added for auth/auth
const gizmoRoutes = require('./routes/gizmo.routes'); 
const userRoutes = require('./routes/user.routes'); 
const cookieParser = require('cookie-parser'); //! added for auth/auth
const cors = require('cors');
const express = require("express"); 

const app = express(); 

// below is "body parser"
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 

//! below makes cors work, super simple straightforward
// app.use(cors()); 
//! for exam, use line above instead of section below
// app.use(cors({origin: "http://localhost:3000" })); 
// ! below added, auth/auth 
app.use(cors({origin: process.env.CLIENT_URL , credentials: true }));

app.use(cookieParser()); //! added for auth/auth

// all routes must be listed here: below the express.json/urlencoded and above the port/app.listen 
gizmoRoutes(app); 
userRoutes(app); 

// const port = 8000; 
app.listen(process.env.MY_PORT, () => {console.log(`Express server running on port ${process.env.MY_PORT}.  Rack 'em.`)});


