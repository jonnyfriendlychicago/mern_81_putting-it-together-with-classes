const mongoose = require("mongoose"); 
require('dotenv').config(); //! added for auth/auth

//! rename dbName value on line below 
// const dbName = "process.env.DB_NAME"
const mongoURI = `mongodb://localhost:27017/${process.env.DB_NAME}`; 
mongoose
    .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}) //! This line  stops deprecation alerts/errors from showing, i.e. removes false alarms
    .then(()=>{console.log(`Connected to database: ${process.env.DB_NAME}`)}) 
    .catch((err) => { console.log(`Error connecting to database: ${process.env.DB_NAME}`, err) }); 
