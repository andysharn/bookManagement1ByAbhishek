const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error")

app.use(express.json());
app.use(cookieParser());

//route imports
const userRoutes = require("./routes/userRoutes.js"); 
const bookRoutes = require("./routes/bookRoutes.js");

app.use("/api/v1",userRoutes);
app.use("/api/v1",bookRoutes); 

//middleware for errors
app.use(errorMiddleware);
module.exports =  app;



